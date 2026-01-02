
import React, { useState } from 'react';
import { Send, Bug, MessageSquare } from 'lucide-react';

const Report: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-12 text-center animate-fadeIn">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Send size={40} />
        </div>
        <h2 className="text-3xl font-black text-gray-800 mb-4">제보가 접수되었습니다!</h2>
        <p className="text-gray-600 mb-8">소중한 의견 감사드립니다. 더 정확한 견적 서비스를 위해 최선을 다하겠습니다.</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="px-8 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-colors"
        >
          추가 제보하기
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 md:p-12 my-20">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center">
          <Bug size={24} />
        </div>
        <h1 className="text-3xl font-black text-gray-800">버그 및 불편 제보</h1>
      </div>

      <p className="text-gray-600 mb-10 leading-relaxed">
        계산 결과가 예상과 크게 다르거나, 사용 중 오류가 발생했나요? 
        고객님의 한마디가 더 똑똑한 계산기를 만듭니다.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">어떤 문제가 발생했나요?</label>
          <select className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:ring-2 focus:ring-red-500 outline-none">
            <option>계산기 수치 오류</option>
            <option>페이지 로딩 지연</option>
            <option>브랜드 정보 상이</option>
            <option>기타 제안 사항</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">상세 내용</label>
          <textarea 
            required
            placeholder="문제가 발생한 평수, 브랜드명, 혹은 구체적인 상황을 적어주세요."
            className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:ring-2 focus:ring-red-500 outline-none h-40 resize-none"
          />
        </div>

        <button 
          type="submit"
          className="w-full py-5 bg-gray-800 hover:bg-black text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg"
        >
          <Send size={20} /> 제보 내용 보내기
        </button>
      </form>
      
      <div className="mt-8 flex items-center gap-2 justify-center text-xs text-gray-400">
        <MessageSquare size={14} /> 실시간 톡상담 문의는 우측 하단 채널톡을 이용해주세요.
      </div>
    </div>
  );
};

export default Report;
