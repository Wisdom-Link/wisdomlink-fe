/* eslint-disable jsx-quotes */
import React, { useState, useEffect } from "react";
import Taro, { useDidShow } from "@tarojs/taro";
import { AtAvatar, AtTag, AtRate, AtButton } from "taro-ui";
import { View, Text } from "@tarojs/components";
import Card from "../../components/Card";
import { getInfo } from "../../apis/user";
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

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // 每次页面显示时重新获取用户信息
  useDidShow(() => {
    fetchUserInfo();
  });

  // 现有问题
  const history = [
    { size: "large", url: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E7%A4%BE%E5%8C%BA/%E9%97%AE%E9%A2%98/%E9%9F%B3%E4%B9%90/%E9%9F%B3%E4%B9%901.jpg", title: "零基础如何学钢琴？", tags: ["音乐", "兴趣", "入门"] },
    { size: "large", url: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E7%A4%BE%E5%8C%BA/%E9%97%AE%E9%A2%98/%E6%95%99%E8%82%B2/%E6%95%99%E8%82%B22.jpg", title: "高考志愿填报注意事项？", tags: ["教育", "高考", "志愿"] },
    { size: "large", url: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E7%A4%BE%E5%8C%BA/%E9%97%AE%E9%A2%98/%E5%BD%B1%E8%A7%86/%E5%BD%B1%E8%A7%861.jpg", title: "最近有哪些好看的国产电影？", tags: ["影视", "电影", "推荐"] },
    { size: "large", url: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E7%A4%BE%E5%8C%BA/%E9%97%AE%E9%A2%98/%E7%83%B9%E9%A5%AA/%E7%83%B9%E9%A5%AA1.jpg", title: "如何做出好吃的红烧肉？", tags: ["烹饪", "美食", "家常菜"] },
  ];

  // 提问对话
  const askChats = [
    { size: "large", url: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E7%A4%BE%E5%8C%BA/%E9%97%AE%E9%A2%98/%E6%B3%95%E5%BE%8B/%E6%B3%95%E5%BE%8B2.jpg", title: "遇到交通事故如何维权？", tags: ["法律", "交通", "维权"] },
    { size: "large", url: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E7%A4%BE%E5%8C%BA/%E9%97%AE%E9%A2%98/%E5%81%A5%E8%BA%AB/%E5%81%A5%E8%BA%AB2.jpg", title: "增肌期间饮食怎么安排？", tags: ["健身", "饮食", "增肌"] },
    { size: "large", url: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E7%A4%BE%E5%8C%BA/%E9%97%AE%E9%A2%98/%E6%97%85%E6%B8%B8/%E6%97%85%E6%B8%B81.jpg", title: "成都有哪些美食推荐？", tags: ["旅游", "美食", "推荐"] },
    { size: "large", url: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E7%A4%BE%E5%8C%BA/%E9%97%AE%E9%A2%98/%E5%8C%BB%E7%96%97/%E5%8C%BB%E7%96%973.jpg", title: "感冒发烧如何自我护理？", tags: ["医疗", "护理", "常见病"] },
    ];

  // 答题对话
  const answerChats = [
    { size: "large", url: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E7%A4%BE%E5%8C%BA/%E9%97%AE%E9%A2%98/%E6%B3%95%E5%BE%8B/%E6%B3%95%E5%BE%8B3.jpg", title: "劳动合同到期后怎么办？", tags: ["法律", "劳动", "合同"] },
    { size: "large", url: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E7%A4%BE%E5%8C%BA/%E9%97%AE%E9%A2%98/%E9%9F%B3%E4%B9%90/%E9%9F%B3%E4%B9%902.jpg", title: "流行歌曲推荐？", tags: ["音乐", "流行", "推荐"] },
    { size: "large", url: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E7%A4%BE%E5%8C%BA/%E9%97%AE%E9%A2%98/%E6%B8%B8%E6%88%8F/%E6%B8%B8%E6%88%8F3.jpg", title: "英雄联盟上分心得？", tags: ["游戏", "英雄联盟", "心得"] },
    { size: "large", url: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E7%A4%BE%E5%8C%BA/%E9%97%AE%E9%A2%98/%E7%83%B9%E9%A5%AA/%E7%83%B9%E9%A5%AA3.jpg", title: "早餐怎么吃更营养？", tags: ["烹饪", "早餐", "营养"] },
  ];

  const handleStarChange = (value) => {
    setStars(value);
  };

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
                onChange={handleStarChange}
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
          {history.length > 0 ? (
            history.map((card, index) => (
              <Card
                key={index}
                size={card.size}
                url={card.url}
                title={card.title}
                tags={card.tags}
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
            askChats.map((card, index) => (
              <Card
                key={index}
                size={card.size}
                url={card.url}
                title={card.title}
                tags={card.tags}
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
            answerChats.map((card, index) => (
              <Card
                key={index}
                size={card.size}
                url={card.url}
                title={card.title}
                tags={card.tags}
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
