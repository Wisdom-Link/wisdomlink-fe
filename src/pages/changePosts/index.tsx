/* eslint-disable jsx-quotes */
import React, { useState, useEffect } from "react";
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
import { getThreadsByUsername } from "../../apis/thread";
import { Post } from "../../types/thread";
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

const CurrentPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // 获取当前用户的帖子
    const fetchUserPosts = async () => {
      try {
        const userInfo = Taro.getStorageSync("userInfo");
        const username = userInfo?.username;

        if (username) {
          const userPosts = await getThreadsByUsername(username);
          setPosts(userPosts);
        } else {
          Taro.showToast({ title: "请先登录", icon: "none" });
        }
      } catch (error) {
        console.error("获取用户帖子失败:", error);
        Taro.showToast({ title: "获取数据失败", icon: "none" });
        setPosts([]);
      }
    };

    fetchUserPosts();
  }, []);

  return (
    <View className="page">
      <View className="post-list">
        {posts.map((post, idx) => (
          <PostCard
            key={idx}
            url={post.userAvatar}
            name={post.username}
            location={post.location || "未知位置"}
            time={post.createdAt}
            title="用户帖子"
            label={post.content}
            tags={post.tags || []}
          />
        ))}
      </View>
    </View>
  );
};

export default CurrentPosts;
