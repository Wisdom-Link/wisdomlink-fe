/* eslint-disable jsx-quotes */
import { View,Image,Button } from "@tarojs/components"
import "./Card.scss"

const Card = ({url,title,label}) => {
  return (
    <View className="card">
      <View className="picture">
        <Image className="card-icon"  src={url}></Image>
      </View>
      <View className="contents">
        <View className="card-title">{title}</View>
        <View className="text">{label}</View>
      </View>
      <View className="container-btn">
        <Button className="question-btn">点击询问</Button>
      </View>
    </View>
    )
}

export default Card;
