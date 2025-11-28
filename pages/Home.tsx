import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, FileText, Milk, Hammer, Shirt, Smartphone, Tv, MapPin, Bell, Leaf, Wind, Droplets, Lightbulb } from 'lucide-react';
import { CATEGORIES, MOCK_ORDERS } from '../services/mockService';
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
    <div className="p-4 space-y-6 bg-gradient-to-b from-emerald-50/50 to-gray-50 min-h-full">
      {/* Header */}
      <header className="flex justify-between items-center pt-2">
        <div className="flex items-center space-x-2">
          <div className="bg-white p-2 rounded-full shadow-sm border border-emerald-100">
            <MapPin size={18} className="text-primary" />
          </div>
          <div>
            <p className="text-xs text-gray-500">当前位置</p>
            <p className="text-sm font-bold text-gray-800 flex items-center">
              北京市朝阳区阳光小区...
            </p>
          </div>
        </div>
        <button className="relative p-2 bg-white rounded-full shadow-sm border border-emerald-100">
          <Bell size={20} className="text-emerald-700" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
      </header>

      {/* Banner */}
      <div className="bg-gradient-to-br from-primary to-emerald-600 rounded-3xl p-6 text-white shadow-xl shadow-emerald-200/50 relative overflow-hidden group">
        <div className="relative z-10">
          <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium mb-3 border border-white/10">
            🌱 绿色生活从今天开始
          </div>
          <h2 className="text-2xl font-bold mb-2 tracking-tight">上门回收，轻松环保</h2>
          <p className="text-emerald-50 text-sm mb-6 opacity-90">首单回收加赠 <span className="font-bold text-white text-lg">100</span> 积分</p>
          <button 
            onClick={() => navigate('/schedule')}
            className="bg-white text-primary px-6 py-2.5 rounded-full text-sm font-bold shadow-lg active:scale-95 transition-all flex items-center space-x-2"
          >
            <span>立即预约</span>
            <ArrowRight size={16} />
          </button>
        </div>
        {/* Decorative Background Elements */}
        <div className="absolute -right-4 -bottom-8 opacity-20 transform rotate-12 transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110">
           <Leaf size={140} />
        </div>
        <div className="absolute top-4 right-10 opacity-10">
           <Wind size={40} />
        </div>
        <div className="absolute bottom-10 left-1/3 opacity-10">
           <Droplets size={30} />
        </div>
      </div>

      {/* Categories */}
      <section>
        <div className="flex justify-between items-end mb-4">
          <h3 className="font-bold text-gray-800 text-lg flex items-center">
            <span className="w-1.5 h-5 bg-primary rounded-full mr-2"></span>
            回收分类
          </h3>
          <button onClick={() => navigate('/guide')} className="text-xs text-gray-400 hover:text-primary flex items-center">
            查看指南 <ArrowRight size={12} className="ml-1"/>
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {CATEGORIES.map((cat) => (
            <div 
              key={cat.id}
              onClick={() => navigate('/schedule')}
              className="bg-white p-4 rounded-2xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col items-center justify-center space-y-3 active:scale-95 transition-all hover:border-emerald-100"
            >
              <div className="bg-gray-50 p-3 rounded-2xl group-hover:bg-emerald-50 transition-colors">
                {getIcon(cat.icon)}
              </div>
              <span className="text-sm font-medium text-gray-700">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Daily Eco Tip */}
      <section className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-4 border border-teal-100 flex items-start space-x-3">
        <div className="bg-white p-2 rounded-full shadow-sm text-yellow-500 mt-1">
          <Lightbulb size={20} fill="currentColor" />
        </div>
        <div>
          <h4 className="text-emerald-800 font-bold text-sm mb-1">每日环保小知识</h4>
          <p className="text-xs text-emerald-600 leading-relaxed">
            回收一个铝罐节省的能量足以让电视机运行3小时。每一次投递都在为地球减负！
          </p>
        </div>
      </section>

      {/* Recent Order */}
      <section>
        <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center">
            <span className="w-1.5 h-5 bg-primary rounded-full mr-2"></span>
            最近订单
        </h3>
        {recentOrder ? (
           <div 
             onClick={() => navigate('/orders')}
             className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center relative overflow-hidden"
           >
             <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-50 rounded-bl-full -mr-8 -mt-8 z-0"></div>
             <div className="flex items-center space-x-4 z-10">
               <div className="bg-blue-50 p-3 rounded-xl">
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
             <div className="flex items-center space-x-2 z-10">
                {recentOrder.status === OrderStatus.COMPLETED && (
                    <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-lg">
                        +1.2kg 碳减排
                    </span>
                )}
                <ArrowRight size={18} className="text-gray-400" />
             </div>
           </div>
        ) : (
          <div className="bg-white p-6 rounded-xl text-center text-gray-400 text-sm border border-dashed border-gray-200">
            暂无订单记录
          </div>
        )}
      </section>
      
      {/* Environmental Impact Stats */}
      <section className="pb-6">
          <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center">
            <span className="w-1.5 h-5 bg-primary rounded-full mr-2"></span>
            环保贡献
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-50 flex flex-col justify-between h-28 relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-2 translate-y-2">
                    <Wind size={60} className="text-emerald-500" />
                </div>
                <div className="text-xs text-gray-500 font-medium">累计碳减排</div>
                <div>
                    <span className="text-2xl font-bold text-gray-800">12.5</span>
                    <span className="text-xs text-gray-500 ml-1">kg</span>
                </div>
                <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-2/3 rounded-full"></div>
                </div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-50 flex flex-col justify-between h-28 relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-2 translate-y-2">
                    <Leaf size={60} className="text-emerald-500" />
                </div>
                <div className="text-xs text-gray-500 font-medium">相当于植树</div>
                <div>
                    <span className="text-2xl font-bold text-gray-800">0.5</span>
                    <span className="text-xs text-gray-500 ml-1">棵</span>
                </div>
                 <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-1/4 rounded-full"></div>
                </div>
            </div>
          </div>
      </section>
    </div>
  );
};

export default Home;