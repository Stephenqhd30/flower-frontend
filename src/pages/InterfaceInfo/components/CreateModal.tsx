import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';
import { Modal } from 'antd';

export type Props = {
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<boolean>;
  visible: boolean;
};

const CreateModal: React.FC<Props> = (props) => {
  const { visible, columns, onCancel, onSubmit } = props;
  return (
    <Modal open={visible} footer={null} onCancel={() => onCancel?.()}>
      <ProTable
        type="form"
        columns={columns}
        onSubmit={async (values) => {
          await onSubmit(values);
        }}
      />
    </Modal>
  );
};
export default CreateModal;
