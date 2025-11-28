import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { User, Settings as SettingsIcon, MapPin, Headphones, ChevronRight, Leaf } from 'lucide-react';
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
    { icon: Headphones, label: '联系客服', path: '#' }, // Placeholder
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header Profile Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
          <img src={CURRENT_USER.avatar} alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900">{CURRENT_USER.name}</h2>
          <p className="text-gray-500 text-sm">{CURRENT_USER.phone}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-400">积分余额</span>
          <span className="text-2xl font-bold text-primary">{CURRENT_USER.points}</span>
        </div>
      </div>

      {/* Stats Chart */}
      <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <Leaf size={18} className="text-primary" />
            回收趋势 (kg)
          </h3>
          <span className="text-xs text-gray-400">近半年</span>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#9CA3AF' }} 
              />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === data.length - 1 ? '#10B981' : '#D1FAE5'} />
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
            className="flex items-center justify-between p-4 border-b border-gray-50 last:border-none active:bg-gray-50 cursor-pointer"
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

      <div className="text-center text-gray-400 text-xs py-4">
        V1.0.0 EcoRecycle Inc.
      </div>
    </div>
  );
};

export default Profile;