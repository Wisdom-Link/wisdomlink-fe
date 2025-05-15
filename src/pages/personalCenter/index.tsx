/* eslint-disable jsx-quotes */
import React, { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { AtAvatar, AtTag, AtRate, AtButton } from "taro-ui";
import { View, Text } from "@tarojs/components";
import Card from "../../components/Card";
import avatarDefault from "../../assets/头像.jpeg";
import "./index.scss";

const mockUserInfo = {
  username: "小红同学",
  motto: "热爱生活，乐于助人",
  gender: "female",
  taps: ["考研", "算法", "英语"],
  avatar: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E4%B8%AA%E4%BA%BA%E4%BF%A1%E6%81%AF/%E5%A4%B4%E5%83%8F/%E5%B0%8F%E7%BA%A2%E5%90%8C%E5%AD%A6.jpeg",
  level: 2,
};

const PersonalCenter: React.FC = () => {
  // 用模拟数据
  const [userInfo, setUserInfo] = useState<{
      username: string;
      motto: string;
      gender: string;
      taps: string[];
      avatar: string;
      level: number;
    }>({
      username: "",
      motto: "",
      gender: "",
      taps: [],
      avatar: "",
      level: 1,
    });
  const [stars, setStars] = useState(0);

  useEffect(() => {
    setUserInfo(mockUserInfo);
    setStars(mockUserInfo.level || 0);
  }, []);

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
                image={userInfo.avatar ? userInfo.avatar : avatarDefault}
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
              <View className="text1">15/34</View>
              <View className="text2">优质回答</View>
            </View>
            <View className="down-item">
              <View className="text1">24</View>
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
          {history.map((card, index) => (
            <Card
              key={index}
              size={card.size}
              url={card.url}
              title={card.title}
              tags={card.tags}
            />
          ))}
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
          {askChats.map((card, index) => (
            <Card
              key={index}
              size={card.size}
              url={card.url}
              title={card.title}
              tags={card.tags}
            />
          ))}
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
          {answerChats.map((card, index) => (
            <Card
              key={index}
              size={card.size}
              url={card.url}
              title={card.title}
              tags={card.tags}
            />
          ))}
          <View className="list-gradient-mask" />
        </View>
      </View>
    </View>
  );
};

export default PersonalCenter;
