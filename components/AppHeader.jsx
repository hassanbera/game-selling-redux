import React from 'react';
import { Layout, Badge, Button } from 'antd';
import { ShoppingCartOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const { Header } = Layout;

const AppHeader = ({ onCartToggle, onAddGameToggle }) => {
  const cartItems = useSelector(state => state.games.cart);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Header style={{ 
      backgroundColor: '#1677ff',
      borderBottomLeftRadius: '12px',
      borderBottomRightRadius: '12px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, color: 'white' }}>
          Game Store
        </h1>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={onAddGameToggle}
          >
            Add Game
          </Button>
          <Badge count={totalItems}>
            <Button
              icon={<ShoppingCartOutlined />}
              onClick={onCartToggle}
            />
          </Badge>
        </div>
      </div>
    </Header>
  );
};

export default AppHeader;
