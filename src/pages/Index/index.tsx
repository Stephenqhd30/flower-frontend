import {PageContainer, ProList} from '@ant-design/pro-components';
import { message, Space, Tag, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { listInterfaceInfoByPageUsingPost } from '@/services/StephenAPI-backend/interfaceInfoController';

const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  const [total, setTotal] = useState<number>(0);


  const loadData = async (current = 1, pageSize = 5) => {
    setLoading(true);
    try {
      const res = await listInterfaceInfoByPageUsingPost({
        current,
        pageSize,
      });
      setList(res?.data?.records ?? []);
      setTotal(res?.data?.total ?? 0);
    } catch (error: any) {
      message.error('数据加载失败,' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageContainer title={'花海API接口开放平台'}>
      <ProList<API.InterfaceInfo>
        loading={loading}
        size="large"
        rowKey={"id"}
        headerTitle="接口信息列表"
        dataSource={list}
        showActions="hover"
        pagination={{
          pageSize: 5,
          total: total,
          onChange: async (page, pageSize) => {
            await loadData(page, pageSize);
          },
          align: 'center',
        }}
        metas={{
          title: {
            title: "接口名称",
            dataIndex: 'name',
            valueType: "text",
            render: (_, record: API.InterfaceInfo) => {
              const apiLink = `/interfaceInfo/${record.id}`;

              return (
                <Typography.Link
                  key={record.id}
                  href={apiLink}
                >
                  {record.name}
                </Typography.Link>
              )
            }
          },
          description: {
            title: "接口描述",
            dataIndex: 'description',
            valueType: "textarea",
          },
          subTitle: {
            title: "请求方式",
            dataIndex: "method",
            valueType: "text",
            render: (_, record) => {
              return (
                <Space size={0}>
                  <Tag color="blue">{record.method}</Tag>
                  <Tag color="#5BD8A6">{record.status === 0 ? "关闭" : "运行中"}</Tag>
                </Space>
              );
            },
          },
          actions: {
            render: (_, record) => {
              const apiLink = `/interfaceInfo/${record.id}`;

              return (
                <Space size={"middle"}>
                  <Typography.Link
                    href={apiLink}
                    key={"details"}
                  >
                    查看详细
                  </Typography.Link>
                </Space>
              )
            },
          },
        }}
      />
    </PageContainer>
  );
};

export default Index;
