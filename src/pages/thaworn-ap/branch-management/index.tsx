import { PageHeader, Tabs } from "antd";
import AllBranchDescription from "./components/tab-all-branch-description/index";
import BranchDescription from "./components/tab-branch-description/index";

const branchManagement = (): React.ReactElement => {
  return (
    <div className="flex-initial">
      <PageHeader title="จัดการสาขา" />
      <div className="flex justify-center">
        <div className="px-10 pb-10 w-full">
          <Tabs>
            <Tabs.TabPane tab="รายละเอียดสถิติ" key={1}>
              <AllBranchDescription />
            </Tabs.TabPane>

            <Tabs.TabPane tab="ข้อมูลรวมทุกสาขา" key={2}>
              <BranchDescription />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default branchManagement;
