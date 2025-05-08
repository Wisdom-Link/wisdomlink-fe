/* eslint-disable jsx-quotes */
import React from "react";
import { View, Text, Button } from "@tarojs/components";
import { AtAvatar, AtTag } from "taro-ui";
import Taro from "@tarojs/taro";
import avatar from "../../assets/头像.jpeg";
import "./index.scss";

// PostCard 组件根据参数显示内容
const PostCard: React.FC<{
  url: string;
  name: string;
  location: string;
  time: string;
  title: string;
  label: string;
  tags: string[];
}> = ({ url, name, location, time, title, label, tags }) => {
  return (
    <View className="answer">
      <View className="answer-header">
        <View className="answer-avatar">
          <AtAvatar circle size="small" image={url}></AtAvatar>
        </View>
        <View className="answer-text">
          <View className="answer-name">
            <Text>{name}</Text>
          </View>
          <View className="answer-time">
            <Text>{location}</Text>
            <View style={{ width: 6 }} />
            <Text>{time}</Text>
          </View>
        </View>
        <View className="answer-more">
          <Button
            className="follow-btn"
          >
            更改问题
          </Button>
        </View>
      </View>
      <View className="answer-content">
        <View className="answer-title">{title}</View>
        <View className="answer-label">{label}</View>
      </View>
      <View className="answer-tag" style={{ display: "flex", alignItems: "center" }}>
        {tags.map((tag, idx) => (
          <AtTag key={idx} circle>
            {tag}
          </AtTag>
        ))}
      </View>
    </View>
  );
};

const mockPosts = [
  {
    url: avatar,
    name: "刘思",
    location: "湖北省",
    time: "1小时前",
    title: "关于保研问题",
    label: "1.了解导师研究方向，展现兴趣方向。2.成绩优良，科研经历丰富。3.提前准备申请材料，准确无误填写表格",
    tags: ["保研", "经验"],
  },
  {
    url: avatar,
    name: "王二麻子",
    location: "北京",
    time: "2天前",
    title: "考研英语难点",
    label: "请问考研英语作文怎么准备？",
    tags: ["考研", "英语"],
  },
];

const CurrentPosts: React.FC = () => {
  return (
    <View className="page">
      <View className="answerlist">
        <View className="title">我的提问</View>
        {mockPosts.map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </View>
    </View>
  );
};

export default CurrentPosts;
