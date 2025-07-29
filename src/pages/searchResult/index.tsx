/* eslint-disable jsx-quotes */
import React, { useState, useEffect } from "react";
import { View } from "@tarojs/components";
import Taro,{ getCurrentInstance } from "@tarojs/taro";
import "./index.scss";
import PostCard from "../../components/PostCard";

// 新的帖子数据结构
const posts = [
  {
    avatar: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E4%B8%AA%E4%BA%BA%E4%BF%A1%E6%81%AF/%E5%A4%B4%E5%83%8F/%E5%B0%8F%E7%BA%A2%E5%90%8C%E5%AD%A6.jpeg",
    name: "小红同学",
    time: "2024-06-01 09:20",
    location: "湖北省武汉市",
    content:
      "我是华中师范大学24级统计学的一名学生，从下学期开始我们要求选专业选修课，但是我不清楚哪些专业选修课对我个人专业能力提升更有帮助，请问有学长学姐可以给我一些建议吗？",
    tags: ["华中师范大学", "统计学", "人才培养","选课"],
  },
  {
    avatar: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E4%B8%AA%E4%BA%BA%E4%BF%A1%E6%81%AF/%E5%A4%B4%E5%83%8F/%E5%81%A5%E8%BA%AB%E8%BE%BE%E4%BA%BA.jpg",
    name: "天天自律",
    time: "2024-05-28 18:45",
    location: "湖北省武汉市",
    content:
      "我是武汉大学24级电子信息学院的一名学生，现在我刚入学，发现大学为我们提供了非常多的学生工作的机会，但是我不知道如何选择，也不了解各个工作具体是做什么的，担心踩坑。有经验的学长学姐可以帮我了解了解吗？",
    tags: ["武汉大学", "电子信息学院", "学生工作"],
  },
  {
    avatar: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E4%B8%AA%E4%BA%BA%E4%BF%A1%E6%81%AF/%E5%A4%B4%E5%83%8F/%E6%97%85%E8%A1%8C%E5%B0%8F%E7%86%8A.jpg",
    name: "快乐小熊",
    time: "2024-05-20 14:10",
    location: "四川省成都市",
    content:
      "我是一位新手宝妈，孩子目前八个月，近期孩子偶尔有吐奶的现象，我比较担心，请问家长们有什么好的解决办法吗？",
    tags: ["0-2岁", "育儿", "宝爸宝妈","新手"],
  },
];

const GoodAnswerer: React.FC = () => {
  const [searchKey, setSearchKey] = useState<string>("");

  useEffect(() => {
    const instance = getCurrentInstance();
    const key = instance?.router?.params?.query || "1";
    setSearchKey(key);
  }, []);

  return (
    <>
      <View className="page" style={{ paddingBottom: "70px" }}>
        <View className="title">{searchKey}-搜索结果</View>
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
    </>
  );
};


export default GoodAnswerer;

