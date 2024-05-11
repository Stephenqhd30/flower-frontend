import '@umijs/max';
import React from 'react';
import { Pie } from '@ant-design/charts';

export type EChartsProps = {
  data?: API.InterfaceInfoVO[];
};
/**
 * 接口分析
 * @constructor
 */
const ECharts: React.FC<EChartsProps> = (props) => {
  const { data } = props;
  const chartData = data?.map((item) => {
    return {
      name: item.name,
      value: item.totalNum,
    };
  });
  const config = {
    data: chartData,
    title: "接口调用分析",
    angleField: 'value',
    colorField: 'name',
    radius: 0.8,
    label: {
      text: (d: any) => `${d.name}\n ${d.value}`,
      position: 'spider',
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} />;
};
export default ECharts;
