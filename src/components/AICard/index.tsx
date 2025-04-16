/* eslint-disable jsx-quotes */
import { View,Image,Button } from "@tarojs/components"
import "./AICard.scss"

interface AICardProps {
  url: string;
  title: string;
  label: string;
  onClick?: () => void; // 新增点击事件回调
}

const AICard:React.FC<AICardProps> = ({url,title,label,onClick}) => {
  return (
    <View className="card" >
      <View className="picture">
        <Image className="card-icon"  src={url}></Image>
      </View>
      <View className="contents">
        <View className="card-title">{title}</View>
        <View className="text">{label}</View>
      </View>
      <View className="container-btn">
        <Button className="question-btn" onClick={onClick}>点击询问</Button>
      </View>
    </View>
    )
}

export default AICard;
