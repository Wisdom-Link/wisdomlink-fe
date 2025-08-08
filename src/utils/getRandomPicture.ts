const allPictures ={
  1:{
    title: "学业发展",
    urls: [
      "http://wisdomlink-img.marswu23.cn/study/%E5%AD%A6%E4%B8%9A1.jpg",
      "http://wisdomlink-img.marswu23.cn/study/%E5%AD%A6%E4%B8%9A2.jpg",
      "http://wisdomlink-img.marswu23.cn/study/%E5%AD%A6%E4%B8%9A3.jpg"
    ]
  },
  2:{
    title: "家庭建设",
    urls: [
      "http://wisdomlink-img.marswu23.cn/family/%E5%AE%B6%E5%BA%AD1.jpg",
      "http://wisdomlink-img.marswu23.cn/family/%E5%AE%B6%E5%BA%AD2.webp",
      "http://wisdomlink-img.marswu23.cn/family/%E5%AE%B6%E5%BA%AD3.jpg"
    ]
  },
  3:{
    title: "事业进阶",
    urls: [
      "http://wisdomlink-img.marswu23.cn/career/%E4%BA%8B%E4%B8%9A1.jpeg",
      "http://wisdomlink-img.marswu23.cn/career/%E4%BA%8B%E4%B8%9A2.webp",
      "http://wisdomlink-img.marswu23.cn/career/%E4%BA%8B%E4%B8%9A3.jpg"
    ]
  }
}

// 根据社区名获取随机图片URL
export const getRandomPictureByCommunity = (communityName: string): string => {
  // 根据社区名匹配对应的分类
  let categoryId: number | null = null;

  for (const [id, category] of Object.entries(allPictures)) {
    if (category.title === communityName) {
      categoryId = parseInt(id);
      break;
    }
  }

  // 如果没有找到匹配的分类，返回默认图片或第一个分类的随机图片
  if (!categoryId) {
    categoryId = 1; // 默认使用学业发展分类
  }

  const urls = allPictures[categoryId].urls;
  const randomIndex = Math.floor(Math.random() * urls.length);

  return urls[randomIndex];
};

// 根据分类ID获取随机图片URL
export const getRandomPictureById = (categoryId: number): string => {
  const category = allPictures[categoryId];

  if (!category) {
    // 如果分类不存在，返回第一个分类的随机图片
    return getRandomPictureById(1);
  }

  const randomIndex = Math.floor(Math.random() * category.urls.length);
  return category.urls[randomIndex];
};

export default { getRandomPictureByCommunity, getRandomPictureById };

