import React from 'react';
import { Drawer, Button, List, Typography, Space, InputNumber, Empty } from 'antd';
import { DeleteOutlined, ShoppingCartOutlined, CloseOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartQuantity, clearCart } from '../store/gamesSlice';

const { Title, Text } = Typography;

const Basket = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.games.cart);

  const handleRemoveFromCart = (gameId) => {
    dispatch(removeFromCart(gameId));
  };

  const handleQuantityChange = (gameId, quantity) => {
    dispatch(updateCartQuantity({ gameId, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <Drawer
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={3} style={{ margin: 0 }}>
            Shopping Cart
          </Title>
          <Button
            icon={<CloseOutlined />}
            onClick={onClose}
          />
        </div>
      }
      placement="right"
      onClose={onClose}
      open={visible}
      width={400}
      extra={
        cartItems.length > 0 && (
          <Button
            danger
            onClick={handleClearCart}
          >
            Clear Cart
          </Button>
        )
      }
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        {cartItems.length === 0 ? (
          <Empty
            description="Your cart is empty. Add some games to get started!"
            image={<ShoppingCartOutlined style={{ fontSize: '64px' }} />}
          />
        ) : (
          <>
            <List
              dataSource={cartItems}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                      />
                    }
                    title={
                      <Text strong>
                        {item.title}
                      </Text>
                    }
                    description={
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Text>${item.price}</Text>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Text>Qty:</Text>
                          <InputNumber
                            min={1}
                            max={99}
                            value={item.quantity}
                            onChange={(value) => handleQuantityChange(item.id, value)}
                            style={{ width: '80px' }}
                          />
                        </div>
                        <Text strong>
                          Total: ${(item.price * item.quantity).toFixed(2)}
                        </Text>
                      </Space>
                    }
                  />
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </List.Item>
              )}
            />
            <div style={{ 
              textAlign: 'center', 
              padding: '16px', 
              background: '#f5f5f5',
              borderRadius: '8px',
              marginTop: '16px'
            }}>
              <Title level={3} style={{ margin: 0 }}>
                Total: ${calculateTotal().toFixed(2)}
              </Title>
            </div>
          </>
        )}
      </Space>
    </Drawer>
  );
};

export default Basket;
