/* eslint-disable jsx-quotes */
import { useRef, useState } from "react";
import { View } from "@tarojs/components";
import "./Btn_CanMove.scss";

const BtnCanMove = ({ icon = "＋", onClick }) => {
  const btnRef = useRef(null);
  const [pos, setPos] = useState({ x: 300, y: 500 });
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });

  // 兼容H5和小程序的事件
  const handleTouchStart = (e) => {
    setDragging(true);
    const touch = e.touches ? e.touches[0] : e;
    setStart({ x: touch.pageX - pos.x, y: touch.pageY - pos.y });
  };

  const handleTouchMove = (e) => {
    if (!dragging) return;
    const touch = e.touches ? e.touches[0] : e;
    setPos({
      x: touch.pageX - start.x,
      y: touch.pageY - start.y,
    });
  };

  const handleTouchEnd = () => {
    setDragging(false);
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
    >
      {icon}
    </View>
  );
};

export default BtnCanMove;
