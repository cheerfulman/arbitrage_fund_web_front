import React, { useEffect } from 'react';
import { DatePicker, Button, Empty, Spin } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import chineseDays from 'chinese-days';
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

  // 检查是否为非工作日（周末或节假日）
  const isNonWorkingDay = (current: dayjs.Dayjs): boolean => {
    // 限制不能选择2026-01-28之前的日期
    if (current.isBefore(dayjs('2026-01-28'), 'day')) {
      return true;
    }
    
    // 使用 chinese-days 库判断是否为节假日
    const dateStr = current.format('YYYY-MM-DD');
    if (chineseDays.isHoliday(dateStr)) {
      return true;
    }
    
    // 检查是否为周末（周六或周日）
    const dayOfWeek = current.day(); // 0为周日，1-6为周一到周六
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return true;
    }
    
    return false;
  };

  // 找到最近的工作日
  const findLastWorkingDay = (startDate: dayjs.Dayjs): dayjs.Dayjs => {
    let currentDate = startDate;
    while (isNonWorkingDay(currentDate)) {
      currentDate = currentDate.subtract(1, 'day');
      // 如果回退到2026-01-28之前，则返回2026-01-28（如果它是工作日）
      if (currentDate.isBefore(dayjs('2026-01-28'), 'day')) {
        currentDate = dayjs('2026-01-28');
        // 如果2026-01-28不是工作日，继续向前找
        while (isNonWorkingDay(currentDate)) {
          if (currentDate.isSame(dayjs('2026-01-28'), 'day')) {
            // 如果2026-01-28本身就是非工作日，返回null或处理这种情况
            // 实际上，2026-01-28是周四，应该是工作日
            break;
          }
          currentDate = currentDate.subtract(1, 'day');
          if (currentDate.isBefore(dayjs('2026-01-28'), 'day')) {
            // 如果找不到工作日，返回2026-01-28
            return dayjs('2026-01-28');
          }
        }
        break;
      }
    }
    return currentDate;
  };

    // 初始加载
  useEffect(() => {
    // 如果当前日期是周末或节假日，自动调整到最近的上一个工作日
    const currentDate = dayjs();
    if (isNonWorkingDay(currentDate)) {
      const lastWorkingDay = findLastWorkingDay(currentDate);
      fetchAnalysis(lastWorkingDay.format('YYYY-MM-DD'));
    } else {
      fetchAnalysis();
    }
  }, []);

  // 日期变更
  const handleDateChange = (value: dayjs.Dayjs | null) => {
    if (value) {
      // 如果选择的日期是非工作日，自动调整到最近的上一个工作日
      if (isNonWorkingDay(value)) {
        const lastWorkingDay = findLastWorkingDay(value);
        fetchAnalysis(lastWorkingDay.format('YYYY-MM-DD'));
      } else {
        const newDate = value.format('YYYY-MM-DD');
        fetchAnalysis(newDate);
      }
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
              disabledDate={isNonWorkingDay}
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
