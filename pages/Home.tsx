import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, FileText, Milk, Hammer, Shirt, Smartphone, Tv, MapPin, Bell } from 'lucide-react';
import { CATEGORIES, CURRENT_USER, MOCK_ORDERS } from '../services/mockService';
import { OrderStatus } from '../types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const recentOrder = MOCK_ORDERS[0]; // Just taking the first one for demo

  const getIcon = (name: string) => {
    switch (name) {
      case 'FileText': return <FileText size={24} className="text-blue-500" />;
      case 'Milk': return <Milk size={24} className="text-teal-500" />;
      case 'Hammer': return <Hammer size={24} className="text-gray-500" />;
      case 'Shirt': return <Shirt size={24} className="text-purple-500" />;
      case 'Smartphone': return <Smartphone size={24} className="text-indigo-500" />;
      case 'Tv': return <Tv size={24} className="text-orange-500" />;
      default: return <FileText size={24} />;
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <header className="flex justify-between items-center pt-2">
        <div className="flex items-center space-x-2">
          <div className="bg-primary/10 p-2 rounded-full">
            <MapPin size={18} className="text-primary" />
          </div>
          <div>
            <p className="text-xs text-gray-500">当前位置</p>
            <p className="text-sm font-bold text-gray-800">北京市朝阳区阳光小区...</p>
          </div>
        </div>
        <button className="relative p-2">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
      </header>

      {/* Banner */}
      <div className="bg-gradient-to-r from-primary to-emerald-400 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-1">上门回收，轻松环保</h2>
          <p className="text-emerald-50 text-sm mb-4">首单回收加赠 100 积分</p>
          <button 
            onClick={() => navigate('/schedule')}
            className="bg-white text-primary px-4 py-2 rounded-full text-sm font-semibold shadow-sm active:scale-95 transition-transform"
          >
            立即预约
          </button>
        </div>
        <div className="absolute right-[-20px] bottom-[-30px] opacity-20 transform rotate-12">
           <FileText size={120} />
        </div>
      </div>

      {/* Categories */}
      <section>
        <div className="flex justify-between items-end mb-3">
          <h3 className="font-bold text-gray-800 text-lg">回收分类</h3>
          <button onClick={() => navigate('/guide')} className="text-xs text-gray-400 hover:text-primary">查看指南 &gt;</button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {CATEGORIES.map((cat) => (
            <div 
              key={cat.id}
              onClick={() => navigate('/schedule')}
              className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center justify-center space-y-2 active:bg-gray-50 border border-gray-100"
            >
              <div className="bg-gray-50 p-3 rounded-full">
                {getIcon(cat.icon)}
              </div>
              <span className="text-sm font-medium text-gray-700">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Order */}
      <section>
        <h3 className="font-bold text-gray-800 text-lg mb-3">最近订单</h3>
        {recentOrder ? (
           <div 
             onClick={() => navigate('/orders')}
             className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center"
           >
             <div className="flex items-center space-x-4">
               <div className="bg-blue-50 p-3 rounded-lg">
                 <FileText size={24} className="text-blue-500" />
               </div>
               <div>
                 <p className="font-bold text-gray-800">
                    {recentOrder.status === OrderStatus.COMPLETED ? '回收完成' : '等待接单'}
                 </p>
                 <p className="text-xs text-gray-500 mt-1">
                    {new Date(recentOrder.appointmentTime).toLocaleDateString()} 上门
                 </p>
               </div>
             </div>
             <ArrowRight size={18} className="text-gray-400" />
           </div>
        ) : (
          <div className="bg-white p-6 rounded-xl text-center text-gray-400 text-sm border border-dashed border-gray-200">
            暂无订单记录
          </div>
        )}
      </section>
      
      {/* Stats Teaser */}
      <section className="bg-light rounded-xl p-4 flex items-center justify-between border border-emerald-100">
          <div>
            <p className="text-xs text-emerald-600 font-medium">环保贡献</p>
            <p className="text-lg font-bold text-emerald-800">已减少碳排放 12.5kg</p>
          </div>
          <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-sm">
            <span className="text-lg">🌿</span>
          </div>
      </section>
    </div>
  );
};

export default Home;