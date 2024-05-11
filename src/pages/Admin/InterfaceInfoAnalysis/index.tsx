import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import React, {useEffect, useState} from 'react';
import ECharts from '@/pages/Admin/InterfaceInfoAnalysis/components/ECharts';
import {listTopInvokeInterfaceInfoUsingGet} from '@/services/StephenAPI-backend/analyzeController';

/**
 * 接口分析
 * @constructor
 */
const InterfaceInfoAnalysis: React.FC = () => {
  const [data, setData] = useState<API.InterfaceInfoVO[]>();
  const [loading, setLoading] = useState<boolean>(true)

  useEffect( () => {
    // 从远程获取数据
    listTopInvokeInterfaceInfoUsingGet().then(res => {
      if(res.data) {
        setLoading(false);
        setData(res.data);
      }
    })
  }, [])

  return (
    <PageContainer
      loading={loading}
    >
      <ECharts data={data}/>
    </PageContainer>
  );
};
export default InterfaceInfoAnalysis;
