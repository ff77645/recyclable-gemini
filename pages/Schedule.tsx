
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Camera, MapPin, ChevronRight, Calendar, Clock, Scale, AlertCircle } from 'lucide-react';
import { CATEGORIES, getAddresses, createOrder } from '../services/mockService';
import { Address, OrderStatus } from '../types';

const steps = ['分类', '信息', '时间', '地址'];

const QUICK_QUANTITY_TAGS = ['约 1-3 kg', '约 5 kg', '1-2 袋', '3-5 袋', '少量', '大量'];

const Schedule: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  
  // Form State
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [quantity, setQuantity] = useState('');
  const [remark, setRemark] = useState('');
  const [selectedDate, setSelectedDate] = useState('today'); // 'today' | 'tomorrow' | 'future'
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    const data = await getAddresses();
    setAddresses(data);
    const defaultAddr = data.find(a => a.isDefault);
    if (defaultAddr) setSelectedAddress(defaultAddr);
  };

  const handleNext = () => {
    if (isNextDisabled()) return;
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigate(-1);
    }
  };

  const handleSubmit = async () => {
    if (!selectedAddress) return;
    setLoading(true);
    
    const date = new Date();
    if (selectedDate === 'tomorrow') date.setDate(date.getDate() + 1);
    if (selectedDate === 'future') date.setDate(date.getDate() + 2);
    // Simple mock time setting
    const hour = parseInt(selectedTime.split(':')[0], 10);
    if (!isNaN(hour)) date.setHours(hour);
    date.setMinutes(0);

    const newOrder = {
        id: `ord_${Date.now()}`,
        userId: 'u123',
        categoryIds: selectedCats,
        quantity: quantity,
        imageUrls: ['https://picsum.photos/200/200'], // Mock image
        appointmentTime: date.toISOString(),
        address: selectedAddress,
        status: OrderStatus.PENDING,
        createTime: new Date().toISOString()
    };
    
    await createOrder(newOrder);
    setLoading(false);
    navigate('/orders');
  };

  const toggleCategory = (id: string) => {
    if (selectedCats.includes(id)) {
      setSelectedCats(selectedCats.filter(c => c !== id));
    } else {
      setSelectedCats([...selectedCats, id]);
    }
  };

  // --- Render Steps ---

  const renderStep1Categories = () => (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-emerald-50 p-4 rounded-xl flex items-start space-x-3 text-emerald-800 text-sm">
        <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
        <p>请选择您需要回收的物品类型，支持多选。大家电回收可能需要额外确认。</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {CATEGORIES.map(cat => {
            const isSelected = selectedCats.includes(cat.id);
            return (
                <div
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between relative overflow-hidden group ${
                    isSelected
                    ? 'border-primary bg-primary/5 shadow-md' 
                    : 'border-transparent bg-white shadow-sm hover:border-emerald-100'
                }`}
                >
                <div className="relative z-10">
                    <p className={`font-bold text-lg ${isSelected ? 'text-primary' : 'text-gray-800'}`}>{cat.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{cat.priceDesc}</p>
                </div>
                {isSelected && (
                    <div className="bg-primary text-white rounded-full p-1 shadow-sm">
                        <Check size={16} strokeWidth={3} />
                    </div>
                )}
                </div>
            );
        })}
      </div>
    </div>
  );

  const renderStep2Info = () => (
    <div className="space-y-6 bg-white p-5 rounded-3xl shadow-sm animate-in fade-in slide-in-from-right-4 duration-300">
      <div>
        <label className="flex items-center text-sm font-bold text-gray-800 mb-3">
            <Scale size={16} className="mr-2 text-primary" />
            预估数量/重量
        </label>
        
        <div className="flex flex-wrap gap-2 mb-3">
            {QUICK_QUANTITY_TAGS.map(tag => (
                <button
                    key={tag}
                    onClick={() => setQuantity(tag)}
                    className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                        quantity === tag 
                        ? 'bg-primary text-white border-primary' 
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                    }`}
                >
                    {tag}
                </button>
            ))}
        </div>

        <input 
          type="text" 
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="或者手动输入，例如：5kg, 3袋..."
          className="w-full p-4 bg-gray-50 border-none rounded-xl text-gray-800 focus:ring-2 focus:ring-primary/20 transition-all placeholder-gray-400"
        />
      </div>

      <div>
        <label className="flex items-center text-sm font-bold text-gray-800 mb-3">
            <Camera size={16} className="mr-2 text-primary" />
            上传照片 (可选)
        </label>
        <div className="flex space-x-3">
          <button className="w-24 h-24 bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center text-gray-400 active:scale-95 transition-transform">
            <Camera size={28} />
            <span className="text-xs mt-2 font-medium">点击上传</span>
          </button>
          {/* Mock uploaded image - Visual only */}
          <div className="w-24 h-24 rounded-2xl overflow-hidden relative shadow-sm group">
             <img src="https://picsum.photos/100/100" alt="preview" className="object-cover w-full h-full" />
             <div className="absolute inset-0 bg-black/20 hidden group-hover:flex items-center justify-center">
                 <button className="text-white text-xs bg-black/50 px-2 py-1 rounded">删除</button>
             </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-800 mb-3">备注信息</label>
        <textarea 
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          placeholder="如有特殊物品或上门要求请备注..."
          maxLength={200}
          className="w-full p-4 bg-gray-50 border-none rounded-xl text-gray-800 focus:ring-2 focus:ring-primary/20 transition-all placeholder-gray-400 h-24 resize-none"
        />
      </div>
    </div>
  );

  const renderStep3Time = () => {
    const morningSlots = ['09:00-10:00', '10:00-11:00', '11:00-12:00'];
    const afternoonSlots = ['14:00-15:00', '15:00-16:00', '16:00-17:00'];

    return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="bg-white p-2 rounded-2xl shadow-sm flex space-x-2">
        {['today', 'tomorrow', 'future'].map((day) => {
          let label = '';
          const d = new Date();
          if (day === 'today') label = '今天';
          else if (day === 'tomorrow') { label = '明天'; d.setDate(d.getDate() + 1); }
          else { label = '后天'; d.setDate(d.getDate() + 2); }
          
          const dateStr = `${d.getMonth() + 1}月${d.getDate()}日`;

          return (
            <button
              key={day}
              onClick={() => setSelectedDate(day)}
              className={`flex-1 py-3 rounded-xl flex flex-col items-center justify-center transition-all ${
                selectedDate === day 
                ? 'bg-primary text-white shadow-md' 
                : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <span className="text-sm font-bold">{label}</span>
              <span className={`text-[10px] ${selectedDate === day ? 'text-emerald-100' : 'text-gray-400'}`}>{dateStr}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-gray-500 ml-1 flex items-center">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2"></span>
            上午时段
        </h3>
        <div className="grid grid-cols-3 gap-3">
            {morningSlots.map(time => (
                <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-3 px-1 rounded-xl text-xs font-bold border transition-all ${
                    selectedTime === time
                    ? 'border-primary bg-emerald-50 text-primary shadow-sm'
                    : 'border-transparent bg-white text-gray-600 shadow-sm hover:border-gray-200'
                }`}
                >
                {time}
                </button>
            ))}
        </div>

        <h3 className="text-sm font-bold text-gray-500 ml-1 flex items-center pt-2">
            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></span>
            下午时段
        </h3>
        <div className="grid grid-cols-3 gap-3">
            {afternoonSlots.map(time => (
                <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-3 px-1 rounded-xl text-xs font-bold border transition-all ${
                    selectedTime === time
                    ? 'border-primary bg-emerald-50 text-primary shadow-sm'
                    : 'border-transparent bg-white text-gray-600 shadow-sm hover:border-gray-200'
                }`}
                >
                {time}
                </button>
            ))}
        </div>
      </div>
    </div>
  )};

  const renderStep4Address = () => (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
       <div className="grid gap-3">
       {addresses.map(addr => (
         <div 
            key={addr.id}
            onClick={() => setSelectedAddress(addr)}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
              selectedAddress?.id === addr.id 
              ? 'border-primary bg-emerald-50/50 shadow-sm' 
              : 'border-transparent bg-white shadow-sm hover:border-gray-100'
            }`}
         >
           <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-full ${selectedAddress?.id === addr.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                        <MapPin size={18} />
                    </div>
                    <div>
                        <div className="flex items-center space-x-2">
                            <span className="font-bold text-gray-800">{addr.contactName}</span>
                            <span className="text-gray-500 text-xs">{addr.contactPhone}</span>
                        </div>
                        <div className="flex items-center mt-1 space-x-2">
                             <span className="text-[10px] px-1.5 py-0.5 bg-white border border-gray-200 text-gray-500 rounded">{addr.tag}</span>
                             <p className="text-sm text-gray-600 line-clamp-1">{addr.detail}</p>
                        </div>
                    </div>
                </div>
                {selectedAddress?.id === addr.id && (
                    <div className="text-primary">
                        <Check size={20} />
                    </div>
                )}
           </div>
         </div>
       ))}
       </div>

       <button 
         onClick={() => navigate('/address/new')}
         className="w-full py-4 border border-dashed border-emerald-300 text-emerald-600 rounded-2xl flex items-center justify-center space-x-2 bg-emerald-50/50 hover:bg-emerald-50 active:scale-[0.98] transition-all"
       >
         <div className="w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700">
            <span className="text-lg font-bold leading-none mb-0.5">+</span>
         </div>
         <span className="font-medium">使用新地址</span>
       </button>
    </div>
  );

  // Validation & Button Text
  const isNextDisabled = () => {
    if (currentStep === 0) return selectedCats.length === 0;
    if (currentStep === 1) return !quantity;
    if (currentStep === 2) return !selectedTime;
    if (currentStep === 3) return !selectedAddress;
    return false;
  };

  const getButtonText = () => {
      if (loading) return '提交中...';
      if (currentStep === 0 && selectedCats.length === 0) return '请选择分类';
      if (currentStep === 1 && !quantity) return '请填写数量';
      if (currentStep === 2 && !selectedTime) return '请选择时间';
      if (currentStep === 3 && !selectedAddress) return '请选择地址';
      if (currentStep === steps.length - 1) return '立即预约';
      return '下一步';
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-20 shadow-sm/50 backdrop-blur-md bg-white/90">
        <button onClick={handleBack} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">预约上门回收</h1>
        <div className="w-8"></div>
      </header>

      {/* Progress Bar */}
      <div className="px-6 py-6 bg-white mb-2">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 rounded-full -z-0"></div>
          <div 
             className="absolute top-1/2 left-0 h-1 bg-primary rounded-full -z-0 transition-all duration-500 ease-out" 
             style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
          
          {steps.map((label, idx) => {
             const isCompleted = idx < currentStep;
             const isCurrent = idx === currentStep;
             return (
             <div key={idx} className="relative z-10 flex flex-col items-center">
               <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-[3px] transition-all duration-300 ${
                 isCompleted || isCurrent 
                   ? 'bg-primary border-primary text-white shadow-md scale-110' 
                   : 'bg-white border-gray-200 text-gray-300'
               }`}>
                 {isCompleted ? <Check size={14} strokeWidth={4} /> : idx + 1}
               </div>
               <span className={`text-[10px] font-bold mt-2 transition-colors duration-300 ${
                   isCurrent ? 'text-primary' : 'text-gray-400'
               }`}>
                 {label}
               </span>
             </div>
          )})}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-32">
        {currentStep === 0 && renderStep1Categories()}
        {currentStep === 1 && renderStep2Info()}
        {currentStep === 2 && renderStep3Time()}
        {currentStep === 3 && renderStep4Address()}
      </div>

      {/* Footer Action */}
      <div className="bg-white p-4 border-t border-gray-100 absolute bottom-0 w-full z-20 pb-safe">
        <button
          onClick={handleNext}
          disabled={isNextDisabled() || loading}
          className={`w-full py-4 rounded-full text-white font-bold text-lg shadow-lg shadow-primary/30 flex items-center justify-center space-x-2 transition-all active:scale-[0.98] ${
            isNextDisabled() ? 'bg-gray-300 shadow-none cursor-not-allowed text-gray-500' : 'bg-gradient-to-r from-primary to-emerald-600'
          }`}
        >
          {loading ? (
             <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <span>{getButtonText()}</span>
              {!isNextDisabled() && currentStep < steps.length - 1 && <ChevronRight size={20} className="opacity-80" />}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Schedule;
