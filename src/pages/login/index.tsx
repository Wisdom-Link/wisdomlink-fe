/* eslint-disable jsx-quotes */
import { useState } from "react";
import Taro from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { AtInput, AtButton, AtMessage, AtIcon } from "taro-ui";
import logo from "../../assets/智汇桥logo.png";
import "./index.scss";
import { request } from "../../utils/request";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 登录
  const handleLogin = () => {
    if (!username) {
      Taro.atMessage({ message: "请输入用户名", type: "error" });
      return;
    }
    if (!password) {
      Taro.atMessage({ message: "请输入密码", type: "error" });
      return;
    }
    request({
      url: "/user/login",
      method: "POST",
      data: { username, password },
    })
      .then((data) => {
        if (data.success) {
          Taro.atMessage({ message: "登录成功", type: "success" });
          Taro.setStorageSync("token", data.token);
          Taro.switchTab({ url: "/pages/index/index" });
        } else {
          Taro.atMessage({ message: data.message, type: "error" });
        }
      })
      .catch(() => {
        Taro.atMessage({ message: "登录失败，请检查网络", type: "error" });
      });
  };

  // 注册
  const handleRegister = () => {
    if (!username) {
      Taro.atMessage({ message: "请输入用户名", type: "error" });
      return;
    }
    if (!password) {
      Taro.atMessage({ message: "请输入密码", type: "error" });
      return;
    }
    // 用户名和密码都填写后跳转并传参
    Taro.navigateTo({
      url: `/pages/personInfo/index?username=${encodeURIComponent(
        username
      )}&password=${encodeURIComponent(password)}`,
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
          <View style={{ height: 10 }} />
          {/* 受控组件获取用户名和密码 */}
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
          <View className="button-container">
            <AtButton
              type="primary"
              circle
              className="black-button"
              onClick={handleLogin}
            >
              登录
            </AtButton>
            <AtButton
              type="secondary"
              circle
              className="black-button"
              onClick={handleRegister}
              style={{ marginTop: "20rpx" }}
            >
              注册
            </AtButton>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginPage;
