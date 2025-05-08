/* eslint-disable jsx-quotes */
import { useState, useCallback, useEffect } from "react";
import Taro, { getCurrentInstance } from "@tarojs/taro"; // 新增 getCurrentInstance
import { View, Picker, Button } from "@tarojs/components"; // 新增 Input
import { AtList, AtListItem, AtButton, AtInput } from "taro-ui";
import "./index.scss";
import { request } from "../../utils/request";

const PersonInfo: React.FC = () => {
  // 新增：用户名、密码、验证密码
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  // 页面加载时从url获取参数
  useEffect(() => {
    const router = getCurrentInstance().router;
    if (router && router.params) {
      setUsername(router.params.username || "");
      setPassword(router.params.password || "");
    }
  }, []);

  const [dateSel, setDateSel] = useState("请选择日期");
  const [jobList] = useState(["学生", "教师", "医生", "设计师"]);
  const [selectedJob, setSelectedJob] = useState("请选择工作");
  const [gender, setGender] = useState<string | null>(null);

  const handleDateChange = useCallback((e) => {
    setDateSel(e.detail.value);
  }, []);

  const handleJobChange = useCallback((e) => {
    setSelectedJob(jobList[e.detail.value]);
  }, [jobList]);

  const handleGenderChange = (seletedGender: string) => {
    setGender(seletedGender);
  };

  // 新增：注册接口调用
  const handleRegister = () => {
    if (!gender || dateSel === "请选择日期" || selectedJob === "请选择工作") {
      Taro.showToast({ title: "请完善信息", icon: "none" });
      return;
    }
    if (!verifyPassword) {
      Taro.showToast({ title: "请填写验证密码", icon: "none" });
      return;
    }
    if (password !== verifyPassword) {
      Taro.showToast({ title: "两次密码不一致", icon: "none" });
      return;
    }
    request({
      url: "/user/register",
      method: "POST",
      data: {
        username,
        password,
        gender,
        birthday: dateSel,
        job: selectedJob,
      },
    })
      .then((data) => {
        if (data.success) {
          Taro.showToast({ title: "注册成功", icon: "success" });
          // 注册成功后的跳转或操作
        } else {
          Taro.showToast({ title: data.message || "注册失败", icon: "none" });
        }
      })
      .catch(() => {
        Taro.showToast({ title: "网络错误", icon: "none" });
      });
  };

  return (
    <View className="page">
      <View className="verify-password-container" style={{marginBottom: "20rpx"}}>
        <View className="title">验证密码</View>
        <AtInput
          name="verifyPassword"
          type="password"
          placeholder="请再次输入密码"
          value={verifyPassword}
          onInput={e => setVerifyPassword(e.detail.value)}
        />
      </View>
      <View className="title">性别</View>
      <View className="gender-buttons">
        <Button
          className={gender === "男" ? "gender-button selected" : "gender-button"}
          onClick={() => handleGenderChange("男")}
        >
          男
        </Button>
        <Button
          className={gender === "女" ? "gender-button selected" : "gender-button"}
          onClick={() => handleGenderChange("女")}
        >
          女
        </Button>
      </View>

      <View className="title">生日</View>
      <View style={{margin:"10rpx"}}>
        <Picker mode="date" value={dateSel} onChange={handleDateChange}>
          <AtList>
            <AtListItem title="请选择日期" extraText={dateSel} />
          </AtList>
        </Picker>
      </View>

      <View className="title">工作</View>
      <View style={{margin:"20rpx"}}>
        <Picker mode="selector" range={jobList} onChange={handleJobChange}>
          <AtList>
            <AtListItem title="工作类型" extraText={selectedJob} />
          </AtList>
        </Picker>
      </View>
      <View className="btn-container">
        <AtButton
          type='primary'
          size='normal'
          className="btn"
          onClick={handleRegister}
        >
          确定
        </AtButton>
      </View>
    </View>
  );
};

export default PersonInfo;
