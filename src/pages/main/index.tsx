/* eslint-disable jsx-quotes */
import { useState } from "react";
import { View, Text, Image,Swiper, SwiperItem} from "@tarojs/components";
import  SearchBox  from "../../components/SearchBox";
import cartoon from "../../assets/头像 女孩.png";
import logo from "../../assets/手机机器人.png";
import "./index.scss";
import AICard from "../../components/AICard";

const cardList = [
  { url: cartoon, title: "标题1", label: "标签1" },
  { url: cartoon, title: "标题2", label: "标签2" },
  { url: cartoon, title: "标题3", label: "标签3" },
];

const mainPage: React.FC = () => {


  return (
    <View className="page">
      <View className="header">
        <View className="left">
          <View className="title1">Hi~ 你好!</View>
          <View className="title2">有什么问题都可以问哦~</View>
        </View>
        <View className="right">
          <Image className="icon" src={logo} mode="heightFix" />
        </View>
      </View>
      <View className="search">
        <SearchBox />
      </View>
      <View className="title">
        问答社区
      </View>
      <View className="banner">
      <Swiper
        className='test-h'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        circular
        indicatorDots
        autoplay
      >
        <SwiperItem>
          <View className='demo-text-1'>1</View>
        </SwiperItem>
        <SwiperItem>
          <View className='demo-text-2'>2</View>
        </SwiperItem>
        <SwiperItem>
          <View className='demo-text-3'>3</View>
        </SwiperItem>
      </Swiper>
      </View>
      <View className="title">
        AI智能小问
      </View>
      <View className="AiList">
      {cardList.map((item, index) => (
          <AICard key={index} url={item.url} title={item.title} label={item.label} />
        ))}
      </View>
    </View>
  );
};

export default mainPage;
