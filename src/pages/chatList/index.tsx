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
    title: "如何科学安排一周健身计划？",
    tags: ["健身", "健康"],
    background: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E7%A4%BE%E5%8C%BA/%E9%97%AE%E9%A2%98/%E5%81%A5%E8%BA%AB/%E5%81%A5%E8%BA%AB1.jpg",
  },
  {
    id: 2,
    title: "遇到合同纠纷应该怎么办？",
    tags: ["法律", "咨询"],
    background: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E7%A4%BE%E5%8C%BA/%E9%97%AE%E9%A2%98/%E6%B3%95%E5%BE%8B/%E6%B3%95%E5%BE%8B1.jpg",
  },
  {
    id: 3,
    title: "云南旅游有哪些必去景点？",
    tags: ["旅游", "攻略"],
    background: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E7%A4%BE%E5%8C%BA/%E9%97%AE%E9%A2%98/%E6%97%85%E6%B8%B8/%E6%97%85%E6%B8%B82.jpeg",
  },
  {
    id: 4,
    title: "体检报告异常需要注意什么？",
    tags: ["医疗", "健康"],
    background: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E7%A4%BE%E5%8C%BA/%E9%97%AE%E9%A2%98/%E5%8C%BB%E7%96%97/%E5%8C%BB%E7%96%973.jpg",
  },
  {
    id: 5,
    title: "零基础如何学习钢琴？",
    tags: ["音乐", "兴趣"],
    background: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E7%A4%BE%E5%8C%BA/%E9%97%AE%E9%A2%98/%E9%9F%B3%E4%B9%90/%E9%9F%B3%E4%B9%901.jpg",
  },
];

const mockChatListAnswer = [
  {
    id: 6,
    title: "高考志愿填报有哪些注意事项？",
    tags: ["教育", "经验"],
    background: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E7%A4%BE%E5%8C%BA/%E9%97%AE%E9%A2%98/%E6%95%99%E8%82%B2/%E6%95%99%E8%82%B21.jpg",
  },
  {
    id: 7,
    title: "最近有哪些值得推荐的国产电影？",
    tags: ["影视", "娱乐"],
    background: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E7%A4%BE%E5%8C%BA/%E9%97%AE%E9%A2%98/%E5%BD%B1%E8%A7%86/%E5%BD%B1%E8%A7%861.jpg",
  },
  {
    id: 8,
    title: "王者荣耀新赛季上分技巧有哪些？",
    tags: ["游戏", "交流"],
    background: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E7%A4%BE%E5%8C%BA/%E9%97%AE%E9%A2%98/%E6%B8%B8%E6%88%8F/%E6%B8%B8%E6%88%8F2.jpg",
  },
  {
    id: 9,
    title: "家常菜怎么做才更健康？",
    tags: ["烹饪", "美食"],
    background: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E7%A4%BE%E5%8C%BA/%E9%97%AE%E9%A2%98/%E7%83%B9%E9%A5%AA/%E7%83%B9%E9%A5%AA2.jpg",
  },
];

const tabList = [{ title: "提问对话" }, { title: "答题对话" }];

const ChatList: React.FC = () => {
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
