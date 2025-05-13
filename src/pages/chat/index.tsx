/* eslint-disable jsx-quotes */
import { useState} from "react";
import Taro ,{ useDidShow } from "@tarojs/taro";
import { View, Image, Button, Input } from "@tarojs/components";
import cartoon from "../../assets/头像 女孩.png";
import "./index.scss";

interface ChatItem {
  type: string;
  content: string;
}

const chatData: ChatItem[] = [
  { type: "user", content: "请问考研英语作文怎么准备？" },
  {
    type: "ai",
    content:
      "考研英语作文建议多背范文，积累常用句型，并多加练习写作，写完后可以让老师或同学帮忙修改。",
  },
  { type: "user", content: "数学复习有哪些高效的方法？" },
  {
    type: "ai",
    content:
      "数学复习要注重基础知识，理解公式推导，多做真题和错题整理，遇到不会的题目及时查漏补缺。",
  },
  { type: "user", content: "政治选择题总是错，有什么建议吗？" },
  {
    type: "ai",
    content:
      "政治选择题要多做题，掌握时政热点，理解教材原理，遇到模棱两可的选项时要结合教材内容分析。",
  },
  { type: "user", content: "考研复习时间怎么安排比较合理？" },
  {
    type: "ai",
    content:
      "建议制定详细的复习计划，合理分配各科时间，保持每天的学习节奏，注意劳逸结合，适当锻炼身体。",
  },
  { type: "user", content: "复试一般会问哪些问题？" },
  {
    type: "ai",
    content:
      "复试常见问题包括自我介绍、专业课知识、科研经历、未来规划等，建议提前准备并多加练习。",
  },
];

const ChatPage: React.FC = () => {
  const [input, setInput] = useState("");
  const inputChange = (value) => {
    setInput(value);
  };

  useDidShow(() => {
    const params = Taro.getStorageSync('chatID');
    console.log("接收到的参数：", params);
    // 用完可以清除
    Taro.removeStorageSync('chatID');
  });


  return (
    <View className="page">
      <View className="chatList">
        <View className="header">
          <View className="card">
            <View className="up">
              <View className="picture">
                <Image className="card-icon" src={cartoon}></Image>
              </View>
              <View className="contents">
                <View className="card-title">哈喽~</View>
                <View className="text">我是解答员xxx, 很高兴为您服务</View>
              </View>
            </View>
          </View>
        </View>
        {chatData.map((item, index) => (
          <View key={index} className={`${item.type}`}>
            {item.content}
          </View>
        ))}
      </View>
      <View className="input-container">
        <Input
          value={input}
          className="input-box"
          placeholder="请输入内容..."
          onInput={e => setInput(e.detail.value)}
          focus={false} // 改为 true 可自动弹出输入法
        />
        <Button className="send-button">发送</Button>
      </View>
    </View>
  );
};

export default ChatPage;
