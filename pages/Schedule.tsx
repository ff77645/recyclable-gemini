import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Camera, MapPin, ChevronRight, Calendar } from 'lucide-react';
import { CATEGORIES, getAddresses, createOrder, wait } from '../services/mockService';
import { Address, OrderStatus } from '../types';

const steps = ['分类', '信息', '时间', '地址'];

const Schedule: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  
  // Form State
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [quantity, setQuantity] = useState('');
  const [remark, setRemark] = useState('');
  const [selectedDate, setSelectedDate] = useState('today'); // 'today' | 'tomorrow'
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    const data = await getAddresses();
    setAddresses(data);
    // Auto select default
    const defaultAddr = data.find(a => a.isDefault);
    if (defaultAddr) setSelectedAddress(defaultAddr);
  };

  const handleNext = () => {
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
    
    // Construct Date object
    const date = new Date();
    if (selectedDate === 'tomorrow') date.setDate(date.getDate() + 1);
    if (selectedDate === 'future') date.setDate(date.getDate() + 2);
    // Simple mock time setting (not precise parsing)
    date.setHours(parseInt(selectedTime.split(':')[0], 10));
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
    navigate('/orders'); // Redirect to order list
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
    <div className="grid grid-cols-2 gap-4">
      {CATEGORIES.map(cat => (
        <div
          key={cat.id}
          onClick={() => toggleCategory(cat.id)}
          className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
            selectedCats.includes(cat.id) 
              ? 'border-primary bg-emerald-50' 
              : 'border-transparent bg-white shadow-sm'
          }`}
        >
          <div>
            <p className="font-bold text-gray-800">{cat.name}</p>
            <p className="text-xs text-gray-500 mt-1">{cat.priceDesc}</p>
          </div>
          {selectedCats.includes(cat.id) && <Check size={20} className="text-primary" />}
        </div>
      ))}
    </div>
  );

  const renderStep2Info = () => (
    <div className="space-y-6 bg-white p-5 rounded-xl shadow-sm">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">预估数量/重量</label>
        <input 
          type="text" 
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="例如：5kg, 3袋, 1台"
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">上传照片 (可选)</label>
        <div className="flex space-x-3">
          <div className="w-20 h-20 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400">
            <Camera size={24} />
            <span className="text-[10px] mt-1">添加</span>
          </div>
          {/* Mock uploaded image */}
          <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden relative">
             <img src="https://picsum.photos/80/80" alt="preview" className="object-cover w-full h-full" />
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2">上传照片有助于回收员更准确评估。</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">备注</label>
        <textarea 
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          placeholder="如有特殊说明请备注..."
          maxLength={200}
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 h-24 resize-none"
        />
      </div>
    </div>
  );

  const renderStep3Time = () => (
    <div className="space-y-4">
      <div className="flex bg-white p-1 rounded-lg shadow-sm">
        {['today', 'tomorrow', 'future'].map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDate(day)}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedDate === day ? 'bg-primary text-white shadow-md' : 'text-gray-500'
            }`}
          >
            {day === 'today' ? '今天' : day === 'tomorrow' ? '明天' : '后天'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {['09:00-10:00', '10:00-11:00', '11:00-12:00', '14:00-15:00', '15:00-16:00', '16:00-17:00'].map((time) => (
          <button
            key={time}
            onClick={() => setSelectedTime(time)}
            className={`py-3 px-2 rounded-lg text-sm border font-medium ${
              selectedTime === time
                ? 'border-primary bg-emerald-50 text-primary'
                : 'border-gray-200 bg-white text-gray-600'
            }`}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep4Address = () => (
    <div className="space-y-4">
       {addresses.map(addr => (
         <div 
            key={addr.id}
            onClick={() => setSelectedAddress(addr)}
            className={`p-4 rounded-xl border-2 flex items-start space-x-3 cursor-pointer ${
              selectedAddress?.id === addr.id ? 'border-primary bg-emerald-50' : 'border-transparent bg-white shadow-sm'
            }`}
         >
           <MapPin className={`mt-1 flex-shrink-0 ${selectedAddress?.id === addr.id ? 'text-primary' : 'text-gray-400'}`} size={20} />
           <div className="flex-1">
             <div className="flex items-center space-x-2">
               <span className="font-bold text-gray-800">{addr.contactName}</span>
               <span className="text-gray-500 text-sm">{addr.contactPhone}</span>
               <span className="text-[10px] px-1.5 py-0.5 bg-gray-200 text-gray-600 rounded">{addr.tag}</span>
             </div>
             <p className="text-sm text-gray-600 mt-1">{addr.detail}</p>
           </div>
           {selectedAddress?.id === addr.id && <Check size={20} className="text-primary mt-1" />}
         </div>
       ))}

       <button 
         onClick={() => navigate('/address/new')}
         className="w-full py-3 border border-dashed border-gray-300 text-gray-500 rounded-xl flex items-center justify-center space-x-2 bg-white active:bg-gray-50"
       >
         <span className="text-lg">+</span>
         <span>新增地址</span>
       </button>
    </div>
  );

  // Validation
  const isNextDisabled = () => {
    if (currentStep === 0) return selectedCats.length === 0;
    if (currentStep === 1) return !quantity;
    if (currentStep === 2) return !selectedTime;
    if (currentStep === 3) return !selectedAddress;
    return false;
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <button onClick={handleBack} className="p-2 -ml-2 text-gray-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">预约上门回收</h1>
        <div className="w-8"></div>
      </header>

      {/* Progress Bar */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-0"></div>
          <div 
             className="absolute top-1/2 left-0 h-1 bg-primary -z-0 transition-all duration-300" 
             style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
          
          {steps.map((label, idx) => (
             <div key={idx} className="relative z-10 flex flex-col items-center">
               <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                 idx <= currentStep ? 'bg-primary border-primary text-white' : 'bg-white border-gray-200 text-gray-400'
               }`}>
                 {idx + 1}
               </div>
               <span className={`text-xs mt-1 ${idx <= currentStep ? 'text-primary font-medium' : 'text-gray-400'}`}>
                 {label}
               </span>
             </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        {currentStep === 0 && renderStep1Categories()}
        {currentStep === 1 && renderStep2Info()}
        {currentStep === 2 && renderStep3Time()}
        {currentStep === 3 && renderStep4Address()}
      </div>

      {/* Footer Action */}
      <div className="bg-white p-4 border-t border-gray-100 absolute bottom-0 w-full z-20">
        <button
          onClick={handleNext}
          disabled={isNextDisabled() || loading}
          className={`w-full py-3.5 rounded-full text-white font-bold text-lg shadow-lg flex items-center justify-center space-x-2 transition-all active:scale-95 ${
            isNextDisabled() ? 'bg-gray-300 cursor-not-allowed shadow-none' : 'bg-primary hover:bg-emerald-600'
          }`}
        >
          {loading ? (
             <span>提交中...</span>
          ) : (
            <>
              <span>{currentStep === steps.length - 1 ? '立即预约' : '下一步'}</span>
              {currentStep < steps.length - 1 && <ChevronRight size={20} />}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Schedule;