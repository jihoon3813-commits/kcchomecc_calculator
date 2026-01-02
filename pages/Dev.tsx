
import React from 'react';
import { Phone, Mail, Award, Clock } from 'lucide-react';

const Dev: React.FC = () => {
  return (
    <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden my-20">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 bg-gray-50 p-12 flex flex-col items-center justify-center text-center">
          <img 
            src="https://loremflickr.com/400/400/architect,man" 
            alt="Developer" 
            className="w-32 h-32 rounded-3xl object-cover mb-6 shadow-lg ring-4 ring-white"
          />
          <h2 className="text-2xl font-black text-gray-800">김윈도 팀장</h2>
          <p className="text-blue-600 font-bold text-sm mb-6">시공 경력 15년 / 공학석사</p>
          
          <div className="space-y-3 w-full">
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl text-sm text-gray-600 border border-gray-100">
              <Phone size={16} className="text-gray-400" /> 010-1234-5678
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl text-sm text-gray-600 border border-gray-100">
              <Mail size={16} className="text-gray-400" /> master@winmaster.com
            </div>
          </div>
        </div>

        <div className="md:w-2/3 p-12">
          <h1 className="text-3xl font-black text-gray-800 mb-6 tracking-tight">신뢰와 기술의 창호 전문가 그룹</h1>
          <p className="text-gray-600 leading-relaxed mb-10">
            윈도우마스터 팀은 단순한 교체를 넘어, 주거 공간의 가치를 높이는 에너지 솔루션을 제공합니다. 
            현장의 노하우를 디지털 데이터로 구축하여 누구나 투명하게 견적을 산출할 수 있는 시스템을 만들었습니다.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-5 border border-gray-100 rounded-2xl hover:border-blue-200 transition-colors">
              <Award className="text-blue-600 mb-3" />
              <div className="font-bold text-gray-800">국가공인 자격</div>
              <p className="text-xs text-gray-500 mt-1">건축기사 및 창호시공기술자 다수 보유</p>
            </div>
            <div className="p-5 border border-gray-100 rounded-2xl hover:border-blue-200 transition-colors">
              <Clock className="text-blue-600 mb-3" />
              <div className="font-bold text-gray-800">철저한 사후관리</div>
              <p className="text-xs text-gray-500 mt-1">시공 후 10년 무상 A/S 보증 (자재 결함)</p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Partner Brands</div>
            <div className="flex gap-6 grayscale opacity-50">
              <span className="font-black text-xl italic">KCC</span>
              <span className="font-black text-xl italic">LX Hausys</span>
              <span className="font-black text-xl italic">HYUNDAI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dev;
