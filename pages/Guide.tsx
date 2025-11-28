import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Guide: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen pb-20">
      <header className="sticky top-0 bg-white z-10 px-4 py-3 flex items-center border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800 ml-2">回收指南</h1>
      </header>
      
      <div className="p-5 space-y-8">
        <section>
          <h2 className="text-xl font-bold text-primary mb-4">♻️ 我们回收什么？</h2>
          <div className="space-y-4">
            <div className="flex space-x-4">
               <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-xl">📄</div>
               <div>
                 <h3 className="font-bold text-gray-800">纸类</h3>
                 <p className="text-sm text-gray-500 mt-1">报纸、纸箱、书本、杂志等。请尽量保持平整并捆扎。</p>
               </div>
            </div>
            <div className="flex space-x-4">
               <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 text-xl">🥤</div>
               <div>
                 <h3 className="font-bold text-gray-800">塑料</h3>
                 <p className="text-sm text-gray-500 mt-1">饮料瓶、塑料盆、桶等。请倒空液体并简单清洗。</p>
               </div>
            </div>
            <div className="flex space-x-4">
               <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 text-xl">🔩</div>
               <div>
                 <h3 className="font-bold text-gray-800">金属</h3>
                 <p className="text-sm text-gray-500 mt-1">易拉罐、废旧铁锅、铜铝铁等金属制品。</p>
               </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 p-4 rounded-xl">
          <h2 className="text-lg font-bold text-gray-800 mb-3">⛔ 我们不收什么？</h2>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
            <li>厨余垃圾、果皮菜叶</li>
            <li>被污染的纸巾、卫生纸</li>
            <li>玻璃制品 (目前暂时不支持)</li>
            <li>危险废物 (电池、荧光灯管、医疗废物)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-4">📦 回收流程</h2>
          <div className="relative border-l-2 border-primary/20 ml-3 space-y-8 py-2">
            {[
              { title: '在线预约', desc: '选择分类，填写地址和时间' },
              { title: '回收员接单', desc: '系统派单，回收员与您联系' },
              { title: '上门称重', desc: '专业人员上门，标准化称重' },
              { title: '结算收益', desc: '确认重量，积分/金额实时到账' }
            ].map((step, idx) => (
              <div key={idx} className="relative pl-6">
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-primary rounded-full border-4 border-white"></div>
                <h3 className="font-bold text-gray-800 text-sm">{step.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Guide;