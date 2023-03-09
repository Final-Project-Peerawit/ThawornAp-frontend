import React from "react";
import ReactEcharts from "echarts-for-react";
import { useQuery } from "react-query";
import { getPrivatePieChart } from "src/dataService/api_@branchManagement_tabAll_privatePieChart/get";

export default function privatePieChart(): React.ReactElement {
  const { data, isLoading } = useQuery({
    queryKey: ["private_pie_chart"],
    queryFn: async () => getPrivatePieChart(),
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
  return <ReactEcharts option={option} />;
}
