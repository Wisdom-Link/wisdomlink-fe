/* eslint-disable jsx-quotes */
import { useState, useEffect, useRef } from "react";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View, Button, Input, ScrollView } from "@tarojs/components";
import { baseURL } from "../../utils/request";
import "./index.scss";

interface ChatItem {
  type: string;
  content: string;
}

const chatTypeMap: Record<string, { title: string; welcome: string }> = {
  "1": { title: "学业", welcome: "我是学业智能体，有关学业的问题都可以问我哦~" },
  "2": { title: "家庭", welcome: "我是家庭智能体，有关家庭的问题都可以问我哦~" },
  "3": { title: "事业", welcome: "我是事业智能体，有关事业的问题都可以问我哦~" },
};

const AIChatPage: React.FC = () => {
  const [input, setInput] = useState("");
  const [chatList, setChatList] = useState<ChatItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 从url获取chatId
    const router = getCurrentInstance().router;
    const chatId = router?.params?.chatId || "1";
    const typeInfo = chatTypeMap[chatId] || chatTypeMap["1"];
    setChatList([
      {
        type: "ai",
        content: typeInfo.welcome,
      },
    ]);
  }, []);

  // 发送消息并流式接收AI回复（兼容小程序和H5）
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const router = getCurrentInstance().router;
    const chatId = router?.params?.chatId || "1";
    const typeInfo = chatTypeMap[chatId] || chatTypeMap["1"];

    const userMsg = { type: "user", content: input };
    setChatList((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    let aiMsg = { type: "ai", content: "" };
    setChatList((prev) => [...prev, { ...aiMsg }]);

    try {
      const token = Taro.getStorageSync("token");
      const url = `${baseURL}/chat/AIchat`;
      const messages = [
        { role: "system", content: `你是${typeInfo.title}智能体，请只用${typeInfo.title}相关知识解答用户问题。` },
        ...chatList.map((item) => ({
          role: item.type === "user" ? "user" : "assistant",
          content: item.content,
        })),
        { role: "user", content: input },
      ];

      // 判断环境
      const isMiniApp = Taro.getEnv && Taro.getEnv() === Taro.ENV_TYPE.WEAPP;
      if (isMiniApp) {
        // 小程序端不支持fetch流式，只能一次性拿到完整内容
        const res = await Taro.request({
          url,
          method: "POST",
          header: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: { messages },
        });
        if (res.statusCode === 200 && res.data && res.data.content) {
          aiMsg.content = res.data.content;
          setChatList((prev) => {
            const newList = prev.slice(0, -1);
            return [...newList, { ...aiMsg }];
          });
        } else {
          Taro.showToast({ title: "AI连接失败", icon: "none" });
        }
      } else {
        // H5端支持流式
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ messages }),
        });
        if (!response.body) {
          throw new Error("无流式响应体");
        }
        const reader = response.body.getReader();
        let done = false;
        let text = "";
        while (!done) {
          const { value, done: readerDone } = await reader.read();
          if (value) {
            const chunk = new TextDecoder().decode(value);
            text += chunk;
            aiMsg.content = text;
            setChatList((prev) => {
              const newList = prev.slice(0, -1);
              return [...newList, { ...aiMsg }];
            });
          }
          done = readerDone;
        }
      }
    } catch (e) {
      console.error("AI连接异常:", e);
      Taro.showToast({ title: "AI连接失败", icon: "none" });
    }
    setIsLoading(false);
  };

  return (
    <View className="page">
      <ScrollView className="chatList" scrollY>
        {chatList.map((item, index) => (
          <View key={index} className={`${item.type}`}>
            {item.content}
          </View>
        ))}
      </ScrollView>
      <View className="input-container">
        <Input
          value={input}
          className="input-box"
          placeholder="请输入内容..."
          onInput={(e) => setInput(e.detail.value)}
          focus={false}
        />
        <Button className="send-button" loading={isLoading} onClick={handleSend}>
          发送
        </Button>
      </View>
    </View>
  );
};

export default AIChatPage;
