import { useCallback } from 'react';
import { message } from 'antd';
import { useAnalysisStore } from '../store/analysisStore';
import { getAnalysisByDate, triggerAnalysis } from '../api/analysis';

export const useAnalysis = () => {
  const { 
    date, 
    setDate, 
    setFundList, 
    setLoading, 
    setError 
  } = useAnalysisStore();

  // 获取分析数据
  const fetchAnalysis = useCallback(async (targetDate?: string) => {
    const queryDate = targetDate || date;
    setLoading(true);
    setError(null);
    
    try {
      const response = await getAnalysisByDate(queryDate);
      if (response.status === 'success') {
        setFundList(response.data || []);
        if (targetDate) {
          setDate(targetDate);
        }
      } else {
        setFundList([]);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '获取数据失败';
      setError(errorMessage);
      message.error(errorMessage);
      setFundList([]);
    } finally {
      setLoading(false);
    }
  }, [date, setDate, setFundList, setLoading, setError]);

  // 手动触发分析
  const handleTriggerAnalysis = useCallback(async () => {
    try {
      const response = await triggerAnalysis();
      if (response.status === 'success') {
        message.success(response.message || '分析任务已开始执行');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '触发分析失败';
      message.error(errorMessage);
    }
  }, []);

  return {
    fetchAnalysis,
    handleTriggerAnalysis,
  };
};
