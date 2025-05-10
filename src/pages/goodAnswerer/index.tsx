/* eslint-disable jsx-quotes */
import React, { useState } from "react";
import { View, Text, ScrollView, Input, Button } from "@tarojs/components";
import { AtAvatar, AtTag, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtInput } from "taro-ui";
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
      <View
        className="answer-tag"
        style={{ display: "flex", alignItems: "center" }}
      >
        <AtTag circle>保研</AtTag>
        <AtTag circle>保研</AtTag>
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

  // 弹窗相关状态
  const [showModal, setShowModal] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formText, setFormText] = useState("");
  const [formTag, setFormTag] = useState("");
  // 可选标签示例
  const tags = ["保研", "考研", "出国", "就业"];

  const handleSend = () => {
    // 这里可以处理表单提交逻辑
    setShowModal(false);
    setFormTitle("");
    setFormText("");
    setFormTag("");
    // Taro.showToast({ title: "已提交", icon: "success" });
  };

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
      {/* 弹窗表单 */}
      <AtModal isOpened={showModal} onClose={() => setShowModal(false)}>
        <AtModalHeader>发送问题</AtModalHeader>
        <AtModalContent>
          <AtInput
            name="title"
            title="标题"
            placeholder="请输入标题"
            value={formTitle}
            onChange={v => setFormTitle(v as string)}
          />
          <AtInput
            name="text"
            title="内容"
            type="text"
            placeholder="请输入问题内容"
            value={formText}
            onChange={v => setFormText(v as string)}
          />
          <View style={{ margin: "16px 0 0 0" }}>标签</View>
          <View style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
            {tags.map(tag => (
              <AtTag
                key={tag}
                circle
                active={formTag === tag}
                onClick={() => setFormTag(tag)}
              >
                {tag}
              </AtTag>
            ))}
          </View>
        </AtModalContent>
        <AtModalAction>
          <Button onClick={() => setShowModal(false)}>取消</Button>
          <Button
            onClick={handleSend}
            disabled={!formTitle || !formText || !formTag}
            type="primary"
          >
            提交
          </Button>
        </AtModalAction>
      </AtModal>
      {/* 固定底部按钮，始终可见 */}
      <View className="fixed-bottom-btn">
        <Button
          type="primary"
          className="fixed-btn"
          onClick={() => setShowModal(true)}
        >
          发送问题
        </Button>
      </View>
    </>
  );
};

export default GoodAnswerer;
