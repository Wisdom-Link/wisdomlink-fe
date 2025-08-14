/* eslint-disable jsx-quotes */
import { useState, useEffect } from "react";
import Taro, { useDidShow, getCurrentInstance } from "@tarojs/taro";
import { View, Image, Button, Input } from "@tarojs/components";
import ChatExitModal from "../../components/ChatExitModal";
import { ChatMessage,ChatData,updateChatStatus, addMessageToChat, getChatWithDetails, saveChat, evaluateUser } from "../../apis/chat";
import { deleteThreadById } from "../../apis/thread";
import "./index.scss";

// 在组件外添加调试信息
console.log('chat/index.tsx 文件被加载');

const ChatPage: React.FC = () => {
  console.log('ChatPage 组件开始初始化');

  const [input, setInput] = useState("");
  const [showExitModal, setShowExitModal] = useState(false);
  const [userRole, setUserRole] = useState<'questioner' | 'answerer'>('questioner');
  const [chatId, setChatId] = useState<string>('');
  const [chatData, setChatData] = useState<ChatData | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isNewChat, setIsNewChat] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  console.log('ChatPage state 初始化完成');

  // 使用 useEffect 代替 useDidShow 进行测试
  useEffect(() => {
    console.log('useEffect 被调用 - 组件挂载');

    const router = getCurrentInstance().router;
    const params = router?.params;

    console.log('路由参数:', params);

    // 获取当前用户信息
    const userInfo = Taro.getStorageSync('userInfo');
    console.log('用户信息:', userInfo);
    setCurrentUser(userInfo);

    if (params?.chatId) {
      console.log('进入已有对话分支, chatId:', params.chatId);
      setChatId(params.chatId);
      setIsNewChat(false);
      loadExistingChat(params.chatId, userInfo?.username);
    } else if (params?.username && params?.postContent) {
      console.log('进入创建新对话分支');
      console.log('参数检查:', {
        username: params.username,
        postContent: params.postContent,
        postTags: params.postTags,
        community: params.community
      });

      setIsNewChat(true);
      const postTags = params.postTags ? params.postTags.split(',') : [];
      const community = params.community || '学业发展';

      console.log('准备调用 createNewChat 函数');
      createNewChat(userInfo?.username, params.username, params.postContent, postTags, community);
    } else {
      console.log('未匹配任何条件分支');
      console.log('条件检查:', {
        hasChatId: !!params?.chatId,
        hasUsername: !!params?.username,
        hasPostContent: !!params?.postContent
      });
      setLoading(false);
    }

    // 获取系统信息，动态设置导航栏高度
    Taro.getSystemInfo({
      success: (res) => {
        const statusBarHeight = res.statusBarHeight || 0;
        const navbarHeight = statusBarHeight + 44; // 状态栏高度 + 导航栏内容高度

        // 动态设置导航栏样式
        const navbar = document.querySelector('.custom-navbar') as HTMLElement;
        if (navbar) {
          navbar.style.paddingTop = `${statusBarHeight}px`;
          navbar.style.height = `${navbarHeight}px`;
        }

        // 调整内容区域的 padding-top
        const chatList = document.querySelector('.chatList') as HTMLElement;
        if (chatList) {
          chatList.style.paddingTop = `${navbarHeight}px`;
        }
      }
    });
  }, []);

  useDidShow(() => {
    console.log('useDidShow 被调用');

    // 设置页面标题
    Taro.setNavigationBarTitle({ title: '聊天' });

    // 如果是提问者，监听页面返回事件
    if (userRole === 'questioner') {
      // 获取当前页面实例
      const pages = Taro.getCurrentPages();
      const currentPage = pages[pages.length - 1];

      if (currentPage) {
        // 重写页面的 onBackPress 方法（如果存在）
        if (typeof currentPage.onBackPress === 'function' || !currentPage.onBackPress) {
          const originalOnBackPress = currentPage.onBackPress;

          currentPage.onBackPress = function() {
            console.log('返回按钮被点击, userRole:', userRole);

            if (userRole === 'questioner') {
              setShowExitModal(true);
              return true; // 阻止默认返回行为
            }

            if (originalOnBackPress) {
              return originalOnBackPress.call(this);
            }
            return false; // 允许正常返回
          };
        }
      }
    }
  });

  // 加载已有对话
  const loadExistingChat = async (chatIdParam: string, currentUsername: string) => {
    try {
      setLoading(true);
      const chat = await getChatWithDetails(chatIdParam);
      setChatData(chat.data);
      setMessages(chat.data.messages || []);

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
  const createNewChat = async (currentUsername: string, partnerUsername: string, content: string, tags: string[], community: string) => {
    console.log('createNewChat 函数开始执行');
    console.log('传入参数:', {
      currentUsername,
      partnerUsername,
      content,
      tags,
      community
    });

    try {
      setLoading(true);

      // 解码URL参数
      const decodedContent = decodeURIComponent(content);
      const decodedTags = tags.map(tag => decodeURIComponent(tag)).filter(tag => tag.trim() !== '');
      const decodedCommunity = decodeURIComponent(community);

      console.log('解码后的参数:');
      console.log('currentUsername:', currentUsername);
      console.log('partnerUsername:', partnerUsername);
      console.log('decodedContent:', decodedContent);
      console.log('decodedTags:', decodedTags);
      console.log('decodedCommunity:', decodedCommunity);

      // 验证必要字段
      if (!currentUsername || !partnerUsername || !decodedCommunity) {
        console.error('缺少必要字段:', {
          currentUsername: !!currentUsername,
          partnerUsername: !!partnerUsername,
          community: !!decodedCommunity
        });
        throw new Error('缺少必要的用户名或社区信息');
      }

      // 创建新对话数据
      const newChatData = {
        questionUsername: currentUsername,
        answerUsername: partnerUsername,
        questionUserId: currentUsername,
        answerUserId: partnerUsername,
        content: decodedContent,
        tags: decodedTags,
        community: decodedCommunity,
        subject: decodedContent,
        status: 'ongoing' as const,
        messages: [] as ChatMessage[]
      };

      console.log('创建对话数据:', JSON.stringify(newChatData, null, 2));

      const savedChat = await saveChat(newChatData);
      setChatId(savedChat._id);
      setChatData(savedChat);
      setMessages([]);
      setUserRole('questioner');

      Taro.showToast({ title: '对话创建成功', icon: 'success' });

      // 异步删除原始帖子
      const router = getCurrentInstance().router;
      const postId = router?.params?.postId;
      if (postId) {
        setTimeout(() => {
          deleteThreadById(postId).catch(error => {
            console.warn('删除帖子失败:', error);
          });
        }, 1000);
      }
    } catch (error) {
      console.error('创建对话失败:', error);
      Taro.showToast({ title: '创建对话失败，请重试', icon: 'error' });
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

  // 处理暂时退出
  const handleTempExit = () => {
    Taro.navigateBack();
  };

  // 处理结束对话
  const handleEndChat = async (rating?: string) => {
    try {
      if (chatId) {
        // 调用 updateChatStatus 接口更新对话状态为已完成
        await updateChatStatus(chatId, 'completed');
        Taro.showToast({
          title: '对话已结束',
          icon: 'success'
        });
        
        // 更新本地状态
        setChatData(prev => prev ? { ...prev, status: 'completed' } : prev);
      }

      if (rating && chatData?.answerUsername) {
        try {
          // 映射评价等级
          let ratingValue: 'excellent' | 'average' | 'poor';
          switch (rating) {
            case '满意':
              ratingValue = 'excellent';
              break;
            case '及格':
              ratingValue = 'average';
              break;
            case '差劲':
              ratingValue = 'poor';
              break;
            default:
              ratingValue = 'average';
          }
          
          // 调用评价接口
          await evaluateUser(chatData.answerUsername, ratingValue);
          
          console.log('用户评价:', { username: chatData.answerUsername, rating: ratingValue });
          Taro.showToast({
            title: `感谢您的"${rating}"评价`,
            icon: 'success'
          });
        } catch (evaluateError) {
          console.error('评价提交失败:', evaluateError);
          // 评价失败不影响对话结束，只显示警告
          Taro.showToast({
            title: '评价提交失败，但对话已结束',
            icon: 'none'
          });
        }
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

  // 处理自定义返回按钮点击
  const handleBackClick = () => {
    console.log('自定义返回按钮被点击, userRole:', userRole, 'status:', chatData?.status);
    // 如果对话已完成，直接返回不显示弹窗
    if (chatData?.status === 'completed') {
      Taro.navigateBack();
      return;
    }

    // 如果是提问者且对话正在进行，显示退出弹窗
    if (userRole === 'questioner') {
      setShowExitModal(true);
    } else {
      Taro.navigateBack();
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

  console.log('ChatPage 组件渲染, loading:', loading);

  if (loading) {
    console.log('显示加载状态');
    return (
      <View className="page">
        <View style={{ textAlign: 'center', padding: '100px 20px', color: '#999' }}>
          加载中...
        </View>
      </View>
    );
  }

  console.log('显示正常页面内容');

  return (
    <View className="page">
      <View style={{ padding: '30px', backgroundColor: '#f5f5f5' }}></View>
      {/* 自定义导航栏 */}
      <View className="custom-navbar">
        <View className="nav-left" onClick={handleBackClick}>
          <View className="back-icon">‹</View>
        </View>
        <View className="nav-title">聊天</View>
        <View className="nav-right"></View>
      </View>

      <View className="chatList">
        <View className="header">
          <View className="card">
            <View className="up">
              <View className="contents">
                <View className="card-title">问题内容</View>
                <View className="text">
                  {chatData?.content || '正在加载问题内容...'}
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
          </View>
        )}
      </View>

      {/* 只有在对话进行中时才显示输入框 */}
      {chatData?.status !== 'completed' && (
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
      )}

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
