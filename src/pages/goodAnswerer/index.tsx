/* eslint-disable jsx-quotes */
import React, { useState } from "react";
import { View, Text, ScrollView, Input, Button } from "@tarojs/components";
import { AtAvatar, AtTag } from "taro-ui";
import Taro from "@tarojs/taro";
import avatar from "../../assets/头像.jpeg";
import "./index.scss";

const AnswererCard = ({ url, title, label }) => {
  return (
    <View className="card">
      <View className="card-picture">
        <AtAvatar circle image={url}></AtAvatar>
      </View>
      <View className="card-content">
        <View className="card-title">{title}</View>
        <View className="card-label">{label}</View>
      </View>
    </View>
  );
};

const Answer = () => {

  return (
    <View className="answer">
      <View className="answer-header">
        <View className="answer-avatar">
          <AtAvatar circle size="small" image={avatar}></AtAvatar>
        </View>
        <View className="answer-text">
          <View className="answer-name">
            <Text>刘思</Text>
          </View>
          <View className="answer-time">
            <Text>湖北省</Text>
            <View style={{ width: 6 }} />
            <Text>一个小时前</Text>
          </View>
        </View>
        <View className="answer-more">
          <Button
            className="follow-btn"
            onClick={() => Taro.navigateTo({ url: "/pages/chat/index" })}
          >
            回答问题
          </Button>
        </View>
      </View>
      <View className="answer-content">
        <View className="answer-title">关于保研问题</View>
        <View className="answer-label">
          1.了解导师研究方向，展现兴趣方向。2.成绩优良，科研经历丰富。3.提前准备申请材料，准确无误填写表格
        </View>
      </View>
      <View className="answer-tag" style={{ display: "flex", alignItems: "center" }}>
        <AtTag circle>
          保研
        </AtTag>
        <AtTag circle>
          保研
        </AtTag>

      </View>
    </View>
  );
};

const GoodAnswerer: React.FC = () => {
  const Cards = [
    { url: avatar, title: "张三", label: "1条" },
    { url: avatar, title: "李四", label: "2条" },
    { url: avatar, title: "王二麻子", label: "3条" },
    { url: avatar, title: "张三", label: "1条" },
    { url: avatar, title: "李四", label: "2条" },
    { url: avatar, title: "王二麻子", label: "3条" },
  ];

  return (
    <>
      <View className="page" style={{ paddingBottom: "70px" }}>
        <View className="title">排名</View>
        <ScrollView scrollX className="scroll-container">
          <View className="scroll-content">
            {Cards.map((card, index) => (
              <AnswererCard
                key={index}
                url={card.url}
                title={card.title}
                label={card.label}
              />
            ))}
          </View>
        </ScrollView>
        <View className="answerlist">
          <View className="title">热门话题</View>
          <Answer />
          <Answer />
          <Answer />
          <Answer />
          <Answer />
          <Answer />
        </View>
      </View>
      {/* 固定底部按钮，始终可见 */}
      <View
        className="fixed-bottom-btn"
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          width: "100vw",
          background: "#fff",
          zIndex: 9999,
          padding: "10px 16px 20px 16px",
          boxSizing: "border-box",
          boxShadow: "0 -2px 8px rgba(0,0,0,0.04)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          type="primary"
          onClick={() => Taro.navigateTo({ url: "/pages/askQuestion/index" })}
        >
          发送问题
        </Button>
      </View>
    </>
  );
};

export default GoodAnswerer;
