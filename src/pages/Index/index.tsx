import {PageContainer, ProList} from '@ant-design/pro-components';
import { Avatar, List, message, Space, Tag, Typography } from 'antd';
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
        renderItem={(item, index) => {
          const apiLink = `/interfaceInfo/${item.id}`;
          return (
            <>
              <List.Item
                key={item.id}
                extra={
                  <Space size={"middle"}>
                    <Typography.Link
                      href={apiLink}
                      key={"details"}
                    >
                      查看详细
                    </Typography.Link>
                  </Space>
                }
              >
                <List.Item.Meta
                  avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                  title={<a href={apiLink}>{item.name}</a>}
                  description={item.description}
                />
              </List.Item>
            </>
          )
        }}
      />
    </PageContainer>
  );
};

export default Index;
