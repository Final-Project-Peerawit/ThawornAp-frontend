import { PageHeader } from "antd";
import React from "react";
import Texteditor from "./components/texteditor/textEditor";

const home: React.FC = () => {
  return (
    <div className="relative w-full h-screen">
      <PageHeader title="หน้าแรก" />
      <div className="flex justify-center h-full">
        <div className="max-w-[1000px] w-full mx-auto px-8 ">
          <Texteditor />
        </div>
      </div>
    </div>
  );
};

export default home;
