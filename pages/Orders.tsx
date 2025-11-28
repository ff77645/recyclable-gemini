import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrders, cancelOrder } from '../services/mockService';
import { Order, OrderStatus } from '../types';
import { Package, Clock, User, ChevronRight, Phone } from 'lucide-react';

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<OrderStatus | -1>(-1); // -1 for All
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const data = await getOrders();
    setOrders(data);
    setLoading(false);
  };

  const handleCancel = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('确认取消订单？')) {
        await cancelOrder(id);
        fetchOrders();
    }
  };

  const tabs = [
    { label: '全部', value: -1 },
    { label: '待接单', value: OrderStatus.PENDING },
    { label: '进行中', value: OrderStatus.ACCEPTED }, // Merge Accepted and In Progress for simplicity
    { label: '已完成', value: OrderStatus.COMPLETED },
  ];

  const filteredOrders = activeTab === -1 
    ? orders 
    : activeTab === OrderStatus.ACCEPTED 
        ? orders.filter(o => o.status === OrderStatus.ACCEPTED || o.status === OrderStatus.IN_PROGRESS)
        : orders.filter(o => o.status === activeTab);

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-medium">待接单</span>;
      case OrderStatus.ACCEPTED:
      case OrderStatus.IN_PROGRESS:
        return <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">进行中</span>;
      case OrderStatus.COMPLETED:
        return <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full font-medium">已完成</span>;
      case OrderStatus.CANCELLED:
        return <span className="bg-red-50 text-red-500 text-xs px-2 py-1 rounded-full font-medium">已取消</span>;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <header className="bg-white pt-4 pb-0 px-4 sticky top-0 z-10 shadow-sm">
        <h1 className="text-xl font-bold mb-4">订单中心</h1>
        <div className="flex overflow-x-auto no-scrollbar space-x-6">
          {tabs.map(tab => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`pb-3 whitespace-nowrap text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.value 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <div className="p-4 space-y-4 flex-1 overflow-y-auto bg-gray-50">
        {loading ? (
           <div className="text-center text-gray-400 mt-10">加载中...</div> 
        ) : filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <Package size={48} className="mb-2 opacity-20" />
            <p>暂无相关订单</p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div 
                key={order.id} 
                onClick={() => navigate(`/orders/${order.id}`)}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 active:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start mb-3 border-b border-gray-50 pb-3">
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                   <Clock size={14} />
                   <span>{new Date(order.createTime).toLocaleString()}</span>
                </div>
                {getStatusBadge(order.status)}
              </div>

              <div className="flex space-x-4 mb-4">
                 <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {order.imageUrls.length > 0 ? (
                        <img src={order.imageUrls[0]} alt="废品" className="w-full h-full object-cover" />
                    ) : (
                        <Package className="text-gray-400" />
                    )}
                 </div>
                 <div className="flex-1">
                    <h3 className="font-bold text-gray-800">
                      {order.categoryIds.length} 类物品回收
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      预估: {order.quantity} | 上门: {new Date(order.appointmentTime).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-400 mt-2 truncate w-48">
                      {order.address.detail}
                    </p>
                 </div>
              </div>

              {/* Recycler Info if assigned */}
              {order.recycler && (
                <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <User size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">{order.recycler.name}</p>
                      <p className="text-[10px] text-gray-500">评分 {order.recycler.rating}</p>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); window.location.href=`tel:${order.recycler?.phone}`; }}
                    className="p-2 bg-white rounded-full shadow-sm text-primary"
                  >
                    <Phone size={16} />
                  </button>
                </div>
              )}

              <div className="flex justify-end space-x-3">
                {order.status === OrderStatus.PENDING && (
                  <button 
                    onClick={(e) => handleCancel(e, order.id)}
                    className="px-3 py-1.5 text-xs border border-gray-300 rounded-full text-gray-600 active:bg-gray-100"
                  >
                    取消订单
                  </button>
                )}
                <button 
                    className="px-3 py-1.5 text-xs border border-primary text-primary rounded-full font-medium"
                >
                  查看详情
                </button>
              </div>
            </div>
          ))
        )}
        <div className="h-12"></div> {/* Spacer for bottom nav */}
      </div>
    </div>
  );
};

export default Orders;