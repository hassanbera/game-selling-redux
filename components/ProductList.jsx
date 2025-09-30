import React from 'react';
import { Card, Button, Row, Col, Typography, Image, Space } from 'antd';
import { ShoppingCartOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeGameFromServer } from '../store/gamesSlice';

const { Title, Text } = Typography;

const ProductList = () => {
  const dispatch = useDispatch();
  const { games, loading } = useSelector(state => state.games);

  const handleAddToCart = (game) => {
    dispatch(addToCart(game));
  };

  const handleRemoveGame = (gameId) => {
    dispatch(removeGameFromServer(gameId));
  };

  if (loading) {
    return <div style={{ textAlign: 'center', color: '#ffffff' }}>Loading games...</div>;
  }

  return (
    <div style={{ marginBottom: '30px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '30px', color: '#ffffff' }}>
        Available Games
      </Title>
      <Row gutter={[16, 16]}>
        {games.map(game => (
          <Col xs={24} sm={12} md={8} lg={6} key={game.id}>
            <Card
              hoverable
              style={{ 
                border: '1px solid #d9d9d9',
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '12px'
              }}
              cover={
                <Image
                  src={game.image}
                  alt={game.title}
                  style={{ height: '200px', objectFit: 'contain' }}
                  preview={false}
                />
              }
            >
              <Card.Meta
                title={
                  <Title level={4} style={{ margin: 0 }}>
                    {game.title}
                  </Title>
                }
                description={
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>
                      ${game.price}
                    </Text>
                    <div style={{ 
                      display: 'flex', 
                      gap: '8px', 
                      marginTop: '12px',
                      width: '100%'
                    }}>
                      <Button
                        type="primary"
                        icon={<ShoppingCartOutlined />}
                        onClick={() => handleAddToCart(game)}
                        style={{ flex: 1 }}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleRemoveGame(game.id)}
                        style={{ flex: 1 }}
                      >
                        Remove
                      </Button>
                    </div>
                  </Space>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;
