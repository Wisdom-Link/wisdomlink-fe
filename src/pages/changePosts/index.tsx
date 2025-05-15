/* eslint-disable jsx-quotes */
import React, { useState } from "react";
import { View, Text, Button } from "@tarojs/components";
import {
  AtAvatar,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtTag,
  AtInput,
} from "taro-ui";
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
  const [showModal, setShowModal] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formText, setFormText] = useState("");
  const [formTag, setFormTag] = useState("");
  const tags_able = [
    "法律",
    "健身",
    "旅游",
    "医疗",
    "音乐",
    "教育",
    "影视",
    "游戏",
    "烹饪",
  ];

  const handleSend = () => {
    setShowModal(false);
    setFormTitle("");
    setFormText("");
    setFormTag("");
  };

  return (
    <View className="post-card">
      <View className="post-header">
        <AtAvatar circle size="small" image={url} />
        <View className="post-header-info">
          <View className="post-header-row">
            <Text className="post-name">{name}</Text>
            <Text className="post-time">{time}</Text>
          </View>
          <Text className="post-location">{location}</Text>
        </View>
        <View style={{ marginLeft: "auto" }}></View>
      </View>
      <View className="post-content">{label}</View>
      <View className="post-tags">
        {tags.map((tag, idx) => (
          <AtTag key={idx} circle className="post-tag">
            {tag}
          </AtTag>
        ))}
      </View>
      <Button className="post-btn" onClick={() => setShowModal(true)}>
          更改问题
        </Button>
      {/* 弹窗表单 */}
      <AtModal isOpened={showModal} onClose={() => setShowModal(false)}>
        <AtModalHeader>更改问题</AtModalHeader>
        <AtModalContent>
          <AtInput
            name="text"
            title="内容"
            type="text"
            placeholder="请输入问题内容"
            value={formText}
            onChange={(v) => setFormText(v as string)}
          />
          <View style={{ margin: "16px 0 0 0" }}>标签</View>
          <View
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              marginTop: "8px",
            }}
          >
            {tags_able.map((tag) => (
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
    label:
      "1.了解导师研究方向，展现兴趣方向。2.成绩优良，科研经历丰富。3.提前准备申请材料，准确无误填写表格",
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
      <View className="post-list">
        {mockPosts.map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </View>
    </View>
  );
};

export default CurrentPosts;
