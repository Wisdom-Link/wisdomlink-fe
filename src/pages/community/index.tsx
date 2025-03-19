/* eslint-disable jsx-quotes */
import { useState } from "react";
import { View } from "@tarojs/components";
import "./index.scss";

const Community: React.FC = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <View className="page">
      <View className="title">
        社区
      </View>
      <View className="title">
        热门问题
      </View>
      <View className="title">
        高分解答员
      </View>
    </View>
  );
};

export default Community;
