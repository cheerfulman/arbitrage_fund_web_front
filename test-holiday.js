// 简单测试chinese-days库是否能在浏览器环境中正常工作
try {
  console.log('Testing chinese-days import...');
  const { isHoliday } = require('chinese-days');
  
  console.log('Testing if 2026-01-28 is holiday:', isHoliday('2026-01-28'));
  console.log('Testing if 2026-02-02 is holiday (Spring Festival):', isHoliday('2026-02-02'));
  
  console.log('Test completed successfully');
} catch (error) {
  console.error('Error testing chinese-days:', error.message);
}