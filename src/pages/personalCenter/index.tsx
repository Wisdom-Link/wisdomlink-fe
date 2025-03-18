/* eslint-disable jsx-quotes */
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {AtAvatar,AtTag } from 'taro-ui'
import {View} from "@tarojs/components";
import avatar from "../../assets/头像.jpeg";
import "./index.scss";

const personalCenter: React.FC = () => {
  return (
    <View className="page">
      <View className="header">
        <View className="up">
          <View className="avatar">
          <AtAvatar circle image={avatar} size='large'></AtAvatar>
          </View>
          <View className="text">
            <View className="name">木木</View>
            <View className="motto">万物都是自由的诗</View>
          </View>
          <View className="level">
          </View>
        </View>
        <View className="center"></View>
        <View className="down"></View>
      </View>

      <View></View>
    </View>
  );
};

export default personalCenter;
