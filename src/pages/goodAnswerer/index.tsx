/* eslint-disable jsx-quotes */
import React, { useState } from "react";
import { View, Text, ScrollView, Input, Button } from "@tarojs/components";
import { AtAvatar, AtTag, AtIcon } from "taro-ui";
import avatar from "../../assets/头像.jpeg";
import "./index.scss";

const AnswererCard = ({ url, title, label }) => {
  return (
    <View className="card">
      <View className="card-picture">
        <AtAvatar circle image={url}></AtAvatar>
      </View>
      <View className="card-content">
        <View className="card-title">{title}</View>
        <View className="card-label">{label}</View>
      </View>
    </View>
  );
};

const AnswerActions = () => {
  const [liked, setLiked] = useState(false);
  const [collected, setCollected] = useState(false);
  const [showComments, setShowComments] = useState(false);

  return (
    <View className="answer-actions">
      {/* 点赞按钮 */}
      <Button
        className={`action-btn ${liked ? "liked" : ""}`}
        onClick={() => setLiked(!liked)}
      >
        <AtIcon value="heart" size="16" color={liked ? "#ff4d4f" : "#888"} />
        <Text>{liked ? "已点赞" : "点赞"}</Text>
      </Button>

      {/* 收藏按钮 */}
      <Button
        className={`action-btn ${collected ? "collected" : ""}`}
        onClick={() => setCollected(!collected)}
      >
        <AtIcon value="star" size="16" color={collected ? "#f5c518" : "#888"} />
        <Text>{collected ? "已收藏" : "收藏"}</Text>
      </Button>

      {/* 查看评论按钮 */}
      <Button
        className="action-btn"
        onClick={() => setShowComments(!showComments)}
      >
        <AtIcon value="message" size="16" color="#888" />
        <Text>{showComments ? "隐藏评论" : "查看评论"}</Text>
      </Button>

      {/* 评论区（动态显示） */}
      {showComments && (
        <View className="comment-section">
          <Text>这里是评论区...</Text>
        </View>
      )}
    </View>
  );
};

const Answer = () => {
  const [inputValue, setInputValue] = useState("");
  const [isFollowed, setIsFollowed] = useState(false);

  const handleFollow = () => {
    setIsFollowed(!isFollowed);
  };
  const handleSend = () => {
    if (inputValue.trim()) {
      console.log("发送内容:", inputValue);
      setInputValue(""); // 发送后清空输入框
    }
  };

  return (
    <View className="answer">
      <View className="answer-header">
        <View className="answer-avatar">
          <AtAvatar circle size="small" image={avatar}></AtAvatar>
        </View>
        <View className="answer-text">
          <View className="answer-name">
            <Text>刘思</Text>
          </View>
          <View className="answer-time">
            <Text>湖北省</Text>
            <Text>一个小时前</Text>
          </View>
        </View>
        <View className="answer-more">
          <Button
            className={`follow-btn ${isFollowed ? "followed" : ""}`}
            onClick={handleFollow}
          >
            {isFollowed ? "已关注" : "+ 关注"}
          </Button>
        </View>
      </View>
      <View className="answer-content">
        <View className="answer-title">关于保研问题</View>
        <View className="answer-label">
          1.了解导师研究方向，展现兴趣方向。2.成绩优良，科研经历丰富。3.提前准备申请材料，准确无误填写表格
        </View>
      </View>
      <View className="answer-tag">
        <AtTag size="small" circle>
          保研
        </AtTag>
      </View>
      <View className="answer-opinion">
        <AnswerActions />
      </View>
      <View className="answer-input-container">
        <Input
          className="answer-input"
          type="text"
          placeholder="请输入您的回答..."
          value={inputValue}
          onInput={(e) => setInputValue(e.detail.value)}
        />
        <Button className="answer-send-btn" onClick={handleSend}>
          发送
        </Button>
      </View>
    </View>
  );
};

const GoodAnswerer: React.FC = () => {
  const Cards = [
    { url: avatar, title: "张三", label: "1条" },
    { url: avatar, title: "李四", label: "2条" },
    { url: avatar, title: "王二麻子", label: "3条" },
    { url: avatar, title: "张三", label: "1条" },
    { url: avatar, title: "李四", label: "2条" },
    { url: avatar, title: "王二麻子", label: "3条" },
  ];

  return (
    <View className="page">
      <View className="title">排名</View>
      <ScrollView scrollX className="scroll-container">
        <View className="scroll-content">
          {Cards.map((card, index) => (
            <AnswererCard
              key={index}
              url={card.url}
              title={card.title}
              label={card.label}
            />
          ))}
        </View>
      </ScrollView>
      <View className="answerlist">
        <View className="title">热门话题</View>
        <Answer />
        <Answer />
      </View>
    </View>
  );
};

export default GoodAnswerer;
