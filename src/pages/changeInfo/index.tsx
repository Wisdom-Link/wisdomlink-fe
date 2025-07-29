/* eslint-disable jsx-quotes */
import { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { AtInput, AtButton } from "taro-ui";
import "./index.scss";
import { getInfo, updateInfo } from "../../apis/user";

const ChangePage: React.FC = () => {
  // 新增：用于存储后端原始信息
  const [originInfo, setOriginInfo] = useState({
    username: "",
    motto: "",
    gender: "",
    avatar: "",
    level: 1,
    taps: [],
  });

  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [motto, setMotto] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState("");

  // 页面加载时获取用户信息
  useEffect(() => {
    getInfo().then((data) => {
      setOriginInfo(data);
      setUsername("");
      setMotto("");
      setAvatar("");
      setTags(Array.isArray(data.taps) ? data.taps : []);
    });
  }, []);

  const handleChange = (name: string) => (value: string) => {
    switch (name) {
      case "addTag":
        setInputTag(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "motto":
        setMotto(value);
        break;
    }
  };

  // 添加标签的处理函数
  const handleAddTag = () => {
    if (inputTag.trim() && !tags.includes(inputTag.trim())) {
      setTags([...tags, inputTag.trim()]);
      setInputTag(""); // 清空输入框
    }
  };

  // 删除标签的处理函数
  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  };

  const handleChooseImage = (type: "avatar" | "background") => {
    Taro.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0];
        if (type === "avatar") {
          setAvatar(tempFilePath);
        }
      },
      fail: (err) => {
        console.error("图片选择失败", err);
      },
    });
  };

  // 将图片转换为 base64
  const convertImageToBase64 = (filePath: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      Taro.getFileSystemManager().readFile({
        filePath,
        encoding: 'base64',
        success: (res) => {
          resolve(`data:image/jpeg;base64,${res.data}`);
        },
        fail: (err) => {
          reject(err);
        }
      });
    });
  };

  const handleSubmit = async () => {
    let avatarUrl = avatar;

    // 如果选择了新头像且不是网络地址，转换为 base64
    if (avatar && !avatar.startsWith("http")) {
      try {
        avatarUrl = await convertImageToBase64(avatar);
      } catch (error) {
        Taro.showToast({ title: "图片处理失败", icon: "none" });
        return;
      }
    } else if (!avatar) {
      avatarUrl = originInfo.avatar;
    }

    const postData = {
      username: username || originInfo.username,
      motto: motto || originInfo.motto,
      avatar: avatarUrl,
      taps: tags,
    };

    updateInfo(postData)
      .then((res) => {
        if (res) {
          Taro.showToast({ title: "提交成功", icon: "success" });
          setTimeout(() => {
            Taro.switchTab({ url: "/pages/personalCenter/index" });
          }, 1000);
        } else {
          Taro.showToast({ title: "提交失败", icon: "none" });
        }
      })
      .catch(() => {
        Taro.showToast({ title: "网络错误", icon: "none" });
      });
  };

  return (
    <View className="page">
      <View className="body">
        <View className="submit-item">
          <AtInput
            name="username"
            title="用户名"
            type="text"
            placeholder={originInfo.username||"请输入用户名"}
            value={username}
            onChange={(v) => setUsername(v as string)}
          />
        </View>
        <View className="submit-item">
          <AtInput
            name="motto"
            title="个性签名"
            type="text"
            placeholder={originInfo.motto||"请输入个性签名"}
            value={motto}
            onChange={(v) => setMotto(v as string)}
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
          <AtButton
            size="small"
            type="primary"
            onClick={handleAddTag}
            style={{ marginTop: "10rpx" }}
          >
            添加
          </AtButton>
        </View>

        {/* 显示当前标签 */}
        <View className="submit-item">
          <View style={{ margin: "20rpx 5% 10rpx 5%" }}>当前标签：</View>
          <View style={{ display: "flex", flexWrap: "wrap", padding: "0 5%" }}>
            {tags.map((tag, index) => (
              <View
                key={index}
                className="tag-item"
                style={{
                  background: "#f0f0f0",
                  padding: "5rpx 15rpx",
                  margin: "5rpx",
                  borderRadius: "15rpx",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <Text>{tag}</Text>
                <Text
                  style={{ marginLeft: "10rpx", color: "red", cursor: "pointer" }}
                  onClick={() => handleDeleteTag(tag)}
                >
                  ×
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View className="submit-item">
          <View style={{ margin: "20rpx 5% 40rpx 5%" }}>头像</View>
          {avatar || originInfo.avatar ? (
            <Image
              src={avatar || originInfo.avatar}
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
        <View
          style={{
            position: "absolute",
            bottom: "0",
            left: "5%",
            right: "5%",
            marginTop: "300rpx",
            marginBottom: "80rpx",
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
