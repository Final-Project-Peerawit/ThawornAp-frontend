import { Button, PageHeader } from "antd";
import React from "react";
import Cards from "./components/cards/card";

const home = (): React.ReactElement => {
  return (
    <div className="relative w-full">
      <PageHeader title="หน้าแรก" />
      <div className="flex justify-center h-full">
        <div className="max-w-[700px] w-full px-8">
          <div className=" pb-10">
            <Button type="primary" block>
              สร้างโพสต์
            </Button>
          </div>
          <Cards />
        </div>
      </div>
    </div>
  );
};

export default home;
