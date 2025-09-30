import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Typography } from 'antd';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { fetchGames } from '../store/gamesSlice';
import AppHeader from '../components/AppHeader';
import ProductList from '../components/ProductList';
import Basket from '../components/Basket';
import AddProductForm from '../components/AddProductForm';
import './App.css';

const { Content } = Layout;
const { Title } = Typography;

function AppContent() {
  const [cartVisible, setCartVisible] = useState(false);
  const [addGameVisible, setAddGameVisible] = useState(false);

  useEffect(() => {
    store.dispatch(fetchGames());
  }, []);

  const handleCartToggle = () => {
    setCartVisible(!cartVisible);
  };

  const handleAddGameToggle = () => {
    setAddGameVisible(!addGameVisible);
  };

  return (
    <Layout style={{ minHeight: '100vh', position: 'relative' }}>

      <AppHeader 
        onCartToggle={handleCartToggle}
        onAddGameToggle={handleAddGameToggle}
      />
      <Content style={{ padding: '24px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Row gutter={[24, 24]}>
            <Col xs={24}>
              <ProductList />
            </Col>
          </Row>
        </div>
      </Content>
      
      <Basket 
        visible={cartVisible}
        onClose={() => setCartVisible(false)}
      />
      
      <AddProductForm 
        visible={addGameVisible}
        onCancel={() => setAddGameVisible(false)}
      />
    </Layout>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
