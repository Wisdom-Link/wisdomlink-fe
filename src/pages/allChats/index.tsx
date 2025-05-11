/* eslint-disable jsx-quotes */
import { useState } from "react";
import Taro from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { AtTabs } from "taro-ui";
import bg1 from "../../assets/风景图.jpg";
import "./index.scss";

// 两组模拟数据
const mockChatListAsk = [
  {
    id: 1,
    title: "考研英语答疑",
    tags: ["考研", "英语"],
    background: bg1,
  },
  {
    id: 2,
    title: "保研经验分享",
    tags: ["保研", "经验"],
    background: bg1,
  },
];
const mockChatListAnswer = [
  {
    id: 3,
    title: "算法交流",
    tags: ["算法", "刷题"],
    background: bg1,
  },
  {
    id: 4,
    title: "高数难题解答",
    tags: ["数学", "高数", "难题"],
    background: bg1,
  },
];

const tabList = [{ title: "提问对话" }, { title: "答题对话" }];

const ChatHistory: React.FC = () => {
  const [current, setCurrent] = useState(0);

  // 根据标签页切换数据
  const chatList = current === 0 ? mockChatListAsk : mockChatListAnswer;

  return (
    <View className="page">
      <View className="header">
        <View className="header-title">
          <AtTabs current={current} tabList={tabList} onClick={setCurrent} />
        </View>
      </View>
      <View className="chat-list">
        {chatList.map((item) => (
          <View key={item.id} className="chat-card">
            {/* 左侧背景图片 */}
            <View
              className="chat-card-bg"
              style={{
                background: `url(${item.background}) center/cover no-repeat`,
              }}
            />
            {/* 中间标题和标签 */}
            <View className="chat-content">
              <View className="item-title">
                {item.title}
              </View>
              <View className="tags-container">
                {item.tags.map((tag, idx) => (
                  <Text key={idx} className="tag">
                    {tag}
                  </Text>
                ))}
              </View>
            </View>
            {/* 右侧按钮 */}
            <View className="button-container">
              <Button
                className="chat-view-btn"
                onClick={() =>
                  Taro.navigateTo({
                    url: `/pages/chat/index?chatId=${item.id}`,
                  })
                }
              >
                查看对话
              </Button>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ChatHistory;
