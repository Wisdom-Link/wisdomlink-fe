/* eslint-disable jsx-quotes */
import { useState } from "react";
import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtInput, AtButton } from "taro-ui";
import "./index.scss";

const ChangePage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [motto, setMotto] = useState("");
  const [background, setBackground] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState(""); // 新的单一输入值

  // 在 handleChange 中更新 inputTag
  const handleChange = (name: string) => (value: string) => {
    switch (name) {
      case "addTag":
        setInputTag(value); // 更新单一的输入值
        break;
      case "username":
        setUsername(value);
        break;
      case "motto":
        setMotto(value);
        break;
      case "deleteTag":
        setTags((prevTags) => prevTags.filter((t) => t !== value)); // 删除标签
        break;
    }
  };

  // 选择图片
  const handleChooseImage = (type: "avatar" | "background") => {
    Taro.chooseImage({
      count: 1, // 只选一张
      sizeType: ["original", "compressed"], // 允许原图或压缩图
      sourceType: ["album", "camera"], // 允许从相册选择或拍照
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0]; // 获取图片路径
        if (type === "avatar") {
          setAvatar(tempFilePath);
        } else if (type === "background") {
          setBackground(tempFilePath);
        }
      },
      fail: (err) => {
        console.error("图片选择失败", err);
      },
    });
  };

  const uploadFile = async (filePath: string, fileType: string) => {
    return new Promise((resolve, reject) => {
      Taro.uploadFile({
        url: "https://your-api-endpoint.com/api/upload", // 你的文件上传接口
        filePath,
        name: "file", // 后端接收字段
        formData: { type: fileType }, // 额外参数
        success: (res) => {
          const data = JSON.parse(res.data);
          if (data.url) {
            resolve(data.url); // 返回图片地址
          } else {
            reject("上传失败");
          }
        },
        fail: (err) => reject(err),
      });
    });
  };

  // 提交时先上传图片
  const handleSubmit = async () => {
    try {
      const avatarUrl = avatar ? await uploadFile(avatar, "avatar") : "";
      const backgroundUrl = background
        ? await uploadFile(background, "background")
        : "";

      const postData = {
        username,
        avatar: avatarUrl,
        motto,
        background: backgroundUrl,
        tags,
      };

      // 发送数据到后端
      Taro.request({
        url: "https://your-api-endpoint.com/api/user/update",
        method: "POST",
        data: postData,
        header: { "Content-Type": "application/json" },
        success: (res) => {
          if (res.statusCode === 200) {
            Taro.showToast({ title: "提交成功", icon: "success" });
          } else {
            Taro.showToast({ title: "提交失败", icon: "none" });
          }
        },
        fail: (err) => {
          console.error("提交失败", err);
          Taro.showToast({ title: "网络错误", icon: "none" });
        },
      });
    } catch (error) {
      console.error("上传文件失败", error);
      Taro.showToast({ title: "图片上传失败", icon: "none" });
    }
  };

  return (
    <View className="page">
      <View className="body">
        <View className="submit-item">
          <AtInput
            name="username"
            title="用户名"
            type="text"
            placeholder="请输入用户名"
            value={username}
            onChange={handleChange("username")}
          />
        </View>
        <View className="submit-item">
          <AtInput
            name="motto"
            title="个性签名"
            type="text"
            placeholder="请输入个性签名"
            value={motto}
            onChange={handleChange("motto")}
          />
        </View>
        <View className="submit-item">
          <AtInput
            name="addTag"
            title="添加标签"
            type="text"
            placeholder="请输入要添加的标签"
            value={inputTag}
            onChange={handleChange("addTag")}
          />
        </View>
        <View className="submit-item">
          <AtInput
            name="deleteTag"
            title="删除标签"
            type="text"
            placeholder="请输入要删除的标签"
            value={inputTag}
            onChange={handleChange("deleteTag")}
          />
        </View>
        <View className="submit-item">
          <View style={{ margin: "20rpx 5% 40rpx 5%" }}>头像</View>
          {avatar ? (
            <Image
              src={avatar}
              className="avatar"
              onClick={() => handleChooseImage("avatar")}
            />
          ) : (
            <AtButton
              type="primary"
              size="normal"
              className="choosePicture"
              onClick={() => handleChooseImage("avatar")}
            >
              选择头像
            </AtButton>
          )}
        </View>
        <View className="submit-item">
          <View style={{ margin: "20rpx 5% 40rpx 5%" }}>背景图片</View>
          {background ? (
            <Image
              src={background}
              className="background"
              onClick={() => handleChooseImage("background")}
            />
          ) : (
            <AtButton
              type="primary"
              size="normal"
              className="choosePicture"
              onClick={() => handleChooseImage("background")}
            >
              选择背景
            </AtButton>
          )}
        </View>
        <View
          style={{
            position: "absolute",
            bottom: "0",
            left: "5%",
            right: "5%",
            marginTop: "300rpx", // 保证元素不会被遮挡
            marginBottom: "80rpx", // 留下适当的底部空间
          }}
        >
          <AtButton
            className="submit-button"
            type="primary"
            size="normal"
            onClick={handleSubmit}
          >
            提交
          </AtButton>
        </View>
      </View>
    </View>
  );
};

export default ChangePage;
