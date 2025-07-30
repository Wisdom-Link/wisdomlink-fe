/* eslint-disable jsx-quotes */
import { useState } from 'react';
import { View, Input, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './SearchBox.scss';

const SearchBox = ({ placeholder = '请输入搜索内容', onSearch }: { placeholder?: string; onSearch?: (query: string) => void }) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.detail.value);
  };

  const handleClear = () => {
    setValue('');
  };

  const handleSearch = () => {
    if (value.trim()) {
      if (onSearch) {
        onSearch(value.trim());
      } else {
        // 建议保留 encodeURIComponent 以确保 URL 安全
        Taro.navigateTo({ url: `/pages/searchResult/index?query=${encodeURIComponent(value.trim())}` });
      }
    } else {
      Taro.showToast({ title: '请输入搜索内容', icon: 'none' });
    }
  };

  return (
    <View className="search-box">
      <Input
        className="search-input"
        type="text"
        value={value}
        placeholder={placeholder}
        onInput={handleChange}
      />
      {value && <Button className="clear-btn" onClick={handleClear}>×</Button>}
      <Button className="search-btn" onClick={handleSearch}>搜索</Button>
    </View>
  );
};

export default SearchBox;
