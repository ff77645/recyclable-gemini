import React from 'react';
import { ArrowLeft, Clock, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Guide: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen pb-20">
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-10 px-4 py-3 flex items-center border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600 rounded-full hover:bg-gray-100">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800 ml-2">回收指南</h1>
      </header>
      
      <div className="p-5 space-y-8">
        <section>
          <div className="flex items-center justify-between mb-4">
             <h2 className="text-xl font-bold text-primary">♻️ 我们回收什么？</h2>
             <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">高价值回收</span>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-blue-50 p-4 rounded-2xl flex items-start space-x-4">
               <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 text-xl shadow-sm">📄</div>
               <div>
                 <h3 className="font-bold text-blue-900">纸类</h3>
                 <p className="text-sm text-blue-700/70 mt-1 leading-relaxed">报纸、纸箱、书本、杂志等。请尽量保持平整并捆扎。</p>
               </div>
            </div>
            <div className="bg-teal-50 p-4 rounded-2xl flex items-start space-x-4">
               <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 text-xl shadow-sm">🥤</div>
               <div>
                 <h3 className="font-bold text-teal-900">塑料</h3>
                 <p className="text-sm text-teal-700/70 mt-1 leading-relaxed">饮料瓶、塑料盆、桶等。请倒空液体并简单清洗。</p>
               </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl flex items-start space-x-4">
               <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 text-xl shadow-sm">🔩</div>
               <div>
                 <h3 className="font-bold text-gray-900">金属</h3>
                 <p className="text-sm text-gray-600 mt-1 leading-relaxed">易拉罐、废旧铁锅、铜铝铁等金属制品。</p>
               </div>
            </div>
          </div>
        </section>

        {/* Environmental Impact Knowledge - Degradation Time */}
        <section>
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Clock size={20} className="mr-2 text-orange-500" />
                <span>如果随意丢弃... (自然降解时间)</span>
            </h2>
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 space-y-4">
                <div className="space-y-3">
                    <div className="flex items-center">
                        <span className="w-20 text-xs font-medium text-gray-500">纸巾</span>
                        <div className="flex-1 mx-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="w-[5%] h-full bg-green-400 rounded-full"></div>
                        </div>
                        <span className="text-sm font-bold text-gray-700">2-4 周</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-20 text-xs font-medium text-gray-500">铝罐</span>
                        <div className="flex-1 mx-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="w-[40%] h-full bg-yellow-400 rounded-full"></div>
                        </div>
                        <span className="text-sm font-bold text-gray-700">200 年</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-20 text-xs font-medium text-gray-500">塑料瓶</span>
                        <div className="flex-1 mx-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="w-[80%] h-full bg-orange-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-bold text-gray-700">450 年</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-20 text-xs font-medium text-gray-500">玻璃瓶</span>
                        <div className="flex-1 mx-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="w-[100%] h-full bg-red-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-bold text-gray-700">100万+ 年</span>
                    </div>
                </div>
                <p className="text-xs text-gray-400 text-center pt-2">回收是保护地球最简单的方式</p>
            </div>
        </section>

        <section className="bg-red-50 p-5 rounded-2xl border border-red-100">
          <h2 className="text-lg font-bold text-red-800 mb-3 flex items-center">
              <AlertTriangle size={18} className="mr-2" />
              我们不收什么？
          </h2>
          <ul className="list-disc list-inside text-sm text-red-700/80 space-y-2">
            <li>厨余垃圾、果皮菜叶</li>
            <li>被污染的纸巾、卫生纸</li>
            <li>危险废物 (电池、荧光灯管、医疗废物)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-4">📦 回收流程</h2>
          <div className="relative border-l-2 border-emerald-100 ml-3 space-y-8 py-2">
            {[
              { title: '在线预约', desc: '选择分类，填写地址和时间' },
              { title: '回收员接单', desc: '系统派单，回收员与您联系' },
              { title: '上门称重', desc: '专业人员上门，标准化称重' },
              { title: '结算收益', desc: '确认重量，积分/金额实时到账' }
            ].map((step, idx) => (
              <div key={idx} className="relative pl-8">
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white border-4 border-primary rounded-full box-border shadow-sm"></div>
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