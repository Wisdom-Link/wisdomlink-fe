/* eslint-disable jsx-quotes */
import React, { useState } from 'react';
import { View, Button, Text } from '@tarojs/components';
import './index.scss';

interface ChatExitModalProps {
  visible: boolean;
  onClose: () => void;
  onTempExit: () => void;
  onEndChat: (rating?: string) => void;
}

const ChatExitModal: React.FC<ChatExitModalProps> = ({
  visible,
  onClose,
  onTempExit,
  onEndChat
}) => {
  const [showRating, setShowRating] = useState(false);

  const handleEndChat = () => {
    setShowRating(true);
  };

  const handleRating = (rating: string) => {
    console.log('用户选择评价:', rating); // 添加调试日志
    onEndChat(rating);
    setShowRating(false);
    onClose();
  };

  const handleTempExit = () => {
    onTempExit();
    onClose();
  };

  if (!visible) return null;

  return (
    <View className="modal-overlay" onClick={onClose}>
      <View className="modal-container" onClick={(e) => e.stopPropagation()}>
        {!showRating ? (
          // 退出确认弹窗
          <View className="exit-modal">
            <View className="modal-header">
              <Text className="modal-title">请选择您希望的操作方式</Text>
            </View>
            <View style={{padding: '12px'}}>
            </View>
            <View className="modal-actions">
              <Button
                className="action-btn temp-exit"
                onClick={handleTempExit}
              >
                暂时退出
              </Button>
              <Button
                className="action-btn end-chat"
                onClick={handleEndChat}
              >
                结束对话
              </Button>
              <Button
                className="action-btn cancel"
                onClick={onClose}
              >
                继续对话
              </Button>
            </View>
          </View>
        ) : (
          // 评分弹窗
          <View className="rating-modal">
            <View className="modal-header">
              <Text className="modal-title">为本次对话评分</Text>
            </View>
            <View className="modal-content">
              <Text className="modal-text">您对本次解答的满意程度如何？</Text>
            </View>
            <View className="rating-actions">
              <Button
                className="rating-btn excellent"
                onClick={() => handleRating('满意')}
              >
                😊 满意
              </Button>
              <Button
                className="rating-btn good"
                onClick={() => handleRating('及格')}
              >
                😐 及格
              </Button>
              <Button
                className="rating-btn poor"
                onClick={() => handleRating('差劲')}
              >
                😞 差劲
              </Button>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default ChatExitModal;
