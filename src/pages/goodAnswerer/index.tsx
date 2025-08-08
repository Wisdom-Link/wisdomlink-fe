/* eslint-disable jsx-quotes */
import React, { useState, useEffect } from "react";
import { View, Button } from "@tarojs/components";
import { AtTag, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtInput } from "taro-ui";
import Taro,{ getCurrentInstance } from "@tarojs/taro";
import "./index.scss";
import PostCard from "../../components/PostCard";
import BtnCanMove from "../../components/Btn_CanMove";
import { saveThread, getThreadsByCommunity } from "../../apis/thread";
import { Post } from "../../types/thread";

const GoodAnswerer: React.FC = () => {
  const [categoryId, setCategoryId] = useState<string>("");
  const [categoryTitle, setCategoryTitle] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  // 弹窗相关状态
  const [showModal, setShowModal] = useState(false);
  const [formText, setFormText] = useState("");
  const [selectedSecondTag, setSelectedSecondTag] = useState("");
  const [selectedThirdTag, setSelectedThirdTag] = useState("");
  const [customTag, setCustomTag] = useState("");
  const [customTag2, setCustomTag2] = useState("");

  // 标签体系
  const tagSystem = {
    "1": { // 学业发展
      title: "学业发展",
      secondTags: {
        "升学规划": ["考研备战", "保研攻略", "留学申请", "转专业指南"],
        "学业资源": ["课程笔记", "竞赛资料", "科研项目", "奖学金申请"],
        "成长规划": ["时间管理", "技能提升", "双学位规划", "职业启蒙"],
        "校园生活": ["社团选择", "宿舍关系", "校园政策", "心理调适"]
      }
    },
    "2": { // 家庭建设
      title: "家庭建设",
      secondTags: {
        "孕产护理": ["备孕指南", "产检流程", "产后康复", "哺乳技巧"],
        "早教开发": ["亲子游戏", "绘本推荐", "兴趣培养", "感统训练"],
        "健康管理": ["疾病防护", "营养辅食", "成长监测", "安全急救"],
        "家庭关系": ["夫妻协作", "隔代教育", "二胎准备", "心理疏导"]
      }
    },
    "3": { // 事业进阶
      title: "事业进阶",
      secondTags: {
        "求职准备": ["简历优化", "笔试题库", "面试技巧", "Offer选择"],
        "职业发展": ["晋升路径", "转行指南", "副业开拓", "证书考取"],
        "行业观察": ["互联网", "教育", "金融", "体制内", "新兴行业"],
        "职场生存": ["沟通艺术", "压力管理", "法律维权", "财税知识"]
      }
    }
  };

  useEffect(() => {
    // 从 URL 获取 id 参数
    const router = getCurrentInstance().router;
    const id = router?.params?.id || "1";
    setCategoryId(id);
    const title = tagSystem[id]?.title || "未知分类";
    setCategoryTitle(title);

    // 获取对应社区的帖子
    const fetchCommunityPosts = async () => {
      try {
        const communityPosts = await getThreadsByCommunity(title);
        setPosts(communityPosts);
      } catch (error) {
        console.error("获取社区帖子失败:", error);
        Taro.showToast({ title: "获取数据失败", icon: "none" });
        setPosts([]); // 设置为空数组
      }
    };

    if (title !== "未知分类") {
      fetchCommunityPosts();
    }
  }, []);

  const handleSend = async () => {
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

    try {
      // 获取用户信息
      const userInfo = Taro.getStorageSync("userInfo");
      const defaultAvatar = 'http://wisdomlink-img.marswu23.cn/avatar/%E9%BB%98%E8%AE%A4123456789.png';

      // 构建标签数组
      const tags = [selectedSecondTag, selectedThirdTag];
      if (customTag.trim()) {
        tags.push(customTag.trim());
      }
      if (customTag2.trim()) {
        tags.push(customTag2.trim());
      }

      // 构建帖子数据
      const postData = {
        content: formText,
        username: userInfo?.username || "匿名用户",
        userAvatar: userInfo?.avatar || defaultAvatar,
        community: categoryTitle, // 学业发展/家庭建设/事业进阶
        location: "未知位置", // 可以后续从地理位置获取
        tags: tags,
        createdAt: new Date().toISOString()
      };

      // 发送到后端
      await saveThread(postData);

      Taro.showToast({ title: "发布成功", icon: "success" });

      // 重置表单
      setShowModal(false);
      setFormText("");
      setSelectedSecondTag("");
      setSelectedThirdTag("");
      setCustomTag("");
      setCustomTag2("");

    } catch (error) {
      console.error("发布失败:", error);
      Taro.showToast({ title: "发布失败", icon: "none" });
    }
  };

  const currentTags = tagSystem[categoryId]?.secondTags || {};
  const thirdTags = selectedSecondTag ? currentTags[selectedSecondTag] || [] : [];

  return (
    <>
      <View className="page" style={{ paddingBottom: "70px" }}>
        <View className="title">{categoryTitle}问题</View>
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
              mode="answer"
              onAnswer={(username) => {
                Taro.navigateTo({
                  url: `/pages/chat/index?username=${username}&postContent=${encodeURIComponent(post.content)}&postTags=${encodeURIComponent((post.tags ?? []).join(','))}&postId=${post._id}`
                });
              }}
            />
          ))}
        </View>
      </View>
      {/* 弹窗表单 */}
      <AtModal isOpened={showModal} onClose={() => setShowModal(false)}>
        <AtModalHeader>发布问题</AtModalHeader>
        <AtModalContent>
          <AtInput
            name="text"
            title="内容"
            type="text"
            placeholder="请输入问题内容"
            value={formText}
            onChange={v => setFormText(v as string)}
          />

          <View style={{ margin: "16px 0 8px 0" }}>二级标签</View>
          <View style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
            {Object.keys(currentTags).map(tag => (
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
                {thirdTags.map(tag => (
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
            onChange={v => setCustomTag(v as string)}
          />
          <AtInput
            name="customTag2"
            title="自定义标签2"
            type="text"
            placeholder="可输入第二个自定义标签（可选）"
            value={customTag2}
            onChange={v => setCustomTag2(v as string)}
          />
        </AtModalContent>
        <AtModalAction>
          <Button onClick={() => setShowModal(false)}>取消</Button>
          <Button
            onClick={handleSend}
            type="primary"
          >
            提交
          </Button>
        </AtModalAction>
      </AtModal>
      {/* 可拖动按钮*/}
      <BtnCanMove
        onClick={() => setShowModal(true)}
      />
    </>
  );
};


export default GoodAnswerer;

