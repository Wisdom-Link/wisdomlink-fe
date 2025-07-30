/* eslint-disable jsx-quotes */
import { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { AtTabs } from "taro-ui";
import { getChatsByStatus } from "../../apis/chat";
import { Chat } from "../../types/chat";
import "./index.scss";

const tabList = [{ title: "进行中对话" }, { title: "已结束对话" }];

const ChatList: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [ongoingChats, setOngoingChats] = useState<Chat[]>([]);
  const [completedChats, setCompletedChats] = useState<Chat[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const userInfo = Taro.getStorageSync("userInfo");
        const userId = userInfo?._id;

        if (userId) {
          const [ongoing, completed] = await Promise.all([
            getChatsByStatus(userId, 'ongoing'),
            getChatsByStatus(userId, 'completed')
          ]);

          setOngoingChats(ongoing);
          setCompletedChats(completed);
        } else {
          Taro.showToast({ title: "请先登录", icon: "none" });
        }
      } catch (error) {
        console.error("获取对话列表失败:", error);
        Taro.showToast({ title: "获取数据失败", icon: "none" });
      }
    };

    fetchChats();
  }, []);

  // 根据标签页切换数据
  const chatList = current === 0 ? ongoingChats : completedChats;

  return (
    <View className="page">
      <View className="header">
        <View className="header-title">
          <AtTabs current={current} tabList={tabList} onClick={setCurrent} />
        </View>
      </View>
      <View className="chat-list">
        {chatList.map((item) => (
          <View key={item._id} className="chat-card">
            <View
              className="chat-card-bg"
              style={{
                background: `url(${item.imageUrl || 'default-bg.jpg'}) center/cover no-repeat`,
              }}
            />
            <View className="chat-content">
              <View className="item-title">
                {item.subject || "对话"}
              </View>
              <View className="tags-container">
                {item.tap && (
                  <Text className="tag">
                    {item.tap}
                  </Text>
                )}
              </View>
            </View>
            <View className="button-container">
              <Button
                className="chat-view-btn"
                onClick={() =>
                  Taro.navigateTo({
                    url: `/pages/chat/index?chatId=${item._id}`,
                  })
                }
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
