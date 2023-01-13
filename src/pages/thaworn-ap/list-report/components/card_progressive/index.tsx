import React from "react";
import { Typography } from "antd";

interface IProp {
  title: string;
  color: string;
  list_item: number;
  border_item: string;
}

const cardProgressive: React.FC<IProp> = ({
  color,
  list_item,
  title,
  border_item,
}) => {
  return (
    <div
      className="w-full md:w-44 rounded-xl p-2 text-center cursor-pointer mb-4 space-y-5 border-2"
      style={{ backgroundColor: color, borderColor: border_item }}
    >
      <div className="w-full">
        <Typography.Text strong> {title}</Typography.Text>
      </div>
      <div className="w-full">
        <Typography.Text strong> {`${list_item} รายการ`} </Typography.Text>
      </div>
    </div>
  );
};

export default cardProgressive;
