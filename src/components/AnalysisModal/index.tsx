import React from 'react';
import { Modal, Tag, Descriptions } from 'antd';
import ReactMarkdown from 'react-markdown';
import type { FundAnalysis } from '../../types/analysis';
import { calculatePremiumRate } from '../../types/analysis';

interface AnalysisModalProps {
  visible: boolean;
  data: FundAnalysis | null;
  onClose: () => void;
}

const AnalysisModal: React.FC<AnalysisModalProps> = ({ visible, data, onClose }) => {
  if (!data) return null;

  const premiumRate = calculatePremiumRate(data.price, data.estimate_value);
  const isPositive = premiumRate > 0;

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <span>{data.title || `${data.fund_name}(${data.fund_code})`}</span>
          <Tag color={data.apply_status.includes('限') ? 'orange' : 'green'}>
            {data.apply_status}
          </Tag>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={700}
      className="analysis-modal"
    >
      {/* 基金信息摘要 */}
      <Descriptions 
        bordered 
        size="small" 
        column={{ xs: 2, sm: 4 }}
        className="mb-4"
      >
        <Descriptions.Item label="现价">
          <span className="font-medium">{data.price}</span>
        </Descriptions.Item>
        <Descriptions.Item label="T-1估值">
          <span>{data.estimate_value}</span>
        </Descriptions.Item>
        <Descriptions.Item label="溢价率">
          <span className={isPositive ? 'premium-positive' : 'premium-negative'}>
            {premiumRate.toFixed(2)}%
          </span>
        </Descriptions.Item>
        <Descriptions.Item label="净值日期">
          <span>{data.nav_dt}</span>
        </Descriptions.Item>
      </Descriptions>

      {/* AI 分析内容 */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-gray-700 font-medium mb-3 border-b pb-2">
          AI 分析报告
        </h4>
        <div className="markdown-content">
          <ReactMarkdown>{data.data || '暂无分析内容'}</ReactMarkdown>
        </div>
      </div>
    </Modal>
  );
};

export default AnalysisModal;
