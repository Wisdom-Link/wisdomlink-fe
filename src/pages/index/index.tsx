/* eslint-disable jsx-quotes */
import { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View,Image,Swiper, SwiperItem} from "@tarojs/components";
import { AtIcon } from "taro-ui";
import  SearchBox  from "../../components/SearchBox";
import cartoon from "../../assets/头像 女孩.png";
import logo from "../../assets/手机机器人.png";
import education from "../../assets/教育.jpg";
import fitness from "../../assets/健身.jpg";
import travel from "../../assets/旅游.jpg";
import headerPicture from "../../assets/头部图片.jpg";
import "./index.scss";
import AICard from "../../components/AICard";

const cardList = [
  {id:1, url: cartoon, title: "智能体1号", label: "关于教育的问题都可以问我" },
  {id:2, url: cartoon, title: "智能体2号", label: "关于法律的问题都可以问我" },
  {id:3, url: cartoon, title: "智能体3号", label: "关于健身的问题都可以问我" },
];

const MainPage: React.FC = () => {
  const changeRoute=(id:number)=>{
    Taro.setStorageSync('chatID',{id});
    Taro.switchTab({ url: '/pages/chat/index' });
  }

  return (
    <View className="page">
      <View
        className="header"
        style={{
          backgroundImage: `url(${headerPicture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <View className="left">
          <View className="title1">智汇桥</View>
          <View className="title2">有问必答</View>
        </View>
      </View>
      <View className="search">
        <View className="search-inner">
          <View className="search-icon">
            <AtIcon value="search" size={22} color="#6190e8" />
          </View>
          <View className="search-box-inner">
            <SearchBox />
          </View>
        </View>
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
          <View className='demo-text'>
            <View className="banner-label">教育</View>
            <Image src={education} mode="aspectFill" style={{ width: "100%", height: "100%" }} />
          </View>
        </SwiperItem>
        <SwiperItem>
          <View className='demo-text'>
            <View className="banner-label">健身</View>
            <Image src={fitness} mode="aspectFill" style={{ width: "100%", height: "100%" }} />
          </View>
        </SwiperItem>
        <SwiperItem>
          <View className='demo-text'>
            <View className="banner-label">旅游</View>
            <Image src={travel} mode="aspectFill" style={{ width: "100%", height: "100%" }} />
          </View>
        </SwiperItem>
      </Swiper>
      </View>
      <View className="title">
        AI智能小问
      </View>
      <View className="AiList">
      {cardList.map((item) => (
          <AICard key={item.id} url={item.url} title={item.title} label={item.label} onClick={()=>changeRoute(item.id)} />
        ))}
      </View>
    </View>
  );
};

export default MainPage;
