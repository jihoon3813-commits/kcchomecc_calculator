
import React from 'react';
import { History } from 'lucide-react';

const Changelog: React.FC = () => {
  const logs = [
    {
      date: '2024.12.01',
      title: '겨울철 에너지 효율 창호 단가 반영',
      content: '난방비 절감을 위한 기밀성 향상 모델(V3) 단가가 새롭게 적용되었습니다.'
    },
    {
      date: '2024.10.15',
      title: 'LG 하우시스 브랜드 추가',
      content: 'LX하우시스(구 LG) 프리미엄 모델 라인업이 계산기에 추가되었습니다.'
    },
    {
      date: '2024.08.20',
      title: 'UI/UX 디자인 대규모 업데이트',
      content: '사용자 편의성을 위해 위자드 형태의 계산기로 전면 개편되었습니다.'
    },
    {
      date: '2024.06.01',
      title: '원자재 가격 변동 반영',
      content: '알루미늄 및 PVC 국제가격 상승에 따른 기본 시공 단가 5% 인상 반영.'
    }
  ];

  return (
    <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 md:p-12 my-20">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center">
          <History size={24} />
        </div>
        <h1 className="text-3xl font-black text-gray-800 tracking-tight">업데이트 로그</h1>
      </div>

      <div className="space-y-12">
        {logs.map((log, i) => (
          <div key={i} className="relative pl-8 border-l-2 border-gray-100">
            <div className="absolute top-0 left-[-9px] w-4 h-4 rounded-full bg-purple-500 border-4 border-white"></div>
            <div className="text-sm font-bold text-purple-600 mb-1">{log.date}</div>
            <h3 className="text-xl font-black text-gray-800 mb-2">{log.title}</h3>
            <p className="text-gray-600 leading-relaxed">{log.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Changelog;
