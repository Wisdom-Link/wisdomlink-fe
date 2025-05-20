/* eslint-disable jsx-quotes */
import { useState} from "react";
import Taro ,{ useDidShow } from "@tarojs/taro";
import { View, Image, Button, Input } from "@tarojs/components";
import "./index.scss";

interface ChatItem {
  type: string;
  content: string;
}

const chatData: ChatItem[] = [
  { type: "user", content: "我是华中师范大学23级统计学的一名学生，从就业方向的角度来看，如果我想要考公务员，我有没有必要先去去读研呢？如果读研的话，我应该是选择应用统计、经济统计还是医学统计方向更好呢？" },
  {
    type: "ai",
    content: `是否需要先读研究生这个问题，其实取决于你的个人情况和职业规划。对于考公务员来说，研究生学历通常会给你的竞争力带来一定的加分，特别是在一些较为竞争激烈的职位中。此外，研究生阶段也能够让你深入学习和研究统计学的相关内容，为将来的公务员考试积累更多的知识和经验。

至于选择专业方向，应用统计、经济统计还是医学统计，这要根据你的兴趣和职业发展方向来决定。如果你对数据在经济或医学领域的应用感兴趣，那么选择经济统计或医学统计可能更贴合你的兴趣和未来就业方向。应用统计则更为广泛，涵盖了多个领域的数据分析和应用。

最终的选择应该结合你的个人兴趣和职业规划，考虑未来的发展方向以及各个专业方向的就业市场需求。`,
  },
  { type: "user", content: "我不太想去读研，太卷了。" },
  {
    type: "ai",
    content:
      `懂你！现在读研确实挺“卷”的，特别是统计学这种专业，不管是考研还是就业，大家都很努力。如果你不太想读研，完全可以把精力集中在准备公务员考试（国考、省考）或者事业单位这条路上，也一样有出路，而且并不代表你的选择就“差”。`,
  },
  { type: "user", content: "政治选择题总是错，有什么建议吗？" },
  {
    type: "ai",
    content:
      "政治选择题要多做题，掌握时政热点，理解教材原理，遇到模棱两可的选项时要结合教材内容分析。",
  },
  { type: "user", content: "考研复习时间怎么安排比较合理？" },
  {
    type: "ai",
    content:
      "建议制定详细的复习计划，合理分配各科时间，保持每天的学习节奏，注意劳逸结合，适当锻炼身体。",
  },
  { type: "user", content: "复试一般会问哪些问题？" },
  {
    type: "ai",
    content:
      "复试常见问题包括自我介绍、专业课知识、科研经历、未来规划等，建议提前准备并多加练习。",
  },
];

const ChatPage: React.FC = () => {
  const [input, setInput] = useState("");
  const inputChange = (value) => {
    setInput(value);
  };

  useDidShow(() => {
    const params = Taro.getStorageSync('chatID');
    console.log("接收到的参数：", params);
    // 用完可以清除
    Taro.removeStorageSync('chatID');
  });


  return (
    <View className="page">
      <View className="chatList">
        <View className="header">
          <View className="card">
            <View className="up">
              <View className="picture">
                <Image className="card-icon" src="https://wisdomlink.oss-cn-wuhan-lr.aliyuncs.com/%E4%B8%AA%E4%BA%BA%E4%BF%A1%E6%81%AF/%E5%A4%B4%E5%83%8F/%E5%B0%8F%E7%BA%A2%E5%90%8C%E5%AD%A6.jpeg"></Image>
              </View>
              <View className="contents">
                <View className="card-title">哈喽~</View>
                <View className="text">我是解答员小红同学, 很高兴为您服务</View>
              </View>
            </View>
          </View>
        </View>
        {chatData.map((item, index) => (
          <View key={index} className={`${item.type}`}>
            {item.content}
          </View>
        ))}
      </View>
      <View className="input-container">
        <Input
          value={input}
          className="input-box"
          placeholder="请输入内容..."
          onInput={e => setInput(e.detail.value)}
          focus={false} // 改为 true 可自动弹出输入法
        />
        <Button className="send-button">发送</Button>
      </View>
    </View>
  );
};

export default ChatPage;
