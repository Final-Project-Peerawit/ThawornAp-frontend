import React from "react";
import ReactEcharts from "echarts-for-react";
import { useQuery } from "react-query";
import { getLineChart } from "src/dataService/api_@branchManagement_tabAll_lineChart/get";
import { Skeleton } from "antd";

export default function lineChart(): React.ReactElement {
  const { data, isLoading } = useQuery({
    queryKey: ["line_chart"],
    queryFn: async () => getLineChart(),
  });

  const option = {
    tooltip: {
      trigger: "item",
    },
    xAxis: {
      type: "category",
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
        data: data?.result.map((item) => ({ value: item.value })),
        type: "line",
        symbol: "circle",
        symbolSize: 15,
        lineStyle: {
          color: "#5470C6",
          width: 4,
          type: "dashed",
        },
        itemStyle: {
          borderWidth: 3,
          borderColor: "#EE6666",
          color: "yellow",
        },
      },
    ],
  };
  return (
    <>{isLoading ? <Skeleton active /> : <ReactEcharts option={option} />}</>
  );
}
