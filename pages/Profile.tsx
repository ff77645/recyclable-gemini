import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { User, Settings as SettingsIcon, MapPin, Headphones, ChevronRight, Leaf, Wind, Zap, Award, TreeDeciduous } from 'lucide-react';
import { CURRENT_USER } from '../services/mockService';

const data = [
  { name: '1月', value: 10 },
  { name: '2月', value: 15 },
  { name: '3月', value: 8 },
  { name: '4月', value: 25 },
  { name: '5月', value: 18 },
  { name: '6月', value: 30 },
];

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: MapPin, label: '地址管理', path: '/addresses' },
    { icon: SettingsIcon, label: '系统设置', path: '/settings' },
    { icon: Headphones, label: '联系客服', path: '#' },
  ];

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-full pb-20">
      {/* Header Profile Card */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-4 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>

        <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-md relative z-10">
          <img src={CURRENT_USER.avatar} alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 relative z-10">
          <h2 className="text-xl font-bold text-gray-900">{CURRENT_USER.name}</h2>
          <div className="flex items-center space-x-2 mt-1">
             <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center border border-emerald-200">
                <Award size={10} className="mr-1" />
                环保达人 LV.3
             </span>
             <span className="text-gray-400 text-xs">{CURRENT_USER.phone}</span>
          </div>
        </div>
        <div className="flex flex-col items-end relative z-10">
          <span className="text-xs text-gray-400 mb-0.5">积分余额</span>
          <span className="text-2xl font-bold text-primary">{CURRENT_USER.points}</span>
        </div>
      </div>

      {/* My Green Impact Dashboard */}
      <section>
          <h3 className="font-bold text-gray-800 text-lg mb-3 flex items-center">
            <span className="w-1.5 h-5 bg-primary rounded-full mr-2"></span>
            我的绿色影响力
          </h3>
          <div className="grid grid-cols-3 gap-3">
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-emerald-50 flex flex-col items-center justify-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                      <Wind size={20} />
                  </div>
                  <div className="text-center">
                      <div className="text-sm font-bold text-gray-800">12.5kg</div>
                      <div className="text-[10px] text-gray-400">碳减排</div>
                  </div>
              </div>
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-emerald-50 flex flex-col items-center justify-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-500">
                      <Zap size={20} />
                  </div>
                  <div className="text-center">
                      <div className="text-sm font-bold text-gray-800">45kW</div>
                      <div className="text-[10px] text-gray-400">节约能源</div>
                  </div>
              </div>
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-emerald-50 flex flex-col items-center justify-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                      <TreeDeciduous size={20} />
                  </div>
                  <div className="text-center">
                      <div className="text-sm font-bold text-gray-800">0.5棵</div>
                      <div className="text-[10px] text-gray-400">相当于植树</div>
                  </div>
              </div>
          </div>
      </section>

      {/* Stats Chart */}
      <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <Leaf size={18} className="text-primary" />
            回收趋势 (kg)
          </h3>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">近半年</span>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barSize={20}>
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#9CA3AF' }} 
                dy={10}
              />
              <Tooltip 
                cursor={{fill: '#ECFDF5'}}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontSize: '12px' }}
              />
              <Bar dataKey="value" radius={[10, 10, 10, 10]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === data.length - 1 ? '#10B981' : '#E5E7EB'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Menu List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {menuItems.map((item, idx) => (
          <div 
            key={idx}
            onClick={() => item.path !== '#' && navigate(item.path)}
            className="flex items-center justify-between p-4 border-b border-gray-50 last:border-none active:bg-gray-50 cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
                <item.icon size={20} />
              </div>
              <span className="font-medium text-gray-700">{item.label}</span>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center space-x-2 py-4 opacity-50">
         <Leaf size={14} className="text-emerald-500" />
         <span className="text-xs text-gray-400 font-medium">EcoRecycle - 让地球更绿一点</span>
      </div>
    </div>
  );
};

export default Profile;