import apiClient from './index';
import type { AnalysisResponse, TriggerResponse } from '../types/analysis';

// 获取指定日期的分析结果
export const getAnalysisByDate = (date: string): Promise<AnalysisResponse> => {
  return apiClient.get(`/ai-analyses/${date}`);
};

// 手动触发分析任务
export const triggerAnalysis = (): Promise<TriggerResponse> => {
  return apiClient.post('/trigger-analysis');
};
