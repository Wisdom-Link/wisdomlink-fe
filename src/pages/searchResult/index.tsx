/* eslint-disable jsx-quotes */
import React, { useState, useEffect } from "react";
import { View } from "@tarojs/components";
import Taro,{ getCurrentInstance } from "@tarojs/taro";
import "./index.scss";
import PostCard from "../../components/PostCard";
import { searchThread } from "../../apis/thread";
import { Post } from "../../types/thread";

const SearchResult: React.FC = () => {
  const [searchKey, setSearchKey] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const instance = getCurrentInstance();
    const query = instance?.router?.params?.query || "";
    setSearchKey(query);

    // 执行搜索
    const performSearch = async () => {
      if (!query.trim()) return;

      setLoading(true);
      try {
        const searchResults = await searchThread(query);
        setPosts(searchResults);
      } catch (error) {
        console.error("搜索失败:", error);
        Taro.showToast({ title: "搜索失败", icon: "none" });
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, []);

  return (
    <>
      <View className="page" style={{ paddingBottom: "70px" }}>
        <View className="title">
            {searchKey ? `"${decodeURIComponent(searchKey)}" 的搜索结果` : "搜索结果"}
        </View>
        {loading ? (
          <View style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#999"
          }}
          >
            搜索中...
          </View>
        ) : posts.length > 0 ? (
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
                    url: `/pages/chat/index?username=${username}&postContent=${post.content}`
                  });
                }}
              />
            ))}
          </View>
        ) : (
          <View style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#999"
          }}
          >
            {searchKey ? `没有找到与"${decodeURIComponent(searchKey)}"相关的内容` : "请输入搜索关键词"}
          </View>
        )}
      </View>
    </>
  );
};

export default SearchResult;

