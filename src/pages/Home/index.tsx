import React, { useEffect } from 'react';
import { DatePicker, Button, Empty, Spin } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useAnalysisStore } from '../../store/analysisStore';
import { useAnalysis } from '../../hooks/useAnalysis';
import FundTable from '../../components/FundTable';
import AnalysisModal from '../../components/AnalysisModal';
import type { FundAnalysis } from '../../types/analysis';

const Home: React.FC = () => {
  const {
    date,
    fundList,
    loading,
    error,
    modalVisible,
    selectedFund,
    openModal,
    closeModal,
  } = useAnalysisStore();

  const { fetchAnalysis } = useAnalysis();

  // 初始加载
  useEffect(() => {
    fetchAnalysis();
  }, []);

  // 日期变更
  const handleDateChange = (value: dayjs.Dayjs | null) => {
    if (value) {
      const newDate = value.format('YYYY-MM-DD');
      fetchAnalysis(newDate);
    }
  };

  // 刷新数据
  const handleRefresh = () => {
    fetchAnalysis();
  };

  // 查看分析
  const handleViewAnalysis = (record: FundAnalysis) => {
    openModal(record);
  };

  return (
    <div className="space-y-4">
      {/* 操作栏 */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">更新时间：</span>
            <DatePicker
              value={dayjs(date)}
              onChange={handleDateChange}
              allowClear={false}
              className="w-40"
            />
          </div>
          
          <Button
            icon={<ReloadOutlined />}
            onClick={handleRefresh}
            loading={loading}
            className="cursor-pointer"
          >
            刷新
          </Button>
        </div>
      </div>

      {/* 数据展示区域 */}
      {error ? (
        <div className="bg-white rounded-lg shadow-sm p-8">
          <Empty
            description={error}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button type="primary" onClick={handleRefresh}>
              重试
            </Button>
          </Empty>
        </div>
      ) : loading && fundList.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 flex justify-center">
          <Spin size="large" tip="加载中..." />
        </div>
      ) : fundList.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8">
          <Empty description="暂无数据" />
        </div>
      ) : (
        <FundTable
          data={fundList}
          loading={loading}
          onViewAnalysis={handleViewAnalysis}
        />
      )}

      {/* AI 分析弹窗 */}
      <AnalysisModal
        visible={modalVisible}
        data={selectedFund}
        onClose={closeModal}
      />
    </div>
  );
};

export default Home;
