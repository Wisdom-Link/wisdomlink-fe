/* eslint-disable jsx-quotes */
import { useState } from "react";
import { View, Image,Button } from "@tarojs/components";
import { AtButton } from 'taro-ui'
import cartoon from "../../assets/头像 女孩.png";
import "./index.scss";

const ChatPage: React.FC = () => {
  return (
    <View className="page">
      <View className="header">
        <View className="card">
          <View className="up">
            <View className="picture">
              <Image className="card-icon" src={cartoon}></Image>
            </View>
            <View className="contents">
              <View className="card-title">哈喽~</View>
              <View className="text">我是解答员xxx, 很高兴为您服务</View>
            </View>
          </View>
          <View className="down">
            <View className="down-text">评价:</View>
            <Button className="btn">优秀</Button>
            <Button className="btn">良好</Button>
            <Button className="btn">及格</Button>
            <Button className="btn">差劲</Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChatPage;
