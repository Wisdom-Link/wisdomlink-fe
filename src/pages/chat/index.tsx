/* eslint-disable jsx-quotes */
import { useState } from "react";
import { View, Image, Button} from "@tarojs/components";
import { AtTextarea } from "taro-ui";
import cartoon from "../../assets/头像 女孩.png";
import "./index.scss";

interface ChatItem {
  type: string;
  content: string;
}

const chatData: ChatItem[] = [
  { type: "user", content: "你好" },
  {
    type: "ai",
    content:
      "你好，我是解答员xxx, 很高兴为您服务,你好，我是解答员xxx, 很高兴为您服务",
  },
  { type: "user", content: "你好" },
  {
    type: "ai",
    content:
      "你好，我是解答员xxx, 很高兴为您服务,你好，我是解答员xxx, 很高兴为您服务",
  },
  { type: "user", content: "你好" },
  {
    type: "ai",
    content:
      "你好，我是解答员xxx, 很高兴为您服务,你好，我是解答员xxx, 很高兴为您服务",
  },
  { type: "user", content: "你好" },
  {
    type: "ai",
    content:
      "你好，我是解答员xxx, 很高兴为您服务,你好，我是解答员xxx, 很高兴为您服务",
  },
  { type: "user", content: "你好" },
];

const ChatPage: React.FC = () => {
  const [input, setInput] = useState("");
  const inputChange = (value) => {
    setInput(value);
  };

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
            <View className="down">
              <View className="down-text">评价:</View>
              <Button className="btn">优秀</Button>
              <Button className="btn">良好</Button>
              <Button className="btn">及格</Button>
              <Button className="btn">差劲</Button>
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
        <AtTextarea
          value={input}
          className="input-box"
          count={false}
          placeholder="请输入消息..."
          onChange={inputChange}
        />
        <Button className="send-button">发送</Button>
      </View>
    </View>
  );
};

export default ChatPage;
