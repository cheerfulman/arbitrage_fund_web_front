#!/usr/bin/env node

// 简单的脚本，用于生成或检查favicon
import fs from 'fs';

// 检查当前favicon文件
const faviconPath = './public/favicon.ico';
console.log('检查当前favicon文件...');

if (fs.existsSync(faviconPath)) {
  const stats = fs.statSync(faviconPath);
  console.log(`文件大小: ${stats.size} 字节 (${Math.round(stats.size/1024)} KB)`);
  
  // 如果文件过大，提示用户
  if (stats.size > 100 * 1024) { // 大于100KB
    console.log('警告: favicon文件过大，建议使用较小的图标文件');
  }
} else {
  console.log('favicon文件不存在');
}