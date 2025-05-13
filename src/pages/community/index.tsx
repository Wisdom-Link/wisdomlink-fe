/* eslint-disable jsx-quotes */
import React, { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, ScrollView } from "@tarojs/components";
import Card from "../../components/Card";
/* eslint-disable jsx-quotes */
import avatar from "../../assets/头像.jpeg";
import PostCard from "../../components/PostCard";
import "./index.scss";

// 模拟热门问题数据
const posts = [
  {
    avatar: avatar,
    name: "小红同学",
    time: "2024-06-01 09:20",
    location: "湖北省武汉市",
    content: "请问考研英语作文怎么高效准备？有没有推荐的资料和练习方法？",
    tags: ["考试", "考研", "英语"],
  },
  {
    avatar: avatar,
    name: "健身达人",
    time: "2024-05-28 18:45",
    location: "广东省深圳市",
    content: "最近想增肌，有没有适合新手的健身计划和饮食建议？",
    tags: ["健身", "增肌", "健康"],
  },
  {
    avatar: avatar,
    name: "旅行小熊",
    time: "2024-05-20 14:10",
    location: "四川省成都市",
    content: "端午节想去九寨沟旅游，有什么注意事项或者路线推荐吗？",
    tags: ["旅游", "九寨沟", "攻略"],
  },
];

const Community: React.FC = () => {
  const changeRoute = (id: number) => {
    Taro.navigateTo({
      url: `/pages/goodAnswerer/index?id=${id}`,
    });
  };
  // 按 size 分类的 Card 数据
  const smallCards = [
    {
      id: 1,
      size: "small",
      url: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E4%B8%BB%E9%A1%B5/banner/%E6%95%99%E8%82%B2.jpg",
      title: "教育",
    },
    {
      id: 2,
      size: "small",
      url: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E4%B8%BB%E9%A1%B5/banner/%E5%81%A5%E8%BA%AB.jpg",
      title: "健身",
    },
    {
      id: 3,
      size: "small",
      url: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E4%B8%BB%E9%A1%B5/banner/%E6%97%85%E6%B8%B8.jpg",
      title: "旅游",
    },
    {
      id: 4,
      size: "small",
      url: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E4%B8%BB%E9%A1%B5/banner/%E9%9F%B3%E4%B9%90.jpg",
      title: "音乐",
    },
    {
      id: 5,
      size: "small",
      url: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E4%B8%BB%E9%A1%B5/banner/%E6%B3%95%E5%BE%8B.jpg",
      title: "法律",
    },
    {
      id: 6,
      size: "small",
      url: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E4%B8%BB%E9%A1%B5/banner/%E5%BD%B1%E8%A7%86.png",
      title: "影视",
    },
    {
      id: 7,
      size: "small",
      url: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E4%B8%BB%E9%A1%B5/banner/%E5%8C%BB%E7%96%97.jpg",
      title: "医疗",
    },
    {
      id: 8,
      size: "small",
      url: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E4%B8%BB%E9%A1%B5/banner/%E7%83%B9%E9%A5%AA.jpg",
      title: "烹饪",
    },
    {
      id: 9,
      size: "small",
      url: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E4%B8%BB%E9%A1%B5/banner/%E6%B8%B8%E6%88%8F.jpg",
      title: "游戏",
    },
  ];
  // const middleCards = [
  //   {id:1, size: "middle", url: test, title: "高考", label: "数学真题" },
  //   {id:2, size: "middle", url: test, title: "高考", label: "数学真题" },
  //   {id:3, size: "middle", url: test, title: "高考", label: "数学真题" },
  //   {id:4, size: "middle", url: test, title: "高考", label: "数学真题" },
  //   {id:5, size: "middle", url: test, title: "高考", label: "数学真题" },
  // ];

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
      {/*
      <View className="title">热门问题</View>
      <ScrollView scrollX className="scroll-container">
        <View className="scroll-content">
          {middleCards.map((card) => (
            <Card key={card.id} size={card.size} url={card.url} title={card.title} label={card.label} onClick={()=>changeRoute(card.id)} />
          ))}
        </View>
      </ScrollView> */}
      <View className="title">热门问题</View>
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
  );
};

export default Community;
