/* eslint-disable jsx-quotes */
import React, { useState, useEffect } from "react";
import Taro, { useDidShow } from "@tarojs/taro";
import { AtAvatar, AtTag, AtRate, AtButton } from "taro-ui";
import { View, Text } from "@tarojs/components";
import Card from "../../components/Card";
import { getInfo } from "../../apis/user";
import { getQuestionerChats, getAnswererChats } from "../../apis/chat";
import { getThreadsByUsername } from "../../apis/thread";
import { Chat } from "../../types/chat";
import "./index.scss";

const defaultAvatar = "http://szsykcdad.hn-bkt.clouddn.com/avatar/%E9%BB%98%E8%AE%A4123456789.png";

const PersonalCenter: React.FC = () => {
  const [userInfo, setUserInfo] = useState<{
      username: string;
      motto: string;
      taps: string[];
      avatar: string;
      level: number;
      questionCount: number;
      answerCount: number;
      highQualityAnswerCount: number;
    }>({
      username: "",
      motto: "",
      taps: [],
      avatar: "",
      level: 1,
      questionCount: 0,
      answerCount: 0,
      highQualityAnswerCount: 0,
    });
  const [stars, setStars] = useState(0);
  const [askChats, setAskChats] = useState<Chat[]>([]);
  const [answerChats, setAnswerChats] = useState<Chat[]>([]);
  const [userThreads, setUserThreads] = useState<any[]>([]);

  // 获取对话数据
  const fetchChatData = async () => {
    try {
      // 获取已完成的提问对话（最近4个）
      const questionerChats = await getQuestionerChats('completed');
      setAskChats(questionerChats.slice(0, 4));

      // 获取已完成的答题对话（最近4个）
      const answererChats = await getAnswererChats('completed');
      setAnswerChats(answererChats.slice(0, 4));
    } catch (error) {
      console.error("获取对话数据失败:", error);
      // 使用空数组作为fallback
      setAskChats([]);
      setAnswerChats([]);
    }
  };

  // 获取用户信息的函数
  const fetchUserInfo = async () => {
    try {
      // 先尝试从本地存储获取
      const storedUserInfo = Taro.getStorageSync("userInfo");
      if (storedUserInfo) {
        setUserInfo(storedUserInfo);
        setStars(storedUserInfo.level || 1);
      }

      // 然后从服务器获取最新数据
      const latestUserInfo = await getInfo();
      if (latestUserInfo) {
        setUserInfo(latestUserInfo);
        setStars(latestUserInfo.level || 1);
        // 更新本地存储
        Taro.setStorageSync("userInfo", latestUserInfo);
      }
    } catch (error) {
      console.error("获取用户信息失败:", error);
      // 如果网络请求失败，至少显示本地存储的数据
      const storedUserInfo = Taro.getStorageSync("userInfo");
      if (storedUserInfo) {
        setUserInfo(storedUserInfo);
        setStars(storedUserInfo.level || 1);
      }
    }
  };

  // 获取用户帖子数据
  const fetchUserThreads = async () => {
    try {
      const storedUserInfo = Taro.getStorageSync("userInfo");
      if (storedUserInfo?.username) {
        const threads = await getThreadsByUsername(storedUserInfo.username);
        setUserThreads(threads || []);
      }
    } catch (error) {
      console.error("获取用户帖子失败:", error);
      setUserThreads([]);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // 每次页面显示时重新获取用户信息
  useDidShow(() => {
    fetchUserInfo();
  });

  // 跳转到管理用户资料
  const goToUserInfo = () => {
    Taro.navigateTo({
      url: "/pages/changeInfo/index",
    });
  };

  // 跳转到管理现有帖子
  const goToPosts = () => {
    Taro.navigateTo({
      url: "/pages/changePosts/index",
    });
  };

  // 跳转到对话
  const goToChats = () => {
    Taro.navigateTo({
      url: "/pages/allChats/index",
    });
  };

  // 初始化加载用户信息和对话数据
  useEffect(() => {
    const init = async () => {
      await fetchUserInfo();
      await fetchChatData();
      await fetchUserThreads();
    };
    init();
  }, []);

  // 每次页面显示时重新获取用户信息
  useDidShow(() => {
    const refreshData = async () => {
      await fetchUserInfo();
      await fetchUserThreads();
    };
    refreshData();
  });

  return (
    <View className="page">
      <View className="mask">
        <View className="header">
          <View className="up">
            <View className="avatar">
              <AtAvatar
                circle
                image={userInfo.avatar ? userInfo.avatar : defaultAvatar}
                size="large"
              ></AtAvatar>
            </View>
            <View className="text">
              <View className="name">{userInfo.username || "未登录"}</View>
              <View className="motto">{userInfo.motto || "暂无个性签名"}</View>
            </View>
            <View className="level">
              <View className="levelText">星级：</View>
              <AtRate
                max={3}
                size={20}
                value={stars}
              />
            </View>
          </View>
          <View className="center">
            {Array.isArray(userInfo.taps) && userInfo.taps.length > 0 ? (
              userInfo.taps.map((tag, idx) => (
                <View className="item" key={idx}>
                  <AtTag size="small" type="primary" circle>
                    {tag}
                  </AtTag>
                </View>
              ))
            ) : (
                <View className="item">
                  <AtTag size="small" type="primary" circle>
                    暂无标签捏
                  </AtTag>
                </View>
            )}
          </View>
          <View className="down">
            <View className="down-item">
              <View className="text1">{userInfo.highQualityAnswerCount}/{userInfo.answerCount}</View>
              <View className="text2">优质回答</View>
            </View>
            <View className="down-item">
              <View className="text1">{userInfo.questionCount}</View>
              <View className="text2">提问</View>
            </View>
            <View style={{ width: "30%" }}></View>
            <View className="change">
              <AtButton
                size="small"
                type="primary"
                circle
                onClick={goToUserInfo}
              >
                管理用户资料
              </AtButton>
            </View>
          </View>
        </View>
      </View>
      <View>
        <View className="title">
          <Text>现有问题</Text>
          <AtButton size="small" type="primary" circle onClick={goToPosts}>
            管理现有问题
          </AtButton>
        </View>
        <View className="cardList gradient-list">
          {userThreads.length > 0 ? (
            userThreads.map((thread, index) => (
              <Card
                key={thread._id || index}
                size="large"
                url={thread.imageUrl || "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E7%A4%BE%E5%8C%BA/%E9%97%AE%E9%A2%98/%E9%9F%B3%E4%B9%90/%E9%9F%B3%E4%B9%901.jpg"}
                title={thread.content || "暂无标题"}
                tags={Array.isArray(thread.tags) ? thread.tags : []}
                onClick={() => {
                  // 可以添加跳转到帖子详情的逻辑
                  console.log("点击帖子:", thread);
                }}
              />
            ))
          ) : (
            <View style={{ padding: "40rpx", textAlign: "center", color: "#999" }}>
              暂无现有问题
            </View>
          )}
          <View className="list-gradient-mask" />
        </View>
      </View>
      <View>
        <View className="title">
          <Text>提问对话</Text>
          <AtButton size="small" type="primary" circle onClick={goToChats}>
           查看全部对话
          </AtButton>
        </View>
        <View className="cardList gradient-list">
          {askChats.length > 0 ? (
            askChats.map((chat, index) => (
              <Card
                key={index}
                size="large"
                url={chat.imageUrl || "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E7%A4%BE%E5%8C%BA/%E9%97%AE%E9%A2%98/%E6%B3%95%E5%BE%8B/%E6%B3%95%E5%BE%8B2.jpg"}
                title={chat.subject}
                tags={Array.isArray(chat.tap) ? chat.tap : []}
                onClick={() => {
                  Taro.navigateTo({
                    url: `/pages/chat/index?chatId=${chat._id}`
                  });
                }}
              />
            ))
          ) : (
            <View style={{ padding: "40rpx", textAlign: "center", color: "#999" }}>
              暂无提问对话
            </View>
          )}
          <View className="list-gradient-mask" />
        </View>
      </View>
      <View>
        <View className="title">
          <Text>答题对话</Text>
          <AtButton size="small" type="primary" circle onClick={goToChats}>
            查看全部对话
          </AtButton>
        </View>
        <View className="cardList gradient-list">
          {answerChats.length > 0 ? (
            answerChats.map((chat, index) => (
              <Card
                key={index}
                size="large"
                url={chat.imageUrl || "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E7%A4%BE%E5%8C%BA/%E9%97%AE%E9%A2%98/%E6%B3%95%E5%BE%8B/%E6%B3%95%E5%BE%8B3.jpg"}
                title={chat.subject}
                tags={Array.isArray(chat.tap) ? chat.tap : []}
                onClick={() => {
                  Taro.navigateTo({
                    url: `/pages/chat/index?chatId=${chat._id}`
                  });
                }}
              />
            ))
          ) : (
            <View style={{ padding: "40rpx", textAlign: "center", color: "#999" }}>
              暂无答题对话
            </View>
          )}
          <View className="list-gradient-mask" />
        </View>
      </View>
    </View>
  );
};

export default PersonalCenter;
