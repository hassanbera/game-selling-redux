import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Button, Typography, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addGameToServer } from '../store/gamesSlice';

const { Title } = Typography;

const AddProductForm = ({ visible, onCancel }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const newGame = {
        title: values.title,
        price: values.price,
        image: values.image || `https://placehold.co/200x300.svg?text=${encodeURIComponent(values.title)}`
      };
      
      await dispatch(addGameToServer(newGame)).unwrap();
      message.success('Game added successfully!');
      form.resetFields();
      onCancel();
    } catch (error) {
      message.error('Failed to add game. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={<Title level={3} style={{ margin: 0 }}>Add New Game</Title>}
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={500}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Game Title"
          name="title"
          rules={[
            { required: true, message: 'Please enter the game title!' },
            { min: 2, message: 'Title must be at least 2 characters!' }
          ]}
        >
          <Input placeholder="Enter game title" />
        </Form.Item>

        <Form.Item
          label="Price ($)"
          name="price"
          rules={[
            { required: true, message: 'Please enter the price!' },
            { type: 'number', min: 0.01, message: 'Price must be greater than 0!' }
          ]}
        >
          <InputNumber
            placeholder="Enter price"
            min={0.01}
            step={0.01}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          label="Image URL (Optional)"
          name="image"
          rules={[
            { type: 'url', message: 'Please enter a valid URL!' }
          ]}
        >
          <Input placeholder="Enter image URL (leave empty for placeholder)" />
        </Form.Item>

        <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <Button onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<PlusOutlined />}
            >
              Add Game
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProductForm;
