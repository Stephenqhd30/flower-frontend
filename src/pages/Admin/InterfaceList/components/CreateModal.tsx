import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';
import {message, Modal} from 'antd';
import {addInterfaceInfoUsingPost} from '@/services/StephenAPI-backend/interfaceInfoController';

export type CreateProps = {
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
};

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.InterfaceInfo) => {
  const hide = message.loading('正在添加');
  try {
    await addInterfaceInfoUsingPost({
      ...fields,
    });
    hide();
    message.success('创建成功');
    return true;
  } catch (error: any) {
    hide();
    message.error('创建失败，请重新尝试!', error.message);
    return false;
  }
};

const CreateModal: React.FC<CreateProps> = (props) => {
  const { visible, columns, onCancel, onSubmit } = props;
  return (
    <Modal
      destroyOnClose
      title={'创建'}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        columns={columns}
        onSubmit={async (values: API.InterfaceInfo) => {
          const success = await handleAdd(values);
          if (success) {
            onSubmit?.(values);
          }
        }}
        type={'form'}
      />
    </Modal>
  );
};
export default CreateModal;
