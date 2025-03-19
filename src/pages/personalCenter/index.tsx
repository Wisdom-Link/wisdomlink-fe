/* eslint-disable jsx-quotes */
import Taro from '@tarojs/taro';
import React, { useState } from 'react';
import {AtAvatar,AtTag,AtRate,AtButton } from 'taro-ui'
import {View} from "@tarojs/components";
import avatar from "../../assets/头像.jpeg";
import "./index.scss";

const PersonalCenter: React.FC = () => {
  const [stars, setStars] = useState(0);
  const handleStarChange = (value) => {
    setStars(value);
  };

  return (
    <View className="page">
      <View className="mask">
        <View className="header">
          <View className="up">
            <View className="avatar">
              <AtAvatar circle image={avatar} size="large"></AtAvatar>
            </View>
            <View className="text">
              <View className="name">木木</View>
              <View className="motto">万物都是自由的诗</View>
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
          </View>
          <View className="down">
            <View className='down-item'>
              <View className='text1'>15/34</View>
              <View className='text2'>优质回答</View>
            </View>
            <View className='down-item'>
              <View className='text1'>24</View>
              <View className='text2'>提问</View>
            </View>
            <View className='down-item'>
              <View className='text1'>89</View>
              <View className='text2'>粉丝</View>
            </View>
            <View className='change'>
            <AtButton size='small' type="primary" circle>修改资料</AtButton>
            </View>
          </View>
        </View>
      </View>

      <View></View>
    </View>
  );
};

export default PersonalCenter;
