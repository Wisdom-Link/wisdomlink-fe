/* eslint-disable jsx-quotes */
import { View, Image, Text } from "@tarojs/components";
import { AtTag } from "taro-ui";
import "./Card.scss";

interface CardProps {
  size: string,
  url: string;
  title: string;
  label?: string;
  tags?: string[]; // 新增tags
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  size,
  url,
  title,
  label = size === "small" ? undefined : "",
  tags = [],
  onClick
}) => {
  // 处理标签数据，确保正确分割
  const processTags = (tagsInput: string[]) => {
    if (!Array.isArray(tagsInput) || tagsInput.length === 0) {
      return [];
    }

    // 将逗号分隔的字符串拆分为独立标签
    return tagsInput.flatMap(tag =>
      typeof tag === 'string' ? tag.split(',').map(t => t.trim()) : []
    ).filter(tag => tag);
  };

  switch (size) {
    case "small":
      return (
        <View className="card-small" onClick={onClick}>
          <View className="picture-small">
            <Image className="icon-small" src={url} />
          </View>
          <View className="title-small">{title}</View>
        </View>
      );

    case "middle":
      return (
        <View className="card-middle" onClick={onClick}>
          <View className="picture-middle">
            <Image className="icon-middle" src={url} />
          </View>
          <View className="title-middle">{title}</View>
          <View className="text-middle">{label}</View>
        </View>
      );

    case "large":
      const processedTags = processTags(tags);

      return (
        <View
          className="card-large"
          style={{
            width: "44%",
            height: "400rpx",
            backgroundColor: "#ffffff",
            backgroundImage: `url(${url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "20rpx",
            marginBottom: "30rpx",
          }}
          onClick={onClick}
        >
          <View className="contents-large">
            <View className="title-large">
              <Text>{title}</Text>
            </View>
            <View className="text-large" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {processedTags.length > 0
                ? processedTags.map((tag, index) => (
                    <AtTag key={`${tag}-${index}`} size="small">
                      {tag}
                    </AtTag>
                  ))
                : <AtTag size="small">暂无标签捏</AtTag>
              }
            </View>
          </View>
        </View>
      );

    default:
      return null;
  }
};

export default Card;
