import { create } from 'zustand';
import type { FundAnalysis } from '../types/analysis';

interface AnalysisState {
  // 数据
  date: string;
  fundList: FundAnalysis[];
  loading: boolean;
  error: string | null;
  
  // 弹窗状态
  modalVisible: boolean;
  selectedFund: FundAnalysis | null;
  
  // Actions
  setDate: (date: string) => void;
  setFundList: (list: FundAnalysis[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  openModal: (fund: FundAnalysis) => void;
  closeModal: () => void;
}

// 获取今天的日期 YYYY-MM-DD
const getTodayDate = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const useAnalysisStore = create<AnalysisState>((set) => ({
  // 初始状态
  date: getTodayDate(),
  fundList: [],
  loading: false,
  error: null,
  modalVisible: false,
  selectedFund: null,
  
  // Actions
  setDate: (date) => set({ date }),
  setFundList: (fundList) => set({ fundList }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  openModal: (fund) => set({ modalVisible: true, selectedFund: fund }),
  closeModal: () => set({ modalVisible: false, selectedFund: null }),
}));
