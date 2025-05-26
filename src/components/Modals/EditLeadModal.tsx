"use client";
import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, InputNumber, Row, Col } from "antd";
import type { FormProps } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  IdcardOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";
import { useMessageApi } from "utils";
import { updateLead } from "api/leads"; // hypothetical API

interface EditLeadModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  leadData: any;
  onSuccess?: () => void;
}

function EditLeadModal({
  open,
  setOpen,
  leadData,
  onSuccess,
}: EditLeadModalProps) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const messageApi = useMessageApi();

  useEffect(() => {
    if (open && leadData) {
      form.setFieldsValue({
        groupId: leadData.groupId,
        groupName: leadData.groupName,
        email: leadData.email,
        phone: leadData.phone,
        time: parseFloat(leadData.time),
        tags: leadData.tags,
      });
    }
  }, [open, leadData, form]);

  const onFinish: FormProps["onFinish"] = async (values) => {
    try {
      setConfirmLoading(true);
      await updateLead(leadData._id, values);
      messageApi.success("Lead updated successfully!");
      form.resetFields();
      setOpen(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      messageApi.error("Failed to update lead!");
      console.error("Update Lead Error:", error);
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Lead"
      open={open}
      onOk={() => form.submit()}
      confirmLoading={confirmLoading}
      onCancel={() => setOpen(false)}
      okText="Update"
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Group ID"
              name="groupId"
              rules={[{ required: true, message: "Please enter Group ID" }]}
            >
              <Input prefix={<IdcardOutlined />} placeholder="Group ID" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Group Name"
              name="groupName"
              rules={[{ required: true, message: "Please enter Group Name" }]}
            >
              <Input prefix={<IdcardOutlined />} placeholder="Group Name" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email",
                },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  pattern: /^[0-9]{10}$/,
                  message: "Enter valid phone number",
                },
              ]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="Phone" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Tags"
              name="tags"
              rules={[{ required: true, message: "Please enter a tag" }]}
            >
              <Input placeholder="Enter tag" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default EditLeadModal;