/* eslint-disable jsx-quotes */
import React, { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View,ScrollView  } from "@tarojs/components";
import cartoon from "../../assets/头像 女孩.png";
import test from "../../assets/风景图.jpg";
import Card from "../../components/Card";
import "./index.scss";

const Community: React.FC = () => {

  const changeRoute=(id:number)=>{
        Taro.navigateTo({
          url: `/pages/goodAnswerer/index?id=${id}`
        })
      }
  // 按 size 分类的 Card 数据
  const smallCards = [
    {id:1, size: "small", url: cartoon, title: "高考" },
    {id:2, size: "small", url: cartoon, title: "高考" },
    {id:3, size: "small", url: cartoon, title: "高考" },
    {id:4, size: "small", url: cartoon, title: "高考" },
    {id:5, size: "small", url: cartoon, title: "高考" },
    {id:6, size: "small", url: cartoon, title: "高考" },
    {id:7, size: "small", url: cartoon, title: "高考" },
    {id:8, size: "small", url: cartoon, title: "高考" },
    {id:9, size: "small", url: cartoon, title: "高考" }
  ];
  const middleCards = [
    {id:1, size: "middle", url: test, title: "高考", label: "数学真题" },
    {id:2, size: "middle", url: test, title: "高考", label: "数学真题" },
    {id:3, size: "middle", url: test, title: "高考", label: "数学真题" },
    {id:4, size: "middle", url: test, title: "高考", label: "数学真题" },
    {id:5, size: "middle", url: test, title: "高考", label: "数学真题" },
  ];

  return (
    <View className="page">
      <View className="title">社区</View>
      <ScrollView scrollX className="scroll-container">
        <View className="scroll-content">
          {smallCards.map((card) => (
            <Card key={card.id} size={card.size} url={card.url} title={card.title} onClick={()=>changeRoute(card.id)} />
          ))}
        </View>
      </ScrollView>

      <View className="title">热门问题</View>
      <ScrollView scrollX className="scroll-container">
        <View className="scroll-content">
          {middleCards.map((card) => (
            <Card key={card.id} size={card.size} url={card.url} title={card.title} label={card.label} onClick={()=>changeRoute(card.id)} />
          ))}
        </View>
      </ScrollView>

      {/* <View className="title">高分解答员</View>
      <View className="answerer">
        {largeCards.map((card, index) => (
          <Card
            key={index}
            size={card.size}
            url={card.url}
            title={card.title}
            label={card.label}
          />
        ))}
      </View> */}
    </View>
  );
};

export default Community;
