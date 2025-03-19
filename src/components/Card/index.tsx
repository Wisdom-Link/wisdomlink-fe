/* eslint-disable jsx-quotes */
import { View,Image,Button } from "@tarojs/components"
import "./Card.scss"

const Card = ({ size, url, title, label = size === 'small' ? undefined : '' }) => {

  switch (size) {
    case "small":
      return (
        <View className="card-small">
          <View className="picture-small">
            <Image className="icon-small" src={url} />
          </View>
          <View className="title-small">{title}</View>
        </View>
      );

      case "middle":
      return (
        <View className="card-middle">
          <View className="picture-middle">
            <Image className="icon-middle" src={url} />
          </View>
          <View className="title-middle">{title}</View>
          <View className="text-middle">{label}</View>
        </View>
      );

      case "large":
      return (
        <View className="card-large">
          <View className="picture-large">
            <Image className="card-icon" src={url} />
          </View>
          <View className="contents-large">
            <View className="title-large">{title}</View>
            <View className="text-large">{label}</View>
          </View>
        </View>
      );
  }
}


export default Card;
