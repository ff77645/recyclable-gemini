import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getAddressById, saveAddress } from '../services/mockService';
import { Address } from '../types';

const AddressEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Partial<Address>>({
    contactName: '',
    contactPhone: '',
    detail: '',
    tag: 'Home',
    isDefault: false
  });

  useEffect(() => {
    if (isEdit && id) {
      loadAddress(id);
    }
  }, [id]);

  const loadAddress = async (addrId: string) => {
    const data = await getAddressById(addrId);
    if (data) setForm(data);
  };

  const handleSave = async () => {
    if (!form.contactName || !form.contactPhone || !form.detail) {
      alert('请填写完整信息');
      return;
    }
    setLoading(true);
    await saveAddress({ ...form, id } as any);
    setLoading(false);
    navigate(-1);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 shadow-sm z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">{isEdit ? '编辑地址' : '新增地址'}</h1>
        <button 
            onClick={handleSave} 
            disabled={loading}
            className="text-primary font-medium text-sm disabled:opacity-50"
        >
            保存
        </button>
      </header>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">联系人</label>
            <input 
              type="text"
              value={form.contactName}
              onChange={e => setForm({...form, contactName: e.target.value})}
              placeholder="请填写收货人姓名"
              className="w-full text-base py-2 border-b border-gray-100 focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">手机号</label>
            <input 
              type="tel"
              value={form.contactPhone}
              onChange={e => setForm({...form, contactPhone: e.target.value})}
              placeholder="请填写手机号码"
              className="w-full text-base py-2 border-b border-gray-100 focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">详细地址</label>
            <textarea 
              value={form.detail}
              onChange={e => setForm({...form, detail: e.target.value})}
              placeholder="街道、楼牌号等"
              className="w-full text-base py-2 border-b border-gray-100 focus:outline-none focus:border-primary resize-none h-20"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
           <div>
             <label className="block text-xs font-medium text-gray-500 mb-2">标签</label>
             <div className="flex space-x-3">
               {['Home', 'Company', 'Other'].map((tag) => (
                 <button
                   key={tag}
                   onClick={() => setForm({...form, tag: tag as any})}
                   className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                     form.tag === tag 
                       ? 'bg-primary text-white border-primary' 
                       : 'bg-white text-gray-600 border-gray-200'
                   }`}
                 >
                   {tag === 'Home' ? '家' : tag === 'Company' ? '公司' : '其他'}
                 </button>
               ))}
             </div>
           </div>
           
           <div className="flex items-center justify-between pt-2">
              <span className="text-gray-800 font-medium">设为默认地址</span>
              <button 
                onClick={() => setForm({...form, isDefault: !form.isDefault})}
                className={`w-11 h-6 rounded-full relative transition-colors ${
                    form.isDefault ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                      form.isDefault ? 'left-[22px]' : 'left-0.5'
                  }`}></div>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AddressEdit;