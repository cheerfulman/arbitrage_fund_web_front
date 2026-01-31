import React from 'react';
import { Layout as AntLayout } from 'antd';

const { Header, Content, Footer } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AntLayout className="min-h-screen">
      <Header className="bg-white shadow-sm flex items-center justify-center px-4 h-16">
        <h1 className="text-xl font-semibold text-gray-800 m-0">
          智套小工具
        </h1>
      </Header>
      
      <Content className="p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </Content>
      
      <Footer className="bg-gray-50 text-center text-gray-500 text-sm py-4">
        <div className="max-w-4xl mx-auto px-4">
          <p className="font-medium text-gray-600 mb-2">温馨提示：</p>
          <ol className="text-left list-decimal list-inside space-y-1">
            <li>数据仅供参考，不构成投资建议！</li>
            <li>数据有一定的延时性，请关注更新时间！</li>
            <li>估值可能会有一定的误差，请谨慎参考！</li>
          </ol>
        </div>
      </Footer>
    </AntLayout>
  );
};

export default Layout;
