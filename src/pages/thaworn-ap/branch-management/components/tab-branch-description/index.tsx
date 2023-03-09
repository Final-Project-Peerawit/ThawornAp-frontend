import React from "react";
import BarChart from "./charts/bar-charts";
import LineChart from "./charts/line-chart";
import PieChart from "./charts/pie-chart";

const BranchDescription = (): React.ReactElement => {
  return (
    <div className="flex-initial">
      <div className="grid sm:gap-10 gap-5 lg:grid-cols-3 sm:pt-10 pt-5 sm:px-10 px-5 pb-5">
        <div className="flex items-center justify-between bg-white p-4 rounded-md shadow-sm border-b-4 border-blue-300">
          <div className="text-sm font-semibold">ค่าวัสดุ-อุปกรณ์</div>
          <div className="text-2xl font-bold">12,000</div>
        </div>
        <div className="flex items-center justify-between bg-white p-4 rounded-md shadow-sm border-b-4 border-yellow-300">
          <div className="text-sm font-semibold">ค่าแรงช่าง</div>
          <div className="text-2xl font-bold">5,000</div>
        </div>
        <div className="flex items-center justify-between bg-white p-4 rounded-md shadow-sm border-b-4 border-green-300">
          <div className="text-sm font-semibold">ยอดรวมรายจ่าย</div>
          <div className="text-2xl font-bold">17,000</div>
        </div>
      </div>

      <div className="sm:pt-10 pt-5 sm:px-10 px-5 pb-5 grid lg:grid-cols-1 md:grid-cols-1">
        <div className="bg-white flex-col rounded shadow-sm p-4 text-md font-bold">
          ยอดรวมรายการแจ้งซ่อมของแต่ละสาขา
          <div className="p-5">
            <BarChart />
          </div>
        </div>
      </div>

      <div className="sm:p-10 p-5 grid lg:grid-cols-2 md:grid-cols-2 gap-5">
        <div className="bg-white flex-col rounded shadow-sm p-4 text-md font-bold">
          ค่าซ่อมแต่ละสาขา
          <div className="p-5">
            <LineChart />
          </div>
        </div>
        <div className="bg-white flex-col rounded shadow-sm p-4 text-md font-bold">
          ยอดการแจ้งซ่อมประจำเดือน
          <div className="p-5">
            <PieChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchDescription;
