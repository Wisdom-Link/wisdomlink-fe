/* eslint-disable jsx-quotes */
import React, { useState } from "react";
import Taro, { useDidShow } from "@tarojs/taro";
import { View, ScrollView } from "@tarojs/components";
import Card from "../../components/Card";
import PostCard from "../../components/PostCard";
import { getRandomThreads } from "../../apis/thread";
import { Post } from "../../types/thread"
import "./index.scss";


const Community: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const changeRoute = (id: number) => {
    Taro.navigateTo({
      url: `/pages/goodAnswerer/index?id=${id}`,
    });
  };

  // 获取随机帖子作为热门问题
  useDidShow(() => {
    const fetchRandomPosts = async () => {
      try {
        const randomPosts = await getRandomThreads(10); // 获取10个随机帖子
        setPosts(randomPosts);
      } catch (error) {
        console.error("获取随机帖子失败:", error);
        // 如果接口失败，可以使用默认数据或显示错误信息
        Taro.showToast({ title: "获取数据失败", icon: "none" });
      }
    };

    fetchRandomPosts();
  });

  // 按 size 分类的 Card 数据
  const smallCards = [
    {
      id: 1,
      size: "small",
      url: "http://wisdomlink-img.marswu23.cn/community/%E5%AD%A6%E4%B8%9A.jpg",
      title: "学业",
    },
    {
      id: 2,
      size: "small",
      url: "http://wisdomlink-img.marswu23.cn/community/%E5%AE%B6%E5%BA%AD.webp",
      title: "家庭",
    },
    {
      id: 3,
      size: "small",
      url: "http://wisdomlink-img.marswu23.cn/community/%E4%BA%8B%E4%B8%9A.webp",
      title: "事业",
    },
  ];
  return (
    <View className="page">
      <View className="title">社区</View>
      <ScrollView scrollX className="scroll-container">
        <View className="scroll-content">
          {smallCards.map((card) => (
            <Card
              key={card.id}
              size={card.size}
              url={card.url}
              title={card.title}
              onClick={() => changeRoute(card.id)}
            />
          ))}
        </View>
      </ScrollView>
      <View className="title">热门问题</View>
      <View className="post-list">
        {posts.map((post, idx) => (
          <PostCard
            key={idx}
            userAvatar={post.userAvatar}
            username={post.username}
            createdAt={post.createdAt}
            location={post.location}
            community={post.community}
            content={post.content}
            tags={post.tags}
            mode="answer"
            onAnswer={(username) => {
              Taro.navigateTo({
                url: `/pages/chat/index?username=${username}&postContent=${encodeURIComponent(post.content)}&postTags=${encodeURIComponent(post.tags?.join(',') || '')}&postId=${post._id}`
              });
            }}
          />
        ))}
      </View>
    </View>
  );
};


export default Community;
