import React from "react";
import ReactEcharts from "echarts-for-react";
import { useQuery } from "react-query";
import { getLineChartHighLow } from "src/dataService/api_@branchManagement_tab_lineChart/get";
import { Skeleton } from "antd";

export default function lineChart(): React.ReactElement {
  const { data, isLoading } = useQuery({
    queryKey: ["getLineChartHighLow"],
    queryFn: async () => getLineChartHighLow(),
  });

  const option = {
    tooltip: {
      trigger: "axis",
    },
    legend: {},
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "ลาดพร้าว71",
        type: "line",
        data: data?.result.map((item) => ({ value: item.brnach_value1 })),
        markPoint: {
          data: [
            { type: "max", name: "Max" },
            { type: "min", name: "Min" },
          ],
        },
      },
      {
        name: "ลาดพร้าว78",
        type: "line",
        data: data?.result.map((item) => ({ value: item.brnach_value2 })),
        markPoint: {
          data: [
            { type: "max", name: "Max" },
            { type: "min", name: "Min" },
          ],
        },
      },
      {
        name: "ลาดกระบัง",
        type: "line",
        data: data?.result.map((item) => ({ value: item.brnach_value3 })),
        markPoint: {
          data: [
            { type: "max", name: "Max" },
            { type: "min", name: "Min" },
          ],
        },
      },
    ],
  };

  return (
    <>{isLoading ? <Skeleton active /> : <ReactEcharts option={option} />}</>
  );
}
