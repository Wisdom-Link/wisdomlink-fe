/* eslint-disable jsx-quotes */
import { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { AtTabs } from "taro-ui";
import { getQuestionerChats, getAnswererChats } from "../../apis/chat";
import { Chat } from "../../types/chat";
import { getRandomPictureByCommunity } from "../../utils/getRandomPicture"
import "./index.scss";

const tabList = [{ title: "提问对话" }, { title: "答题对话" }];

const ChatList: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [questionerChats, setQuestionerChats] = useState<Chat[]>([]);
  const [answererChats, setAnswererChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  // 获取正在进行的对话数据
  const fetchChatData = async () => {
    setLoading(true);
    try {
      // 并行获取两种角色的正在进行对话
      const [questionerData, answererData] = await Promise.all([
        getQuestionerChats('ongoing'), // 获取用户作为提问者的正在进行对话
        getAnswererChats('ongoing')    // 获取用户作为回答者的正在进行对话
      ]);

      // 确保数据存在且是数组
      const questionerChatsData = Array.isArray(questionerData) ? questionerData :
                              (questionerData?.data && Array.isArray(questionerData.data)) ? questionerData.data : [];
      const answererChatsData = Array.isArray(answererData) ? answererData :
                            (answererData?.data && Array.isArray(answererData.data)) ? answererData.data : [];

      setQuestionerChats(questionerChatsData);
      setAnswererChats(answererChatsData);
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
            chatList.map((item) => (
              <View key={item._id} className="chat-card">
                {/* 左侧背景图片 */}
                <View
                  className="chat-card-bg"
                  style={{
                    backgroundImage: `url(${getRandomPictureByCommunity(item.community)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
                {/* 中间标题和标签 */}
                <View className="chat-content">
                  <View className="item-title">
                    {item.content}
                  </View>
                  <View className="tags-container">
                    {/* 修复标签数据处理 */}
                    {(
                     // 处理逗号分隔的标签字符串
                      item.tags?.flatMap(tagStr =>
                        typeof tagStr === 'string' ? tagStr.split(',').map(tag => tag.trim()) : []
                      ).filter(tag => tag).map((tag, idx) => (
                        <View key={idx} className="tag">
                          {tag}
                        </View>
                      ))
                    )}
                  </View>
                </View>
                {/* 右侧按钮 */}
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

export default ChatList;
