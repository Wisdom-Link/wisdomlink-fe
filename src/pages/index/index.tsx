/* eslint-disable jsx-quotes */
import { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View,Image,Swiper, SwiperItem} from "@tarojs/components";
import { AtIcon } from "taro-ui";
import  SearchBox  from "../../components/SearchBox";
import cartoon from "../../assets/头像 女孩.png";
import "./index.scss";
import AICard from "../../components/AICard";

const cardList = [
  {id:1, url: cartoon, title: "智能体1号", label: "关于教育的问题都可以问我" },
  {id:2, url: cartoon, title: "智能体2号", label: "关于法律的问题都可以问我" },
  {id:3, url: cartoon, title: "智能体3号", label: "关于健身的问题都可以问我" },
];

const bannerList = [
  { id: 1, url: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E4%B8%BB%E9%A1%B5/banner/%E6%95%99%E8%82%B2.jpg", title: "教育" },
  { id: 2, url: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E4%B8%BB%E9%A1%B5/banner/%E5%81%A5%E8%BA%AB.jpg", title: "健身" },
  { id: 3, url: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E4%B8%BB%E9%A1%B5/banner/%E6%97%85%E6%B8%B8.jpg", title: "旅游" },
  { id: 4, url: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E4%B8%BB%E9%A1%B5/banner/%E9%9F%B3%E4%B9%90.jpg", title: "音乐" },
  { id: 5, url: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E4%B8%BB%E9%A1%B5/banner/%E6%B3%95%E5%BE%8B.jpg", title: "法律" },
  { id: 6, url: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E4%B8%BB%E9%A1%B5/banner/%E5%BD%B1%E8%A7%86.png", title: "影视" },
  { id: 7, url: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E4%B8%BB%E9%A1%B5/banner/%E5%8C%BB%E7%96%97.jpg", title: "医疗" },
  { id: 8, url: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E4%B8%BB%E9%A1%B5/banner/%E7%83%B9%E9%A5%AA.jpg", title: "烹饪" },
  { id: 9, url: "https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E4%B8%BB%E9%A1%B5/banner/%E6%B8%B8%E6%88%8F.jpg", title: "游戏" },
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
          backgroundImage: `url('https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E4%B8%BB%E9%A1%B5/header/%E5%A4%B4%E9%83%A8%E5%9B%BE%E7%89%87.jpg')`,
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
