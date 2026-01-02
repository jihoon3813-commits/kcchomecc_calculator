
import React from 'react';
import { Ruler, Info, MousePointer2 } from 'lucide-react';

const HowTo: React.FC = () => {
  return (
    <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-8 md:p-12 my-20">
      <h1 className="text-4xl font-black text-gray-800 mb-8">정확한 견적을 위한 가이드</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <img 
            src="https://loremflickr.com/800/600/blueprint,measuring" 
            alt="Measuring Guide" 
            className="rounded-2xl shadow-lg mb-6 w-full h-64 object-cover"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Ruler className="text-blue-600" /> 1. 직접 실측하기
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            계산기는 아파트 공통 평면도를 기준으로 산출합니다. 하지만 창문의 개별 크기나 발코니 확장 여부에 따라 가격이 달라질 수 있습니다.
          </p>
          <ul className="list-disc list-inside text-sm text-gray-500 space-y-2">
            <li>가로 길이는 틀 끝에서 끝까지 측정</li>
            <li>세로 길이는 틀 끝에서 끝까지 측정</li>
            <li>확장된 거실창은 이중창으로 계산</li>
          </ul>
        </div>

        <div className="space-y-8">
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
            <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
              <MousePointer2 /> 2. 계산기 사용법
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                <p className="text-blue-900 text-sm">우리 집의 '공급 면적(평)'을 선택합니다.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                <p className="text-blue-900 text-sm">시공을 원하는 브랜드를 선택합니다. 각 브랜드별 특징을 확인하세요.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                <p className="text-blue-900 text-sm">결과 화면에서 견적을 확인하고 상담을 원하시면 연락처를 남겨주세요.</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
            <h2 className="text-xl font-bold text-amber-800 mb-4 flex items-center gap-2">
              <Info /> 주의사항
            </h2>
            <p className="text-amber-900 text-sm leading-relaxed">
              산출된 견적은 자재비와 인건비가 포함된 기초 견적입니다. 층수(사다리차 이용료), 철거 난이도, 지역에 따라 실제 최종 견적은 소폭 변동될 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowTo;
