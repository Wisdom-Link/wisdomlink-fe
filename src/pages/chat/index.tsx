/* eslint-disable jsx-quotes */
import { useState, useEffect } from "react";
import Taro, { useDidShow, getCurrentInstance } from "@tarojs/taro";
import { View, Image, Button, Input } from "@tarojs/components";
import ChatExitModal from "../../components/ChatExitModal";
import { ChatMessage,ChatData,updateChatStatus, addMessageToChat, getChatById, saveChat } from "../../apis/chat";
import { deleteThreadById } from "../../apis/thread";
import "./index.scss";



const ChatPage: React.FC = () => {
  const [input, setInput] = useState("");
  const [showExitModal, setShowExitModal] = useState(false);
  const [userRole, setUserRole] = useState<'questioner' | 'answerer'>('questioner');
  const [chatId, setChatId] = useState<string>('');
  const [chatData, setChatData] = useState<ChatData | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isNewChat, setIsNewChat] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);


  useDidShow(() => {
    const router = getCurrentInstance().router;
    const params = router?.params;

    // 获取当前用户信息
    const userInfo = Taro.getStorageSync('userInfo');
    setCurrentUser(userInfo);

    if (params?.chatId) {
      // 继续已有对话
      setChatId(params.chatId);
      setIsNewChat(false);
      loadExistingChat(params.chatId, userInfo.username);
    } else if (params?.username && params?.postContent) {
      // 初次创建对话
      setIsNewChat(true);
      const postTags = params.postTags ? params.postTags.split(',') : [];
      createNewChat(userInfo.username, params.username, params.postContent, postTags);
    }
  });

  // 加载已有对话
  const loadExistingChat = async (chatIdParam: string, currentUsername: string) => {
    try {
      setLoading(true);
      const chat = await getChatById(chatIdParam);
      setChatData(chat);
      setMessages(chat.messages || []);

      // 判断用户角色
      if (chat.questionUsername === currentUsername) {
        setUserRole('questioner');
      } else if (chat.answerUsername === currentUsername) {
        setUserRole('answerer');
      }
    } catch (error) {
      console.error('加载对话失败:', error);
      Taro.showToast({ title: '加载对话失败', icon: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // 创建新对话
  const createNewChat = async (currentUsername: string, partnerUsername: string, content: string, tags: string[]) => {
    try {
      setLoading(true);

      // 创建新对话数据
      const newChatData: ChatData = {
        questionUsername: currentUsername,
        answerUsername: partnerUsername,
        content: content,
        tags: tags,
        status: 'ongoing',
        messages: []
      };

      const savedChat = await saveChat(newChatData);
      setChatId(savedChat._id);
      setChatData(savedChat);
      setMessages([]);
      setUserRole('questioner');

      // 删除原始帖子（如果有帖子ID的话）
      const router = getCurrentInstance().router;
      const postId = router?.params?.postId;
      if (postId) {
        try {
          await deleteThreadById(postId);
        } catch (error) {
          console.warn('删除帖子失败:', error);
        }
      }

      Taro.showToast({ title: '对话创建成功', icon: 'success' });
    } catch (error) {
      console.error('创建对话失败:', error);
      Taro.showToast({ title: '创建对话失败', icon: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // 发送消息
  const sendMessage = async () => {
    if (!input.trim() || !chatId || !currentUser) {
      return;
    }

    const messageContent = input.trim();
    const tempMessage: ChatMessage = {
      senderId: currentUser.id || '',
      senderUsername: currentUser.username,
      content: messageContent,
      timestamp: new Date().toISOString()
    };

    try {
      // 立即更新UI
      setMessages(prev => [...prev, tempMessage]);
      setInput('');

      // 发送到后端
      const response = await addMessageToChat(chatId, messageContent);
      
      // 如果后端返回了最新消息，可以用来同步
      if (response?.data?.lastMessage) {
        setMessages(prev => {
          const newMessages = [...prev];
          // 替换最后一条消息为服务器返回的版本
          newMessages[newMessages.length - 1] = {
            senderId: response.data.lastMessage.senderId,
            senderUsername: response.data.lastMessage.senderUsername,
            content: response.data.lastMessage.content,
            timestamp: response.data.lastMessage.timestamp
          };
          return newMessages;
        });
      }

    } catch (error: any) {
      console.error('发送消息失败:', error);
      
      // 根据错误类型显示不同提示
      if (error.message?.includes('对话已结束')) {
        Taro.showToast({ title: '对话已结束，无法发送消息', icon: 'none' });
      } else if (error.message?.includes('无权限')) {
        Taro.showToast({ title: '没有权限发送消息', icon: 'none' });
      } else {
        Taro.showToast({ title: '发送失败，请重试', icon: 'error' });
      }

      // 发送失败时回滚UI
      setMessages(prev => prev.slice(0, -1));
      setInput(messageContent);
    }
  };

  // 监听返回按钮
  useEffect(() => {
    const handleBack = () => {
      if (userRole === 'questioner') {
        setShowExitModal(true);
        return false; // 阻止默认返回行为
      }
      return true; // 允许正常返回
    };

    // 注册返回事件监听
    Taro.eventCenter.on('onBackPress', handleBack);

    return () => {
      Taro.eventCenter.off('onBackPress', handleBack);
    };
  }, [userRole]);

  // 处理暂时退出
  const handleTempExit = () => {
    Taro.navigateBack();
  };

  // 处理结束对话
  const handleEndChat = async (rating?: string) => {
    try {
      if (chatId) {
        await updateChatStatus(chatId, 'completed');
        Taro.showToast({
          title: '对话已结束',
          icon: 'success'
        });
      }

      if (rating) {
        // 这里可以调用评分API
        console.log('用户评分:', rating);
        Taro.showToast({
          title: `感谢您的"${rating}"评价`,
          icon: 'success'
        });
      }

      Taro.navigateBack();
    } catch (error) {
      console.error('结束对话失败:', error);
      Taro.showToast({
        title: '操作失败',
        icon: 'error'
      });
    }
  };

  // 渲染消息
  const renderMessage = (message: ChatMessage, index: number) => {
    const isCurrentUser = message.senderUsername === currentUser?.username;
    return (
      <View key={index}>
        {/* 显示发送者用户名 */}
        <View className={`username-label ${isCurrentUser ? 'current-user-label' : 'other-user-label'}`}>
          {message.senderUsername}
        </View>
        {/* 使用原有的气泡样式 */}
        <View className={isCurrentUser ? "user" : "ai"}>
          {message.content}
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View className="page">
        <View style={{ textAlign: 'center', padding: '100px 20px', color: '#999' }}>
          加载中...
        </View>
      </View>
    );
  }

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
                <View className="text">
                  {userRole === 'questioner' ?
                    `我是解答员${chatData?.answerUsername || '小红同学'}, 很高兴为您服务` :
                    `您正在为${chatData?.questionUsername || '提问者'}解答问题`
                  }
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* 显示原始问题（仅新对话时显示） */}
        {isNewChat && chatData?.content && (
          <View className="original-question">
            <View className="question-label">原始问题：</View>
            <View className="question-content">{chatData.content}</View>
            {chatData.tags && chatData.tags.length > 0 && (
              <View className="question-tags">
                {chatData.tags.map((tag, idx) => (
                  <View key={idx} className="tag">{tag}</View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* 消息列表 */}
        {messages.map((message, index) => renderMessage(message, index))}

        {/* 如果没有消息且不是新对话，显示提示 */}
        {messages.length === 0 && !isNewChat && (
          <View className="no-messages">
            <View className="text">开始您的对话吧~</View>
          </View>
        )}
      </View>

      <View className="input-container">
        <Input
          value={input}
          className="input-box"
          placeholder="请输入内容..."
          onInput={e => setInput(e.detail.value)}
          focus={false}
        />
        <Button
          className="send-button"
          onClick={sendMessage}
          disabled={!input.trim()}
        >
          发送
        </Button>
      </View>

      <ChatExitModal
        visible={showExitModal}
        onClose={() => setShowExitModal(false)}
        onTempExit={handleTempExit}
        onEndChat={handleEndChat}
      />
    </View>
  );
};

export default ChatPage;
