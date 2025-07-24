/* eslint-disable jsx-quotes */
import { useRef, useState } from "react";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./Btn_CanMove.scss";

const BtnCanMove = ({ icon = "＋", onClick }) => {
  const btnRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 300, y: 650 });
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });

  const getWindowSize = () => {
    const { windowWidth, windowHeight } = Taro.getWindowInfo();
    return { windowWidth, windowHeight };
  };

  const getBtnSize = () => ({ width: 60, height: 60 });

  const handleTouchStart = (e) => {
    if (typeof e.stopPropagation === "function") e.stopPropagation();
    setDragging(true);
    const touch = e.touches && e.touches[0] ? e.touches[0] : e;
    setStart({ x: touch.pageX - pos.x, y: touch.pageY - pos.y });
  };

  const handleTouchMove = (e) => {
    if (!dragging) return;
    if (typeof e.stopPropagation === "function") e.stopPropagation();
    if (typeof e.preventDefault === "function") e.preventDefault();

    const touch = e.touches && e.touches[0] ? e.touches[0] : e;
    const { windowWidth, windowHeight } = getWindowSize();
    const { width, height } = getBtnSize();
    let x = touch.pageX - start.x;
    let y = touch.pageY - start.y;

    // 限制范围
    x = Math.max(0, Math.min(x, windowWidth - width));
    y = Math.max(0, Math.min(y, windowHeight - height));

    // 不用 React 状态，直接 DOM 操作
    if (btnRef.current) {
      btnRef.current.style.left = `${x}px`;
      btnRef.current.style.top = `${y}px`;
    }
  };

  const handleTouchEnd = () => {
    setDragging(false);

    // 拖动结束后更新状态（可选，用于保存位置）
    if (btnRef.current) {
      const x = parseInt(btnRef.current.style.left);
      const y = parseInt(btnRef.current.style.top);
      setPos({ x, y });
    }
  };

  return (
    <View
      ref={btnRef}
      className="btn-can-move"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        zIndex: 9999,
        position: "fixed",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={onClick}
      catchMove
    >
      {icon}
    </View>
  );
};

export default BtnCanMove;
