import React from 'react';
import { Table, Tag, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EyeOutlined } from '@ant-design/icons';
import type { FundAnalysis } from '../../types/analysis';
import { calculatePremiumRate } from '../../types/analysis';

interface FundTableProps {
  data: FundAnalysis[];
  loading: boolean;
  onViewAnalysis: (record: FundAnalysis) => void;
}

const FundTable: React.FC<FundTableProps> = ({ data, loading, onViewAnalysis }) => {
  const columns: ColumnsType<FundAnalysis> = [
    {
      title: '标的',
      dataIndex: 'fund_name',
      key: 'fund_name',
      width: 160,
      fixed: 'left',
      render: (text: string, record: FundAnalysis) => (
        <div>
          <div className="font-medium text-gray-900">{text}</div>
          <div className="text-gray-500 text-xs mt-1">{record.fund_code}</div>
          <Tag 
            color={record.apply_status.includes('限') ? 'orange' : 'green'}
            className="mt-1 text-xs"
          >
            {record.apply_status}
          </Tag>
        </div>
      ),
    },
    {
      title: '现价',
      dataIndex: 'price',
      key: 'price',
      width: 80,
      align: 'center',
      render: (text: string) => (
        <span className="font-medium">{text}</span>
      ),
    },
    {
      title: 'T-1估值',
      dataIndex: 'estimate_value',
      key: 'estimate_value',
      width: 90,
      align: 'center',
      render: (text: string) => (
        <span className="text-gray-600">{text}</span>
      ),
    },
    {
      title: '溢价率',
      key: 'premium_rate',
      width: 90,
      align: 'center',
      sorter: (a, b) => {
        const rateA = calculatePremiumRate(a.price, a.estimate_value);
        const rateB = calculatePremiumRate(b.price, b.estimate_value);
        return rateB - rateA;
      },
      defaultSortOrder: 'descend',
      render: (_: unknown, record: FundAnalysis) => {
        const rate = calculatePremiumRate(record.price, record.estimate_value);
        const isPositive = rate > 0;
        return (
          <span className={isPositive ? 'premium-positive' : 'premium-negative'}>
            {rate.toFixed(2)}%
          </span>
        );
      },
    },
    {
      title: 'AI分析',
      key: 'action',
      width: 80,
      align: 'center',
      fixed: 'right',
      render: (_: unknown, record: FundAnalysis) => (
        <Button
          type="primary"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => onViewAnalysis(record)}
          className="cursor-pointer"
        >
          查看
        </Button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="fund_code"
      loading={loading}
      pagination={false}
      scroll={{ x: 500 }}
      size="middle"
      className="bg-white rounded-lg shadow-sm"
    />
  );
};

export default FundTable;
