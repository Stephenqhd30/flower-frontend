import { PageContainer, ProCard, ProForm, ProFormTextArea } from '@ant-design/pro-components';
import { Descriptions, message } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  getInterfaceInfoVoByIdUsingGet, invokeInterfaceInfoUsingPost,
} from '@/services/StephenAPI-backend/interfaceInfoController';
import { useParams } from '@@/exports';

const InterfaceInfo: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [invokeLoading, setInvokeLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();
  const [invokeRes, setInvokeRes] = useState<any>()
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

  const onFinish = async (values: any) => {
    console.log(values)
    if (!params.id) {
      message.error('接口不存在');
      return;
    }
    setInvokeLoading(true);
    try {
      const res = await invokeInterfaceInfoUsingPost({
        ...values,
        id: params.id,
      });
      console.log(res?.data)
      setInvokeRes(res?.data);
      message.success('请求成功');
    } catch (error: any) {
      message.error('请求失败' + error.message);
    }
    setInvokeLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageContainer loading={loading}>
      <ProCard
        title={'接口文档信息'}
        extra={new Date().toLocaleDateString()}
        bordered
        headerBordered
      >
        <ProCard colSpan="50%">
          <Descriptions title={data?.name} column={1}>
            <Descriptions.Item label="接口状态">
              {data?.status === 0 ? '关闭' : '运行中'}
            </Descriptions.Item>
            <Descriptions.Item label="请求地址">{data?.url}</Descriptions.Item>
            <Descriptions.Item label="描述">{data?.description}</Descriptions.Item>
            <Descriptions.Item label="请求方法">{data?.method}</Descriptions.Item>
            <Descriptions.Item label="请求头">{data?.requestHeader}</Descriptions.Item>
            <Descriptions.Item label="响应头">{data?.responseHeader}</Descriptions.Item>
            <Descriptions.Item label="请求参数">{data?.requestParams}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{data?.createTime} </Descriptions.Item>
            <Descriptions.Item label="更新时间">{data?.updateTime} </Descriptions.Item>
          </Descriptions>
        </ProCard>
        <ProCard title={'在线调用接口'}>
          <ProForm
            name={'在线调用接口'}
            onFinish={async (values) => {
              await onFinish(values);
            }}
            submitter={{
              searchConfig: {
                submitText: '发送',
              },
            }}
          >
            <ProFormTextArea label={'请求参数'} name="requestParams"/>
          </ProForm>
        </ProCard>
        <ProCard
          loading={invokeLoading}
        >
          {invokeRes}
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default InterfaceInfo;
