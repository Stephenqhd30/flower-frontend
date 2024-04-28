import { ProColumns, ProFormInstance, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import React, { useEffect, useRef } from 'react';
import { Modal } from 'antd';

export type Props = {
  values: API.InterfaceInfo;
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
};

const UpdateModal: React.FC<Props> = (props) => {
  const { values, visible, columns, onCancel, onSubmit } = props;
  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    formRef?.current?.setFieldsValue(values);
  }, [values]);
  return (
    <Modal open={visible} footer={null} onCancel={() => onCancel?.()}>
      <ProTable
        type="form"
        columns={columns}
        formRef={formRef}
        form={{
          initialValues: values,
        }}
        onSubmit={async (values) => {
          await onSubmit(values);
        }}
      />
    </Modal>
  );
};
export default UpdateModal;
