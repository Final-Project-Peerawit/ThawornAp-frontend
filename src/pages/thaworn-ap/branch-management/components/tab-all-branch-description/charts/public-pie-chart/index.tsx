import React from "react";
import ReactEcharts from "echarts-for-react";
import { useQuery } from "react-query";
import { getPublicPieChart } from "src/dataService/api_@branchManagement_tabAll_publicPieChart/get";
import { Skeleton } from "antd";

export default function privatePieChart(): React.ReactElement {
  const { data, isLoading } = useQuery({
    queryKey: ["public_pie_chart"],
    queryFn: async () => getPublicPieChart(),
  });

  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: data?.result.map((item) => ({
          name: item.name,
          value: item.value,
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  return (
    <>{isLoading ? <Skeleton active /> : <ReactEcharts option={option} />}</>
  );
}
