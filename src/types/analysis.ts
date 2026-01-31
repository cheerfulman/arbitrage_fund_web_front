// 单个基金分析数据
export interface FundAnalysis {
  data: string;           // AI 分析内容 (Markdown)
  title: string;          // 标题，如 "国投白银LOF(161226)"
  fund_name: string;      // 基金名称
  fund_code: string;      // 基金代码
  nav_dt: string;         // 净值日期
  estimate_value: string; // T-1 估值
  price: string;          // 现价
  apply_status: string;   // 申购状态
}

// API 响应结构
export interface AnalysisResponse {
  status: string;
  date: string;
  count: number;
  data: FundAnalysis[];
}

// 触发分析响应
export interface TriggerResponse {
  status: string;
  message: string;
}

// 计算溢价率
export function calculatePremiumRate(price: string, estimateValue: string): number {
  const priceNum = parseFloat(price);
  const estimateNum = parseFloat(estimateValue);
  if (isNaN(priceNum) || isNaN(estimateNum) || estimateNum === 0) {
    return 0;
  }
  return ((priceNum - estimateNum) / estimateNum) * 100;
}
