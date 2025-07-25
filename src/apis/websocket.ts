// WebSocket 相关接口封装

/**
 * 创建 WebSocket 连接
 * @param url 完整的 ws/wss 地址
 * @param protocols 可选，子协议数组
 * @returns WebSocket 实例
 */
export function createWebSocket(url: string, protocols?: string[]) {
  return protocols ? new window.WebSocket(url, protocols) : new window.WebSocket(url);
}

/**
 * 发送消息
 * @param ws WebSocket 实例
 * @param data 要发送的数据
 */
export function sendMessage(ws: WebSocket, data: string | ArrayBufferLike | Blob | ArrayBufferView) {
  ws.send(data);
}

/**
 * 关闭 WebSocket 连接
 * @param ws WebSocket 实例
 * @param code 可选，关闭码
 * @param reason 可选，关闭原因
 */
export function closeWebSocket(ws: WebSocket, code?: number, reason?: string) {
  ws.close(code, reason);
}
