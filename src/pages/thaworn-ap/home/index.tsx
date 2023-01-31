import { PageHeader } from "antd";
import React from "react";
import Texteditor from "./components/texteditor/textEditor";

const home: React.FC = () => {
  return (
    <div className="flex-initial">
      <PageHeader title="หน้าแรก" />
      <div className="px-10 pb-10">
        <Texteditor />
      </div>
    </div>
  );
};

export default home;
