import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit2, Trash2, MapPin } from 'lucide-react';
import { getAddresses, deleteAddress } from '../services/mockService';
import { Address } from '../types';

const AddressList: React.FC = () => {
  const navigate = useNavigate();
  const [list, setList] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const data = await getAddresses();
    setList(data);
    setLoading(false);
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('确定要删除该地址吗？')) {
      await deleteAddress(id);
      loadData();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 shadow-sm z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">地址管理</h1>
        <div className="w-8"></div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24">
        {loading ? (
            <div className="text-center text-gray-400 py-10">加载中...</div>
        ) : list.length === 0 ? (
            <div className="text-center text-gray-400 py-10 flex flex-col items-center">
                <MapPin size={48} className="mb-2 opacity-20" />
                <p>暂无地址，请添加</p>
            </div>
        ) : (
            list.map(addr => (
            <div 
                key={addr.id}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative group"
            >
                <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                        <span className="font-bold text-gray-800 text-lg">{addr.contactName}</span>
                        <span className="text-gray-500 font-medium">{addr.contactPhone}</span>
                        {addr.isDefault && (
                            <span className="bg-red-50 text-red-500 text-[10px] px-1.5 py-0.5 rounded border border-red-100">默认</span>
                        )}
                        <span className="bg-gray-100 text-gray-500 text-[10px] px-1.5 py-0.5 rounded">{addr.tag}</span>
                    </div>
                </div>
                <p className="text-gray-600 text-sm border-b border-gray-50 pb-3 mb-3">{addr.detail}</p>
                
                <div className="flex justify-end space-x-4">
                    <button 
                        onClick={() => navigate(`/address/edit/${addr.id}`)}
                        className="flex items-center text-gray-500 text-sm space-x-1 active:text-primary"
                    >
                        <Edit2 size={16} />
                        <span>编辑</span>
                    </button>
                    <button 
                        onClick={(e) => handleDelete(e, addr.id)}
                        className="flex items-center text-gray-500 text-sm space-x-1 active:text-red-500"
                    >
                        <Trash2 size={16} />
                        <span>删除</span>
                    </button>
                </div>
            </div>
            ))
        )}
      </div>

      <div className="absolute bottom-8 left-0 w-full px-4">
        <button 
          onClick={() => navigate('/address/new')}
          className="w-full bg-primary text-white font-bold py-3.5 rounded-full shadow-lg flex items-center justify-center space-x-2 active:scale-95 transition-transform"
        >
          <Plus size={20} />
          <span>新增地址</span>
        </button>
      </div>
    </div>
  );
};

export default AddressList;