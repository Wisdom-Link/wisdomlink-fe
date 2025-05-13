/* eslint-disable jsx-quotes */
import { View, Text, Button } from "@tarojs/components";
import { AtAvatar, AtTag } from "taro-ui";
import Taro from "@tarojs/taro";
import "./PostCard.scss";

// 帖子卡片组件
const PostCard = ({ avatarUrl, name, time, location, content, tags }) => (
  <View className="post-card">
    <View className="post-header">
      <AtAvatar circle size="small" image={avatarUrl} />
      <View className="post-header-info">
        <View className="post-header-row">
          <Text className="post-name">{name}</Text>
          <Text className="post-time">{time}</Text>
        </View>
        <Text className="post-location">{location}</Text>
      </View>
    </View>
    <View className="post-content">{content}</View>
    <View className="post-tags">
      {tags && tags.map(tag => (
        <AtTag key={tag} circle className="post-tag">{tag}</AtTag>
      ))}
    </View>
    <Button
      className="post-btn"
      type="primary"
      onClick={() => Taro.navigateTo({ url: "/pages/chat/index" })}
    >
      <Text className="post-btn-icon">💬</Text> 回答问题
    </Button>
  </View>
);

export default PostCard;
