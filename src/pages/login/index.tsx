/* eslint-disable jsx-quotes */
import { useState } from "react";
import Taro from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { AtForm, AtInput, AtButton, AtMessage, AtIcon } from "taro-ui";
import logo from "../../assets/智汇桥logo.png";
import "./index.scss";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 提交登录请求
  const handleSubmit = () => {
    if (!username) {
      Taro.atMessage({ message: "请输入用户名", type: "error" });
      return;
    }
    if (!password) {
      Taro.atMessage({ message: "请输入密码", type: "error" });
      return;
    }

    // 发送登录请求到服务器
    Taro.request({
      url: "https://你的服务器地址/api/login",
      method: "POST",
      data: { username, password },
    })
      .then((res) => {
        if (res.data.success) {
          Taro.atMessage({ message: "登录成功", type: "success" });
          Taro.setStorageSync("token", res.data.token);
          Taro.switchTab({ url: "/pages/home/index" }); // 登录成功后跳转到首页
        } else {
          Taro.atMessage({ message: res.data.message, type: "error" });
        }
      })
      .catch(() => {
        Taro.atMessage({ message: "登录失败，请检查网络", type: "error" });
      });
  };

  return (
    <View className="page">
      <View className="header">
        <AtIcon value="help" size="20" color="black"></AtIcon>
        <Text>你有什么问题?</Text>
      </View>
      <View className="body">
        <View className="title">智汇桥</View>
        <View className="logo">
          <Image className="icon" src={logo} mode="heightFix" />
        </View>
        <View className="text">有问必答</View>
        <View className="login-container">
          <AtMessage />
          <AtForm onSubmit={handleSubmit} className="login-form">
            <AtInput
              className="custom-input"
              name="username"
              title="用户名："
              type="text"
              placeholder="请输入用户名"
              value={username}
              onChange={(value) => setUsername(value as string)}
            />
            <AtInput
              className="custom-input"
              name="password"
              title="密码："
              type="password"
              placeholder="请输入密码"
              value={password}
              onChange={(value) => setPassword(value as string)}
            />
            <AtButton
              type="primary"
              formType="submit"
              circle
              className="black-button"
            >
              登录/注册
            </AtButton>
          </AtForm>
        </View>
      </View>
    </View>
  );
};

export default LoginPage;
