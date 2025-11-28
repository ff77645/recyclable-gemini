import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, LogOut, FileText, Shield, Info } from 'lucide-react';

const Settings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 shadow-sm z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">系统设置</h1>
        <div className="w-8"></div>
      </header>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
           <div className="p-4 flex items-center justify-between border-b border-gray-50 active:bg-gray-50 cursor-pointer">
              <div className="flex items-center space-x-3">
                 <Shield size={18} className="text-gray-500" />
                 <span className="text-gray-700 font-medium">隐私政策</span>
              </div>
              <ChevronRight size={18} className="text-gray-300" />
           </div>
           <div className="p-4 flex items-center justify-between border-b border-gray-50 active:bg-gray-50 cursor-pointer">
              <div className="flex items-center space-x-3">
                 <FileText size={18} className="text-gray-500" />
                 <span className="text-gray-700 font-medium">用户协议</span>
              </div>
              <ChevronRight size={18} className="text-gray-300" />
           </div>
           <div className="p-4 flex items-center justify-between active:bg-gray-50 cursor-pointer">
              <div className="flex items-center space-x-3">
                 <Info size={18} className="text-gray-500" />
                 <span className="text-gray-700 font-medium">关于我们</span>
              </div>
              <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400">V1.0.0</span>
                  <ChevronRight size={18} className="text-gray-300" />
              </div>
           </div>
        </div>

        <button className="w-full bg-white rounded-xl p-4 text-red-500 font-medium shadow-sm border border-gray-100 flex items-center justify-center space-x-2 active:bg-gray-50">
            <LogOut size={18} />
            <span>退出登录</span>
        </button>
      </div>
    </div>
  );
};

export default Settings;