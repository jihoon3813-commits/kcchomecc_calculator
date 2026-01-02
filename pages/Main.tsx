
import React from 'react';
import Calculator from '../components/Calculator';

const Main: React.FC = () => {
  return (
    <div className="container mx-auto px-4 flex flex-col items-center">
      <div className="text-center mb-12 animate-slideDown">
        <h1 className="text-white text-4xl md:text-6xl font-black mb-4 drop-shadow-lg tracking-tight leading-tight">
          30초 만에 확인하는<br />우리 집 샷시 견적
        </h1>
        <p className="text-white/80 text-lg md:text-xl font-medium drop-shadow-md">
          복잡한 실측 없이 평형대와 브랜드만으로<br className="md:hidden" /> 합리적인 예상 금액을 확인하세요.
        </p>
      </div>
      
      <Calculator />
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 text-center">
          <div className="text-blue-400 font-bold mb-2">간편한 측정</div>
          <p className="text-white/70 text-sm">평형대별 데이터 기반으로<br/>즉시 견적 산출</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 text-center">
          <div className="text-blue-400 font-bold mb-2">메이저 브랜드</div>
          <p className="text-white/70 text-sm">KCC, LG, 현대 등<br/>국내 정품 자재 취급</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 text-center">
          <div className="text-blue-400 font-bold mb-2">전문가 상담</div>
          <p className="text-white/70 text-sm">확인한 견적을 바탕으로<br/>무료 유선 상담 지원</p>
        </div>
      </div>
    </div>
  );
};

export default Main;
