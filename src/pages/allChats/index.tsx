/* eslint-disable jsx-quotes */
import { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { AtTabs } from "taro-ui";
import { getQuestionerChats, getAnswererChats } from "../../apis/chat";
import { Chat } from "../../types/chat";
import "./index.scss";

const tabList = [{ title: "提问对话" }, { title: "答题对话" }];

const ChatHistory: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [questionerChats, setQuestionerChats] = useState<Chat[]>([]);
  const [answererChats, setAnswererChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  // 获取对话数据
  const fetchChatData = async () => {
    setLoading(true);
    try {
      // 并行获取两种角色的历史对话（已完成）
      const [questionerData, answererData] = await Promise.all([
        getQuestionerChats('completed'), // 获取用户作为提问者的历史对话
        getAnswererChats('completed')    // 获取用户作为回答者的历史对话
      ]);

      setQuestionerChats(questionerData);
      setAnswererChats(answererData);
    } catch (error) {
      console.error("获取对话数据失败:", error);
      Taro.showToast({ title: "获取数据失败", icon: "none" });
      setQuestionerChats([]);
      setAnswererChats([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChatData();
  }, []);

  // 根据标签页切换数据
  const chatList = current === 0 ? questionerChats : answererChats;

  // 处理跳转到聊天页面
  const handleViewChat = (chatId: string) => {
    Taro.navigateTo({
      url: `/pages/chat/index?chatId=${chatId}`,
    });
  };

  // 获取默认背景图
  const getDefaultBackground = (index: number) => {
    const defaultImages = [
      "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E7%A4%BE%E5%8C%BA/%E9%97%AE%E9%A2%98/%E5%81%A5%E8%BA%AB/%E5%81%A5%E8%BA%AB1.jpg",
      "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E7%A4%BE%E5%8C%BA/%E9%97%AE%E9%A2%98/%E6%B3%95%E5%BE%8B/%E6%B3%95%E5%BE%8B1.jpg",
      "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E7%A4%BE%E5%8C%BA/%E9%97%AE%E9%A2%98/%E6%97%85%E6%B8%B8/%E6%97%85%E6%B8%B82.jpeg",
      "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E7%A4%BE%E5%8C%BA/%E9%97%AE%E9%A2%98/%E5%8C%BB%E7%96%97/%E5%8C%BB%E7%96%973.jpg",
    ];
    return defaultImages[index % defaultImages.length];
  };

  return (
    <View className="page">
      <View className="header">
        <View className="header-title">
          <AtTabs current={current} tabList={tabList} onClick={setCurrent} />
        </View>
      </View>

      {loading ? (
        <View style={{
          textAlign: "center",
          padding: "60px 20px",
          color: "#999"
        }}
        >
          加载中...
        </View>
      ) : (
        <View className="chat-list">
          {chatList.length > 0 ? (
            chatList.map((item, index) => (
              <View key={item._id} className="chat-card">
                {/* 左侧背景图片 */}
                <View
                  className="chat-card-bg"
                  style={{
                    background: `url(${item.imageUrl || getDefaultBackground(index)}) center/cover no-repeat`,
                  }}
                />
                {/* 中间标题和标签 */}
                <View className="chat-content">
                  <View className="item-title">
                    {item.subject}
                  </View>
                  <View className="tags-container">
                    {Array.isArray(item.tap) && item.tap.map((tag, idx) => (
                      <Text key={idx} className="tag">
                        {tag}
                      </Text>
                    ))}
                  </View>
                  <View className="chat-status">
                    <Text className={`status-badge ${item.status}`}>
                      {item.status === 'ongoing' ? '进行中' : '已完成'}
                    </Text>
                  </View>
                </View>
                {/* 右侧按钮 */}
                <View className="button-container">
                  <Button
                    className="chat-view-btn"
                    onClick={() => handleViewChat(item._id)}
                  >
                    查看对话
                  </Button>
                </View>
              </View>
            ))
          ) : (
            <View style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#999"
            }}
            >
              {current === 0 ? "暂无提问对话" : "暂无答题对话"}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default ChatHistory;
