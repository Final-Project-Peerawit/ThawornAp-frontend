import { PageHeader, Tabs, TabsProps } from "antd";
import AllBranchDescription from "./components/tab-all-branch-description/index";
import BranchDescription from "./components/tab-branch-description/index";

const branchManagement = (): React.ReactElement => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `รายละเอียดสถิติ`,
      children: (
        <div className="bg-gray-200 min-h-screen rounded-md">
          <AllBranchDescription />
        </div>
      ),
    },
    {
      key: "2",
      label: `ข้อมูลรวมทุกสาขา`,
      children: (
        <div className="bg-gray-200 min-h-screen rounded-md">
          <BranchDescription />
        </div>
      ),
    },
  ];

  return (
    <div className="flex-initial">
      <PageHeader title="จัดการสาขา" />
      <div className="flex justify-center">
        <div className="px-10 pb-10 w-full">
          <Tabs defaultActiveKey="1" items={items} />
        </div>
      </div>
    </div>
  );
};

export default branchManagement;
