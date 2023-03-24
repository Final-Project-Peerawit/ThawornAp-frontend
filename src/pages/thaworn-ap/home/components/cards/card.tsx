import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";

const card = () => {
  return (
    <Card
      actions={[<EditOutlined key="edit" />, <DeleteOutlined key="delete" />]}
    >
      <Meta
        avatar={<Avatar src="https://joesch.moe/api/v1/random?key=2" />}
        title="Card title"
        description="This is the description"
      />
    </Card>
  );
};

export default card;
