/* eslint-disable jsx-quotes */
import { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View,Image,Swiper, SwiperItem} from "@tarojs/components";
import { AtIcon } from "taro-ui";
import  SearchBox  from "../../components/SearchBox";
import "./index.scss";
import AICard from "../../components/AICard";

const cardList = [
  {id:1, url: "http://szsykcdad.hn-bkt.clouddn.com/cartoon/%E5%8D%A1%E9%80%9A1.jpg", title: "智能体1号", label: "关于学业的问题都可以问我" },
  {id:2, url: "http://szsykcdad.hn-bkt.clouddn.com/cartoon/%E5%8D%A1%E9%80%9A2.webp", title: "智能体2号", label: "关于家庭的问题都可以问我" },
  {id:3, url: "http://szsykcdad.hn-bkt.clouddn.com/cartoon/%E5%8D%A1%E9%80%9A3.webp", title: "智能体3号", label: "关于事业的问题都可以问我" },
];

const bannerList = [
  { id: 1, url: "http://szsykcdad.hn-bkt.clouddn.com/community/%E5%AD%A6%E4%B8%9A.jpg", title: "学业" },
  { id: 2, url: "http://szsykcdad.hn-bkt.clouddn.com/community/%E5%AE%B6%E5%BA%AD.webp", title: "家庭" },
  { id: 3, url: "http://szsykcdad.hn-bkt.clouddn.com/community/%E4%BA%8B%E4%B8%9A.webp", title: "事业" },
 ]

const MainPage: React.FC = () => {
  const changeRoute=(id:number)=>{
    Taro.navigateTo({ url: `/pages/chat/index?chatId=${id}` });
  }

  return (
    <View className="page">
      <View
        className="header"
        style={{
          backgroundImage: `url('http://szsykcdad.hn-bkt.clouddn.com/header/%E5%A4%B4%E9%83%A8%E5%9B%BE%E7%89%87.jpg')`,
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
        {bannerList.map((item) => (
          <SwiperItem key={item.id}>
            <View className='demo-text'>
              <View className="banner-label">{item.title}</View>
              <Image src={item.url} mode="aspectFill" style={{ width: "100%", height: "100%" }} />
            </View>
          </SwiperItem>
        ))}
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
