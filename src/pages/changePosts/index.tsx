/* eslint-disable jsx-quotes */
import React, { useState, useEffect } from "react";
import { View, Button } from "@tarojs/components";
import {
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtTag,
  AtInput,
} from "taro-ui";
import Taro from "@tarojs/taro";
import { getThreadsByUsername, updateThread } from "../../apis/thread";
import { Post } from "../../types/thread";
import PostCard from "../../components/PostCard";
import "./index.scss";

const CurrentPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  // 弹窗相关状态
  const [showModal, setShowModal] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [formText, setFormText] = useState("");
  const [selectedSecondTag, setSelectedSecondTag] = useState("");
  const [selectedThirdTag, setSelectedThirdTag] = useState("");
  const [customTag, setCustomTag] = useState("");
  const [customTag2, setCustomTag2] = useState("");

  // 标签体系
  const tagSystem = {
    "学业发展": {
      "升学规划": ["考研备战", "保研攻略", "留学申请", "转专业指南"],
      "学业资源": ["课程笔记", "竞赛资料", "科研项目", "奖学金申请"],
      "成长规划": ["时间管理", "技能提升", "双学位规划", "职业启蒙"],
      "校园生活": ["社团选择", "宿舍关系", "校园政策", "心理调适"],
    },
    "家庭建设": {
      "孕产护理": ["备孕指南", "产检流程", "产后康复", "哺乳技巧"],
      "早教开发": ["亲子游戏", "绘本推荐", "兴趣培养", "感统训练"],
      "健康管理": ["疾病防护", "营养辅食", "成长监测", "安全急救"],
      "家庭关系": ["夫妻协作", "隔代教育", "二胎准备", "心理疏导"],
    },
    "事业进阶": {
      "求职准备": ["简历优化", "笔试题库", "面试技巧", "Offer选择"],
      "职业发展": ["晋升路径", "转行指南", "副业开拓", "证书考取"],
      "行业观察": ["互联网", "教育", "金融", "体制内", "新兴行业"],
      "职场生存": ["沟通艺术", "压力管理", "法律维权", "财税知识"],
    },
  };

  useEffect(() => {
    // 获取当前用户的帖子
    const fetchUserPosts = async () => {
      try {
        const userInfo = Taro.getStorageSync("userInfo");
        const username = userInfo?.username;

        if (username) {
          const userPosts = await getThreadsByUsername(username);
          setPosts(userPosts.data);
        } else {
          Taro.showToast({ title: "请先登录", icon: "none" });
        }
      } catch (error) {
        console.error("获取用户帖子失败:", error);
        Taro.showToast({ title: "获取数据失败", icon: "none" });
        setPosts([]);
      }
    };

    fetchUserPosts();
  }, []);

  // 打开编辑弹窗
  const handleEditPost = (post: Post) => {
    setCurrentPost(post);
    setFormText(post.content);

    // 获取当前社区的标签
    const currentTags = post.community && tagSystem[post.community] ? tagSystem[post.community] : {};
    const allTags = post.tags || [];

    // 识别二级和三级标签
    const secondTagKey = Object.keys(currentTags).find((key) => allTags.includes(key));
    if (secondTagKey) {
      setSelectedSecondTag(secondTagKey);
      const thirdTagOptions = currentTags[secondTagKey];
      const thirdTag = thirdTagOptions.find((tag) => allTags.includes(tag));
      if (thirdTag) {
        setSelectedThirdTag(thirdTag);
      }
    }

    // 设置自定义标签
    const customTags = allTags.filter(
      (tag) => !Object.keys(currentTags).includes(tag) && !Object.values(currentTags).flat().includes(tag)
    );
    setCustomTag(customTags[0] || "");
    setCustomTag2(customTags[1] || "");
    setShowModal(true);
  };

  // 保存修改
  const handleSave = async () => {
    // 验证必填项
    if (!formText.trim()) {
      Taro.showToast({ title: "请输入问题内容", icon: "none" });
      return;
    }
    if (!selectedSecondTag) {
      Taro.showToast({ title: "请选择二级标签", icon: "none" });
      return;
    }
    if (!selectedThirdTag) {
      Taro.showToast({ title: "请选择三级标签", icon: "none" });
      return;
    }

    if (!currentPost?._id) {
      Taro.showToast({ title: "帖子信息错误", icon: "none" });
      return;
    }

    try {
      // 构建标签数组
      const tags = [selectedSecondTag, selectedThirdTag];
      if (customTag.trim()) {
        tags.push(customTag.trim());
      }
      if (customTag2.trim()) {
        tags.push(customTag2.trim());
      }

      // 调用更新接口
      const updateData = {
        content: formText,
        tags: tags,
        community: currentPost.community,
        location: currentPost.location
      };

      await updateThread(currentPost._id, updateData);

      // 更新本地状态
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === currentPost._id
            ? { ...post, content: formText, tags: tags }
            : post
        )
      );

      setShowModal(false);
      Taro.showToast({ title: "更新成功", icon: "success" });

      // 重置表单状态
      setCurrentPost(null);
      setFormText("");
      setSelectedSecondTag("");
      setSelectedThirdTag("");
      setCustomTag("");
      setCustomTag2("");

    } catch (error) {
      console.error("更新帖子失败:", error);
      Taro.showToast({
        title: error?.message || "更新失败",
        icon: "none"
      });
    }
  };

  // 获取当前社区的标签
  const currentTags =
    currentPost && currentPost.community
      ? tagSystem[currentPost.community] || {}
      : {};
  const thirdTags = selectedSecondTag ? currentTags[selectedSecondTag] || [] : [];

  return (
    <View className="page">
      <View className="post-list">
        {posts.map((post, idx) => (
          <PostCard
            key={idx}
            userAvatar={post.userAvatar}
            username={post.username}
            createdAt={post.createdAt}
            location={post.location}
            community={post.community}
            content={post.content}
            tags={post.tags}
            mode="edit"
            onEdit={() => handleEditPost(post)}
          />
        ))}
      </View>

      {/* 编辑弹窗 */}
      <AtModal isOpened={showModal} onClose={() => setShowModal(false)}>
        <AtModalHeader>修改问题</AtModalHeader>
        <AtModalContent>
          <AtInput
            name="text"
            title="内容"
            type="text"
            placeholder="请输入问题内容"
            value={formText}
            onChange={(v) => setFormText(v as string)}
          />

          <View style={{ margin: "16px 0 8px 0" }}>二级标签</View>
          <View style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
            {Object.keys(currentTags).map((tag) => (
              <AtTag
                key={tag}
                circle
                active={selectedSecondTag === tag}
                onClick={() => {
                  setSelectedSecondTag(tag);
                  setSelectedThirdTag(""); // 重置三级标签
                }}
              >
                {tag}
              </AtTag>
            ))}
          </View>

          {selectedSecondTag && (
            <>
              <View style={{ margin: "8px 0" }}>三级标签</View>
              <View style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {thirdTags.map((tag) => (
                  <AtTag
                    key={tag}
                    circle
                    active={selectedThirdTag === tag}
                    onClick={() => setSelectedThirdTag(tag)}
                  >
                    {tag}
                  </AtTag>
                ))}
              </View>
            </>
          )}

          <AtInput
            name="customTag"
            title="自定义标签1"
            type="text"
            placeholder="可输入自定义标签（可选）"
            value={customTag}
            onChange={(v) => setCustomTag(v as string)}
          />
          <AtInput
            name="customTag2"
            title="自定义标签2"
            type="text"
            placeholder="可输入第二个自定义标签（可选）"
            value={customTag2}
            onChange={(v) => setCustomTag2(v as string)}
          />
        </AtModalContent>
        <AtModalAction>
          <Button onClick={() => setShowModal(false)}>取消</Button>
          <Button onClick={handleSave} type="primary">
            保存
          </Button>
        </AtModalAction>
      </AtModal>
    </View>
  );
};

export default CurrentPosts;
