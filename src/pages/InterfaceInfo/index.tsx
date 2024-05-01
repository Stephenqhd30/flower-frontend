import { PageContainer } from '@ant-design/pro-components';
import { Card, Descriptions, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { getInterfaceInfoVoByIdUsingGet } from '@/services/StephenAPI-backend/interfaceInfoController';
import { useParams } from '@@/exports';

const InterfaceInfo: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();
  const params = useParams();

  const loadData = async () => {
    if (!params.id) {
      message.error('参数不存在');
      return;
    }
    setLoading(true);
    const hide = message.loading('正在加载数据');
    try {
      const res = await getInterfaceInfoVoByIdUsingGet({
        id: Number(params?.id),
      });
      setData(res.data);
      hide();
    } catch (error: any) {
      hide();
      message.error('数据加载失败,' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageContainer title={'查看接口文档'} loading={loading}>
      <Card>
        <Descriptions title={data?.name} column={1}>
          <Descriptions.Item label="接口状态">
            {data?.status === 0 ? '关闭' : '运行中'}
          </Descriptions.Item>
          <Descriptions.Item label="请求地址">{data?.url}</Descriptions.Item>
          <Descriptions.Item label="描述">{data?.description}</Descriptions.Item>
          <Descriptions.Item label="请求方法">{data?.method}</Descriptions.Item>
          <Descriptions.Item label="请求头">{data?.requestHeader}</Descriptions.Item>
          <Descriptions.Item label="响应头">{data?.responseHeader}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{data?.createTime} </Descriptions.Item>
          <Descriptions.Item label="更新时间">{data?.updateTime} </Descriptions.Item>
        </Descriptions>
      </Card>
    </PageContainer>
  );
};

export default InterfaceInfo;
