/* eslint-disable jsx-quotes */
import { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtInput, AtButton } from "taro-ui";
import "./index.scss";
import { request } from "../../utils/request";

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
  const [gender, setGender] = useState("");
  const [level, setLevel] = useState(1);
  const [tags, setTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState("");

  // 页面加载时获取用户信息
  useEffect(() => {
    request({
      url: "/user/getInfo",
      method: "GET",
    }).then((data) => {
      setOriginInfo(data);
      setUsername("");
      setMotto("");
      setGender("");
      setAvatar("");
      setLevel(data.level || 1);
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
      case "deleteTag":
        setTags((prevTags) => prevTags.filter((t) => t !== value));
        break;
    }
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

  const uploadFile = async (filePath: string, fileType: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        Taro.uploadFile({
          url: "https://your-api-endpoint.com/api/upload",
          filePath,
          name: "file",
          formData: { type: fileType },
          success: (res) => {
            const data = JSON.parse(res.data);
            if (data.url) {
              resolve(data.url);
            } else {
              reject("上传失败");
            }
          },
          fail: (err) => reject(err),
        });
      });
    };

  const handleSubmit = async () => {
    let avatarUrl = avatar;
    if (avatar && !avatar.startsWith("http")) {
      try {
        avatarUrl = await uploadFile(avatar, "avatar");
      } catch (error) {
        Taro.showToast({ title: "图片上传失败", icon: "none" });
        return;
      }
    } else if (!avatar) {
      avatarUrl = originInfo.avatar;
    }

    const postData = {
      username: username || originInfo.username,
      motto: motto || originInfo.motto,
      gender: gender || originInfo.gender,
      avatar: avatarUrl,
      level: level,
      taps: tags,
    };

    request({
      url: "/user/update",
      method: "PUT",
      data: postData,
      header: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res && res.success) {
          Taro.showToast({ title: "提交成功", icon: "success" });
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
