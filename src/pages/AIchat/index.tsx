/* eslint-disable jsx-quotes */
import { useState, useEffect, useRef } from "react";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View, Button, Input, RichText } from "@tarojs/components";
import { baseURL } from "../../utils/request";
import "./index.scss";

// 简单的 markdown 转换函数
function markdownToHtml(markdown: string): string {
  return markdown
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // 粗体
    .replace(/\*(.*?)\*/g, '<em>$1</em>') // 斜体
    .replace(/`(.*?)`/g, '<code>$1</code>') // 行内代码
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>') // 代码块
    .replace(/^### (.*$)/gim, '<h3>$1</h3>') // h3 标题
    .replace(/^## (.*$)/gim, '<h2>$1</h2>') // h2 标题
    .replace(/^# (.*$)/gim, '<h1>$1</h1>') // h1 标题
    .replace(/^\- (.*$)/gim, '<li>$1</li>') // 列表项
    .replace(/(<li>[\s\S]*<\/li>)/, '<ul>$1</ul>') // 包装列表
    .replace(/\n/g, '<br/>'); // 换行
}

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
  const wsRef = useRef<any>(null);

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

  // 使用 WebSocket 实现流式输出
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
      const messages = [
        { role: "system", content: `你是${typeInfo.title}智能体，请只用${typeInfo.title}相关知识解答用户问题。` },
        ...chatList.map((item) => ({
          role: item.type === "user" ? "user" : "assistant",
          content: item.content,
        })),
        { role: "user", content: input },
      ];

      const wsUrl = `${baseURL.replace(/^http/, "ws")}/chat/AIchat`;

      // 小程序端使用 Taro.connectSocket
      Taro.connectSocket({ url: wsUrl }).then((socketTask) => {
        wsRef.current = socketTask;

        socketTask.onOpen(() => {
          socketTask.send({
            data: JSON.stringify({ messages, token }),
          });
        });

        socketTask.onMessage((res) => {
          try {
            const data = JSON.parse(res.data as string);
            if (data.type === 'content') {
              aiMsg.content += data.content;
              setChatList((prev) => {
                const newList = prev.slice(0, -1);
                return [...newList, { ...aiMsg }];
              });
            } else if (data.type === 'end') {
              setIsLoading(false);
              socketTask.close({});
            } else if (data.type === 'error') {
              Taro.showToast({ title: data.error || "AI连接失败", icon: "none" });
              setIsLoading(false);
              socketTask.close({});
            }
          } catch (e) {
            console.error("解析 WebSocket 消息失败:", e);
          }
        });

        socketTask.onError(() => {
          Taro.showToast({ title: "AI连接失败", icon: "none" });
          setIsLoading(false);
        });

        socketTask.onClose(() => {
          setIsLoading(false);
        });
      });

    } catch (e) {
      console.error("AI连接异常:", e);
      Taro.showToast({ title: "AI连接失败", icon: "none" });
      setIsLoading(false);
    }
  };

  return (
    <View className="page">
      <View className="chatList">
        {chatList.map((item, index) => (
          <View key={index} className={`${item.type}`}>
            {item.type === 'ai' ? (
              <RichText nodes={markdownToHtml(item.content)} />
            ) : (
              item.content
            )}
          </View>
        ))}
      </View>
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
