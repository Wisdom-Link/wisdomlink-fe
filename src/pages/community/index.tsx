/* eslint-disable jsx-quotes */
import React, { useState } from "react";
import { View,ScrollView  } from "@tarojs/components";
import cartoon from "../../assets/头像 女孩.png";
import test from "../../assets/风景图.jpg";
import Card from "../../components/Card";
import "./index.scss";

const Community: React.FC = () => {

  // 按 size 分类的 Card 数据
  const smallCards = [
    { size: "small", url: cartoon, title: "高考" },
    { size: "small", url: cartoon, title: "高考" },
    { size: "small", url: cartoon, title: "高考" },
    { size: "small", url: cartoon, title: "高考" },
    { size: "small", url: cartoon, title: "高考" },
    { size: "small", url: cartoon, title: "高考" },
    { size: "small", url: cartoon, title: "高考" },
    { size: "small", url: cartoon, title: "高考" },
    { size: "small", url: cartoon, title: "高考" }
  ];
  const middleCards = [
    { size: "middle", url: test, title: "高考", label: "数学真题" },
    { size: "middle", url: test, title: "高考", label: "数学真题" },
    { size: "middle", url: test, title: "高考", label: "数学真题" },
    { size: "middle", url: test, title: "高考", label: "数学真题" },
    { size: "middle", url: test, title: "高考", label: "数学真题" },
  ];
  const largeCards = [
    { size: "large", url: test, title: "考研", label: "英语真题" },
    { size: "large", url: test, title: "考研", label: "英语真题" },
    { size: "large", url: test, title: "考研", label: "英语真题" },
  ];

  return (
    <View className="page">
      <View className="title">社区</View>
      <ScrollView scrollX className="scroll-container">
        <View className="scroll-content">
          {smallCards.map((card, index) => (
            <Card key={index} size={card.size} url={card.url} title={card.title} />
          ))}
        </View>
      </ScrollView>

      <View className="title">热门问题</View>
      <ScrollView scrollX className="scroll-container">
        <View className="scroll-content">
          {middleCards.map((card, index) => (
            <Card key={index} size={card.size} url={card.url} title={card.title} label={card.label} />
          ))}
        </View>
      </ScrollView>

      <View className="title">高分解答员</View>
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
      </View>
    </View>
  );
};

export default Community;
