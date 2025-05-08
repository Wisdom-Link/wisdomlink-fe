/* eslint-disable jsx-quotes */
import React, { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { AtAvatar, AtTag, AtRate, AtButton } from "taro-ui";
import { View, Text } from "@tarojs/components";
import Card from "../../components/Card";
import avatarDefault from "../../assets/头像.jpeg";
import test from "../../assets/风景图.jpg";
import "./index.scss";
import { request } from "../../utils/request";

const PersonalCenter: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    motto: "",
    gender: "",
    taps: [],
    avatar: "",
  });
  const [stars, setStars] = useState(0);

  useEffect(() => {
    request({
      url: "/user/getInfo",
      method: "GET",
    }).then((data) => {
      setUserInfo(data);
      setStars(data.level || 0);
    });
  }, []);

  const history = [
    { size: "large", url: test, title: "考研", label: "英语真题" },
    { size: "large", url: test, title: "考研", label: "英语真题" },
    { size: "large", url: test, title: "考研", label: "英语真题" },
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
      url: "/pages/allPosts/index",
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
              <>
                <View className="item">
                  <AtTag size="small" type="primary" circle>
                    woaini
                  </AtTag>
                </View>
                <View className="item">
                  <AtTag size="small" type="primary" circle>
                    woaini
                  </AtTag>
                </View>
                <View className="item">
                  <AtTag size="small" type="primary" circle>
                    woaini
                  </AtTag>
                </View>
              </>
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
          <Text>现有帖子</Text>
          <AtButton size="small" type="primary" circle onClick={goToPosts}>
            查看现有帖子
          </AtButton>
        </View>
        <View className="cardList gradient-list">
          {history.map((card, index) => (
            <Card
              key={index}
              size={card.size}
              url={card.url}
              title={card.title}
              label={card.label}
            />
          ))}
          {/* 渐变遮罩层 */}
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
          {history.map((card, index) => (
            <Card
              key={index}
              size={card.size}
              url={card.url}
              title={card.title}
              label={card.label}
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
          {history.map((card, index) => (
            <Card
              key={index}
              size={card.size}
              url={card.url}
              title={card.title}
              label={card.label}
            />
          ))}
          <View className="list-gradient-mask" />
        </View>
      </View>
    </View>
  );
};

export default PersonalCenter;
