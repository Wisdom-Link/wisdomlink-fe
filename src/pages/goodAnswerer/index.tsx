/* eslint-disable jsx-quotes */
import React, { useState } from "react";
import { View, ScrollView, Button } from "@tarojs/components";
import { AtAvatar, AtTag, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtInput } from "taro-ui";
import Taro from "@tarojs/taro";
import avatar from "../../assets/头像.jpeg";
import "./index.scss";
import PostCard from "../../components/PostCard";

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

// 新的帖子数据结构
const posts = [
  {
    avatar: avatar,
    name: "小红同学",
    time: "2024-06-01 09:20",
    location: "湖北省武汉市",
    content:
      "请问考研英语作文怎么高效准备？有没有推荐的资料和练习方法？",
    tags: ["考试", "考研", "英语"],
  },
  {
    avatar: avatar,
    name: "健身达人",
    time: "2024-05-28 18:45",
    location: "广东省深圳市",
    content:
      "最近想增肌，有没有适合新手的健身计划和饮食建议？",
    tags: ["健身", "增肌", "健康"],
  },
  {
    avatar: avatar,
    name: "旅行小熊",
    time: "2024-05-20 14:10",
    location: "四川省成都市",
    content:
      "端午节想去九寨沟旅游，有什么注意事项或者路线推荐吗？",
    tags: ["旅游", "九寨沟", "攻略"],
  },
];

const GoodAnswerer: React.FC = () => {
  const Cards = [
    { url: avatar, title: "张三", label: "1条" },
    { url: avatar, title: "李四", label: "2条" },
    { url: avatar, title: "王二麻子", label: "3条" },
    { url: avatar, title: "张三", label: "1条" },
    { url: avatar, title: "李四", label: "2条" },
    { url: avatar, title: "王二麻子", label: "3条" },
  ];

  // 弹窗相关状态
  const [showModal, setShowModal] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formText, setFormText] = useState("");
  const [formTag, setFormTag] = useState("");
  // 可选标签示例
  const tags = ["法律", "健身", "旅游", "医疗", "音乐", "教育", "影视", "游戏", "烹饪"];

  const handleSend = () => {
    // 这里可以处理表单提交逻辑
    setShowModal(false);
    setFormTitle("");
    setFormText("");
    setFormTag("");
    // Taro.showToast({ title: "已提交", icon: "success" });
  };

  return (
    <>
      <View className="page" style={{ paddingBottom: "70px" }}>
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
        <View className="title">问题</View>
        <View className="post-list">
          {posts.map((post, idx) => (
            <PostCard
              key={idx}
              avatarUrl={post.avatar}
              name={post.name}
              time={post.time}
              location={post.location}
              content={post.content}
              tags={post.tags}
            />
          ))}
        </View>
      </View>
      {/* 弹窗表单 */}
      <AtModal isOpened={showModal} onClose={() => setShowModal(false)}>
        <AtModalHeader>发送问题</AtModalHeader>
        <AtModalContent>
          <AtInput
            name="text"
            title="内容"
            type="text"
            placeholder="请输入问题内容"
            value={formText}
            onChange={v => setFormText(v as string)}
          />
          <View style={{ margin: "16px 0 0 0" }}>标签</View>
          <View style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
            {tags.map(tag => (
              <AtTag
                key={tag}
                circle
                active={formTag === tag}
                onClick={() => setFormTag(tag)}
              >
                {tag}
              </AtTag>
            ))}
          </View>
        </AtModalContent>
        <AtModalAction>
          <Button onClick={() => setShowModal(false)}>取消</Button>
          <Button
            onClick={handleSend}
            disabled={!formTitle || !formText || !formTag}
            type="primary"
          >
            提交
          </Button>
        </AtModalAction>
      </AtModal>
      {/* 固定底部按钮，始终可见 */}
      <View className="fixed-bottom-btn">
        <Button
          type="primary"
          className="fixed-btn"
          onClick={() => setShowModal(true)}
        >
          发送问题
        </Button>
      </View>
    </>
  );
};

export default GoodAnswerer;
