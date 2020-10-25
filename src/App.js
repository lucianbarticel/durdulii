import { Layout, Space } from 'antd';
import { FoodTable, Filters, Search } from './components';
import { DataManagerContext } from './services' 

import 'antd/dist/antd.min.css';
import './App.css';

const { Content, Sider } = Layout;


const App = () => {
  return (
    <div className="App">
      <Layout>
        <Sider style={{ backgroundColor: "white" }}>
          <Filters />  
        </Sider>
        <Content style={{ padding: '25px 100px' }}>
          <Space style={{ width: '100%' }} direction="vertical">
            <Search />
            <FoodTable />
          </Space>
        </Content>
      </Layout>
    </div>
  );
}

const enhance = (Provider, Component) => props => (
  <Provider>
    <Component {...props} />
  </Provider>
);

export default enhance(DataManagerContext, App);
