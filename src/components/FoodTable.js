import { Table } from 'antd';
import { useDataManager } from '../services'
const columns = [
  {
    title: 'Aliment (100g)',
    dataIndex: 'aliment',
    key: 'aliment',
  },
  {
    title: 'Calorii (c)',
    dataIndex: 'calorii',
    key: 'calorii',
  },
  {
    title: 'Proteine (%)',
    dataIndex: 'proteine',
    key: 'proteine',
  },
  {
    title: 'Lipide (%)',
    dataIndex: 'lipide',
    key: 'lipide',
  },
  {
    title: 'Carbohidrati (%)',
    dataIndex: 'carbohidrati',
    key: 'carbohidrati',
  },
  {
    title: 'Fibre (%)',
    dataIndex: 'fibre',
    key: 'fibre',
  },
  {
    title: 'Aproximari',
    dataIndex: 'aproximari',
    key: 'aproximari',
  },
]


export const FoodTable = () => {
  const { data } = useDataManager();
  return (
    <Table columns={columns} dataSource={data} />
  );
}
