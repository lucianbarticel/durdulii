import { Fragment } from 'react';
import { Table, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useDataManager } from '../services'

const renderHighlightedText = (text, searchFilter) => {
  if (searchFilter.length === 0) return text

  const parts = text.split(new RegExp(`(${searchFilter})`, 'gi'));

  return <Fragment> { parts.map((part, i) => 
      <span key={i} style={part.toLowerCase() === searchFilter.toLowerCase() ? { fontWeight: 'bold' } : {} }>
          { part }
      </span>)
  } </Fragment>;
}

const renderAliment = (searchFilter, text, record) => {
  const thereIsAprox = record.aproximari && record.aproximari.length > 0
  const aprox = ( 
    <Tooltip title={record.aproximari}>
      <InfoCircleOutlined />
    </Tooltip>
    )
  const renderedAprox = thereIsAprox ? aprox : null;

  return (
    <Fragment>
      {renderHighlightedText(text, searchFilter)} {renderedAprox}
    </Fragment>
  )
}

const renderColumns = searchFilter => {

  return [
    {
      title: 'Aliment (100g)',
      dataIndex: 'aliment',
      key: 'aliment',
      render: (text, record, index) => renderAliment(searchFilter, text, record, index),
    },
    {
      title: 'Calorii (c)',
      dataIndex: 'calorii',
      key: 'calorii',
      sorter: {
        compare: (a, b) => a.calorii - b.calorii,
        multiple: 1,
      },
    },
    {
      title: 'Proteine (%)',
      dataIndex: 'proteine',
      key: 'proteine',
      sorter: {
        compare: (a, b) => a.proteine - b.proteine,
        multiple: 2,
      },
    },
    {
      title: 'Grasimi (%)',
      dataIndex: 'lipide',
      key: 'lipide',
      sorter: {
        compare: (a, b) => a.lipide - b.lipide,
        multiple: 3,
      },
    },
    {
      title: 'Carbohidrati (%)',
      dataIndex: 'carbohidrati',
      key: 'carbohidrati',
      sorter: {
        compare: (a, b) => a.carbohidrati - b.carbohidrati,
        multiple: 4,
      },
    },
    {
      title: 'Fibre (%)',
      dataIndex: 'fibre',
      key: 'fibre',
      sorter: {
        compare: (a, b) => a.fibre - b.fibre,
        multiple: 5,
      },
    }
  ]

}

export const FoodTable = () => {
  const { data, searchFilter } = useDataManager();
  const columns = renderColumns(searchFilter)
  return (
    <Table columns={columns} dataSource={data} />
  );
}
