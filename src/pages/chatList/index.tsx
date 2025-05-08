/* eslint-disable jsx-quotes */
import { useState } from "react";
import Taro from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import cartoon from "../../assets/头像 女孩.png";
import bg1 from "../../assets/风景图.jpg";
import "./index.scss";

const mockChatList = [
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
  {
    id: 3,
    title: "算法交流",
    tags: ["算法", "刷题"],
    background: bg1,
  },
];

const ChatList: React.FC = () => {
  const [chatList] = useState(mockChatList);

  return (
    <View className="page">
      <View className="header">
        <View className="header-title">聊天列表</View>
      </View>
      <View className="chat-list">
        {chatList.map((item) => (
          <View
            key={item.id}
            className="chat-card"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              background: "#fff",
              borderRadius: "32rpx",
              marginBottom: "30rpx",
              boxShadow: "0 4rpx 16rpx rgba(0,0,0,0.08)",
              minHeight: "180rpx",
              padding: 0,
              overflow: "hidden",
            }}
          >
            {/* 左侧背景图片 */}
            <View
              style={{
                width: "33.33%",
                height: "180rpx",
                background: `url(${item.background}) center/cover no-repeat`,
              }}
            />
            {/* 中间标题和标签 */}
            <View
              style={{
                width: "33.33%",
                padding: "0 24rpx",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                minWidth: 0,
              }}
            >
              <View
                className="item-title"
                style={{
                  fontSize: "32rpx",
                  fontWeight: "bold",
                  color: "#222",
                  marginBottom: "18rpx",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.title}
              </View>
              <View style={{ display: "flex", flexWrap: "wrap" }}>
                {item.tags.map((tag, idx) => (
                  <Text
                    key={idx}
                    style={{
                      background: "#e1c038",
                      color: "#333",
                      borderRadius: "20rpx",
                      padding: "4rpx 18rpx",
                      marginRight: "16rpx",
                      fontSize: "22rpx",
                      marginBottom: "8rpx",
                    }}
                  >
                    {tag}
                  </Text>
                ))}
              </View>
            </View>
            {/* 右侧按钮 */}
            <View
              style={{
                width: "120rpx",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Button
                size="default"
                style={{
                  background: "#6190e8",
                  color: "#fff",
                  borderRadius: "30rpx",
                  fontSize: "24rpx",
                  padding: "0 10rpx",
                  height: "56rpx",
                  lineHeight: "56rpx",
                  border: "none",
                }}
                onClick={() => Taro.navigateTo({ url: `/pages/chat/index?chatId=${item.id}` })}
              >
                进入对话
              </Button>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ChatList;
