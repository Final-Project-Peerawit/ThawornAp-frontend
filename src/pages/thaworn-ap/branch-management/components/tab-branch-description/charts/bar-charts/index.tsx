import React from "react";
import ReactEcharts from "echarts-for-react";
import { useQuery } from "react-query";
import { getBarChart } from "src/dataService/api_@branchManagement_tab_barChart/get";
import { Skeleton } from "antd";

export default function barChart(): React.ReactElement {
  const { data, isLoading } = useQuery({
    queryKey: ["bar_chart"],
    queryFn: async () => getBarChart(),
  });

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["ลาดพร้าว71", "ลาดพร้าว78", "ลาดกระบัง"],
    },
    toolbox: {
      show: true,
      orient: "vertical",
      left: "right",
      top: "center",
      feature: {
        mark: { show: true },
        magicType: { show: true, type: ["line", "bar", "stack"] },
      },
    },
    xAxis: [
      {
        type: "category",
        axisTick: { show: false },
        data: data?.result.map((item) => ({ value: item.name })),
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "ลาดพร้าว71",
        type: "bar",
        barGap: 0,
        emphasis: {
          focus: "series",
        },
        data: data?.result.map((item) => ({ value: item.brnach_value1 })),
      },
      {
        name: "ลาดพร้าว78",
        type: "bar",
        emphasis: {
          focus: "series",
        },
        data: data?.result.map((item) => ({ value: item.brnach_value2 })),
      },
      {
        name: "ลาดกระบัง",
        type: "bar",
        emphasis: {
          focus: "series",
        },
        data: data?.result.map((item) => ({ value: item.brnach_value3 })),
      },
    ],
  };
  return (
    <>{isLoading ? <Skeleton active /> : <ReactEcharts option={option} />}</>
  );
}
