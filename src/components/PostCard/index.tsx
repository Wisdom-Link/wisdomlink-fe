/* eslint-disable jsx-quotes */
import { View, Text, Button } from "@tarojs/components";
import { AtAvatar, AtTag } from "taro-ui";
import Taro from "@tarojs/taro";
import { Post } from "../../types/thread";
import "./PostCard.scss";

// 帖子卡片组件
const PostCard: React.FC<Post> = ({
  userAvatar,
  username,
  createdAt,
  location,
  community,
  content,
  tags,
  mode = "answer", // 新增参数：answer 为回答模式，edit 为编辑模式
  onAnswer, // 回答模式下的回调函数
  onEdit // 编辑模式下的回调函数
}) => {
  const handleButtonClick = () => {
    if (mode === "edit" && onEdit) {
      onEdit();
    } else if (mode === "answer") {
      if (onAnswer) {
        onAnswer(username); // 传递用户名
      } else {
        // 默认行为：带着用户名跳转到聊天页面
        Taro.navigateTo({ url: `/pages/chat/index?username=${username}` });
      }
    }
  };

  return (
    <View className="post-card">
      <View className="post-header">
        <AtAvatar circle size="small" image={userAvatar} />
        <View className="post-header-info">
          <View className="post-header-row">
            <Text className="post-name">{username}</Text>
            <Text className="post-time">{createdAt}</Text>
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
        onClick={handleButtonClick}
      >
        {mode === "edit" ? (
          <>
            <Text className="post-btn-icon">✏️</Text> 修改问题
          </>
        ) : (
          <>
            <Text className="post-btn-icon">💬</Text> 回答问题
          </>
        )}
      </Button>
    </View>
  );
};

export default PostCard;
