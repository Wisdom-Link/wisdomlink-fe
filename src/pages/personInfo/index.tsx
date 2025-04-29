/* eslint-disable jsx-quotes */
import { useState, useCallback } from "react";
import Taro from "@tarojs/taro"; // 新增
import { View, Image, Picker, Button } from "@tarojs/components";
import { AtList, AtListItem, AtButton  } from "taro-ui";
import logo from "../../assets/智汇桥logo.png";
import "./index.scss";
import { request } from "../../utils/request";

const PersonInfo: React.FC = () => {
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
    setGender(seletedGender); //
  };

  // 新增：注册接口调用
  const handleRegister = () => {
    if (!gender || dateSel === "请选择日期" || selectedJob === "请选择工作") {
      Taro.showToast({ title: "请完善信息", icon: "none" });
      return;
    }
    request({
      url: "/user/register",
      method: "POST",
      data: {
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
      <View className="logo-container">
        <Image src={logo} className="logo" />
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
