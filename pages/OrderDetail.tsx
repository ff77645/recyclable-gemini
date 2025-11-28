import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Package, Clock, Phone, AlertCircle, CheckCircle, Leaf } from 'lucide-react';
import { getOrderById, cancelOrder, CATEGORIES } from '../services/mockService';
import { Order, OrderStatus } from '../types';

const OrderDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) loadOrder(id);
  }, [id]);

  const loadOrder = async (orderId: string) => {
    setLoading(true);
    const data = await getOrderById(orderId);
    setOrder(data || null);
    setLoading(false);
  };

  const handleCancel = async () => {
    if (window.confirm('确定要取消该订单吗？')) {
      if (id) {
        await cancelOrder(id);
        loadOrder(id);
      }
    }
  };

  const getCategoryName = (id: string) => CATEGORIES.find(c => c.id === id)?.name || id;

  const steps = [
    { status: OrderStatus.PENDING, label: '待接单' },
    { status: OrderStatus.ACCEPTED, label: '已接单' }, // Map In_Progress visually here or separate
    { status: OrderStatus.IN_PROGRESS, label: '上门中' },
    { status: OrderStatus.COMPLETED, label: '已完成' },
  ];

  if (loading) return <div className="p-10 text-center text-gray-500">加载中...</div>;
  if (!order) return <div className="p-10 text-center text-gray-500">订单不存在</div>;

  const currentStepIndex = steps.findIndex(s => s.status === order.status);
  const isCancelled = order.status === OrderStatus.CANCELLED;
  const isCompleted = order.status === OrderStatus.COMPLETED;

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 shadow-sm z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">订单详情</h1>
        <div className="w-8"></div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* Status Card */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
            {isCancelled ? (
                <div className="flex flex-col items-center text-red-500 py-2">
                    <AlertCircle size={40} className="mb-2" />
                    <span className="font-bold text-lg">订单已取消</span>
                </div>
            ) : (
                <>
                    {isCompleted ? (
                        <div className="mb-6 bg-emerald-50 rounded-xl p-4 border border-emerald-100 flex items-center space-x-3">
                            <div className="bg-emerald-100 p-2 rounded-full">
                                <Leaf size={24} className="text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="text-emerald-800 font-bold text-sm">感谢您的环保行动！</h3>
                                <p className="text-emerald-600 text-xs mt-0.5">本次回收减少碳排放约 <span className="font-bold">2.3kg</span></p>
                            </div>
                        </div>
                    ) : (
                         <div className="flex items-center justify-between mb-6 relative">
                            {/* Progress Bar Background */}
                            <div className="absolute top-3 left-0 w-full h-1 bg-gray-100 -z-0"></div>
                            {/* Current Progress */}
                            {currentStepIndex >= 0 && (
                                <div 
                                    className="absolute top-3 left-0 h-1 bg-primary -z-0 transition-all duration-500"
                                    style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                                ></div>
                            )}
                            
                            {steps.map((step, idx) => {
                                const isCompletedStep = currentStepIndex >= idx;
                                const isCurrent = currentStepIndex === idx;
                                return (
                                    <div key={step.status} className="relative z-10 flex flex-col items-center">
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 bg-white ${
                                            isCompletedStep ? 'border-primary text-primary' : 'border-gray-200 text-gray-300'
                                        }`}>
                                            <div className={`w-3 h-3 rounded-full ${isCompletedStep ? 'bg-primary' : 'bg-transparent'}`}></div>
                                        </div>
                                        <span className={`text-xs mt-2 ${isCurrent ? 'font-bold text-gray-800' : 'text-gray-400'}`}>
                                            {step.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    
                    <div className="text-center">
                        <h2 className="text-xl font-bold text-gray-800">
                            {order.status === OrderStatus.PENDING ? '等待回收员接单' : 
                             order.status === OrderStatus.ACCEPTED ? '回收员已接单' :
                             order.status === OrderStatus.IN_PROGRESS ? '回收员上门中' : '订单已完成'}
                        </h2>
                        {!isCompleted && (
                            <p className="text-sm text-gray-500 mt-1">预计上门：{new Date(order.appointmentTime).toLocaleString()}</p>
                        )}
                    </div>
                </>
            )}
        </div>

        {/* Address Card */}
        <div className="bg-white rounded-xl p-4 shadow-sm flex items-start space-x-3">
            <MapPin className="text-primary mt-1 flex-shrink-0" size={20} />
            <div>
                <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-800">{order.address.contactName}</span>
                    <span className="text-gray-500">{order.address.contactPhone}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{order.address.detail}</p>
            </div>
        </div>

        {/* Items Card */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-3 border-b border-gray-50 pb-2">物品信息</h3>
            <div className="flex space-x-4 mb-4">
                 <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {order.imageUrls.length > 0 ? (
                        <img src={order.imageUrls[0]} alt="废品" className="w-full h-full object-cover" />
                    ) : (
                        <Package className="text-gray-400" size={24} />
                    )}
                 </div>
                 <div className="space-y-1">
                     <p className="text-sm text-gray-500">
                        分类: <span className="text-gray-800 font-medium">{order.categoryIds.map(getCategoryName).join(', ')}</span>
                     </p>
                     <p className="text-sm text-gray-500">
                        数量: <span className="text-gray-800 font-medium">{order.quantity}</span>
                     </p>
                 </div>
            </div>
            <div className="bg-gray-50 p-3 rounded text-xs text-gray-500">
                <span className="font-bold">备注：</span> {order.address.detail ? '无特殊备注' : '无'} 
            </div>
        </div>

        {/* Recycler Info */}
        {order.recycler && (
            <div className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-3 border-b border-gray-50 pb-2">回收员信息</h3>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                            {order.recycler.name[0]}
                        </div>
                        <div>
                            <p className="font-bold text-gray-800">{order.recycler.name}</p>
                            <div className="flex items-center space-x-1 text-xs text-yellow-500">
                                <span>★</span><span>{order.recycler.rating}</span>
                            </div>
                        </div>
                    </div>
                    <a href={`tel:${order.recycler.phone}`} className="p-2 bg-primary/10 rounded-full text-primary">
                        <Phone size={20} />
                    </a>
                </div>
            </div>
        )}

        {/* Info */}
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-2 text-xs text-gray-500">
            <div className="flex justify-between">
                <span>订单编号</span>
                <span className="text-gray-800">{order.id}</span>
            </div>
            <div className="flex justify-between">
                <span>下单时间</span>
                <span className="text-gray-800">{new Date(order.createTime).toLocaleString()}</span>
            </div>
        </div>

        {/* Actions */}
        {order.status === OrderStatus.PENDING && (
            <div className="pt-4">
                <button 
                    onClick={handleCancel}
                    className="w-full bg-white border border-gray-300 text-gray-600 font-bold py-3 rounded-full shadow-sm active:bg-gray-50"
                >
                    取消订单
                </button>
            </div>
        )}
        
      </div>
    </div>
  );
};

export default OrderDetail;