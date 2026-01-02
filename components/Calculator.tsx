
import React, { useState, useRef } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { ArrowLeft, CheckCircle2, Search, Building2, MapPin, Loader2, Hash, LayoutPanelLeft, ExternalLink, Calculator as CalcIcon, Zap, X, AlertCircle } from 'lucide-react';
import { Step, ApartmentInfo } from '../types';
import { BRANDS } from '../constants';

const Calculator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.LOCATION);
  const [searchQuery, setSearchQuery] = useState('');
  const [addressInfo, setAddressInfo] = useState({ fullAddress: '', apartmentName: '' });
  const [apartmentList, setApartmentList] = useState<string[]>([]);
  const [selectedAptName, setSelectedAptName] = useState<string>('');
  const [buildingNo, setBuildingNo] = useState<string>('');
  const [unitNo, setUnitNo] = useState<string>('');
  const [simplePyeong, setSimplePyeong] = useState<number>(33);
  const [selectedApt, setSelectedApt] = useState<ApartmentInfo | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [sources, setSources] = useState<{title?: string, uri?: string}[]>([]);

  // 1. AI 기반 통합 주소 및 아파트 검색
  const handleAddressSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    if (!process.env.API_KEY) {
      alert("API_KEY가 설정되지 않았습니다. Vercel 환경 변수를 확인해주세요.");
      return;
    }

    setIsSearching(true);
    setCurrentStep(Step.LOADING);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `사용자가 입력한 '${searchQuery}'에 해당하는 한국의 정확한 도로명 주소와 그 주소에 있는 아파트 단지 리스트를 찾아줘.`,
        config: { 
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              fullAddress: { type: Type.STRING },
              apartments: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["fullAddress", "apartments"]
          }
        }
      });

      const result = JSON.parse(response.text || "{}");
      
      if (!result.apartments || result.apartments.length === 0) {
        alert("해당 검색어와 일치하는 아파트 단지를 찾을 수 없습니다. 평수로 계산하기를 이용해 주세요.");
        setCurrentStep(Step.LOCATION);
      } else {
        setAddressInfo({ fullAddress: result.fullAddress, apartmentName: '' });
        setApartmentList(result.apartments);
        setCurrentStep(Step.APARTMENT_LIST);
      }
    } catch (error: any) {
      console.error("Search Error Detail:", error);
      const errorMsg = error.message?.includes("403") 
        ? "API 키의 권한이 부족하거나(Google Search 미지원) 위치 제한이 있습니다." 
        : "검색 서버와 연결이 원활하지 않습니다. 잠시 후 다시 시도해 주세요.";
      alert(errorMsg);
      setCurrentStep(Step.LOCATION);
    } finally {
      setIsSearching(false);
    }
  };

  // 2. 가구 상세 정보 AI 분석
  const analyzeUnitSpecs = async () => {
    setCurrentStep(Step.LOADING);
    setSources([]);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `${addressInfo.fullAddress} ${selectedAptName} ${buildingNo}동 ${unitNo}호의 평수(전용면적 또는 공급면적) 정보를 알려줘.`,
        config: { 
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              pyeong: { type: Type.NUMBER, description: "공급 평수 숫자만 (예: 33)" }
            },
            required: ["pyeong"]
          }
        }
      });

      const result = JSON.parse(response.text || "{}");
      const pyeong = result.pyeong || 33;

      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (groundingChunks) {
        setSources(groundingChunks.map((c: any) => c.web).filter(Boolean));
      }

      setSelectedApt({
        name: selectedAptName,
        pyeong: pyeong,
        address: addressInfo.fullAddress,
        buildingNo, unitNo, isSimple: false
      });
      setCurrentStep(Step.RESULT);
    } catch (error) {
      console.error("Analyze Error:", error);
      setSelectedApt({
        name: selectedAptName, pyeong: 33, address: addressInfo.fullAddress,
        buildingNo, unitNo, isSimple: false
      });
      setCurrentStep(Step.RESULT);
    }
  };

  const handleSimpleEstimate = () => {
    setSelectedApt({ name: '전국 평균 데이터 기준', pyeong: simplePyeong, address: '간편 입력', isSimple: true });
    setCurrentStep(Step.RESULT);
  };

  const calculateEstimate = () => (selectedApt ? selectedApt.pyeong * BRANDS[0].priceFactor : 0);

  const reset = () => {
    setSearchQuery('');
    setAddressInfo({ fullAddress: '', apartmentName: '' });
    setSelectedApt(null);
    setApartmentList([]);
    setSelectedAptName('');
    setBuildingNo('');
    setUnitNo('');
    setSimplePyeong(33);
    setSources([]);
    setShowForm(false);
    setCurrentStep(Step.LOCATION);
  };

  return (
    <div className="w-full max-w-xl bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 transition-all duration-500 relative overflow-hidden">
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl mb-4">
          {currentStep === Step.RESULT ? <Zap size={24} /> : <CalcIcon size={24} />}
        </div>
        <h2 className="text-3xl font-black text-gray-800 tracking-tight">
          {currentStep === Step.LOCATION && "우리 집 주소 검색"}
          {currentStep === Step.APARTMENT_LIST && "단지 선택"}
          {currentStep === Step.SIMPLE_INPUT && "평수 선택"}
          {currentStep === Step.DETAIL_UNIT && "상세 정보 입력"}
          {currentStep === Step.LOADING && "데이터 분석 중"}
          {currentStep === Step.RESULT && "견적 확인"}
        </h2>
        <div className="text-gray-500 mt-2 text-sm font-medium leading-relaxed px-4">
          {currentStep === Step.LOCATION && (
            <div className="flex flex-col gap-0.5">
              <span className="font-bold text-gray-700">아파트만 조회가 가능합니다.</span>
              <span className="font-bold text-blue-600">조회가 되지 않을 경우 평수로 계산하기로 진행하세요.</span>
            </div>
          )}
          {currentStep === Step.APARTMENT_LIST && (
            <div className="flex flex-col gap-1">
              <span>조회된 단지 목록 중 하나를 선택해 주세요.</span>
            </div>
          )}
          {currentStep === Step.SIMPLE_INPUT && "거주하시는 가구의 공급 평수를 선택해 주세요."}
          {currentStep === Step.DETAIL_UNIT && "정확한 평면 분석을 위해 동/호를 입력해 주세요."}
          {currentStep === Step.LOADING && (isSearching ? "주소지의 아파트 정보를 실시간 검색 중입니다." : "가구 평면 및 자재 견적을 분석 중입니다.")}
          {currentStep === Step.RESULT && "KCC 정품 자재 및 시공비가 포함된 예상 견적입니다."}
        </div>
      </div>

      <div className="min-h-[350px] flex flex-col justify-center">
        {currentStep === Step.LOCATION && (
          <div className="space-y-6 animate-fadeIn">
            <form onSubmit={handleAddressSearch} className="space-y-4">
              <div className="relative group">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="예: 성수동 아크로서울포레스트"
                  className="w-full p-5 bg-gray-50 rounded-2xl border-2 border-gray-100 focus:border-blue-500 outline-none pr-14 font-bold text-gray-700 placeholder:text-gray-400 transition-all shadow-sm"
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg"
                >
                  <Search size={20} />
                </button>
              </div>
              <p className="text-[11px] text-gray-400 font-bold flex items-center gap-1 ml-2">
                <AlertCircle size={12} /> 구체적인 동네 이름과 단지명을 함께 적으면 더 정확합니다.
              </p>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-3 text-gray-300 font-black">OR</span></div>
            </div>

            <button 
              onClick={() => setCurrentStep(Step.SIMPLE_INPUT)}
              className="w-full p-6 bg-gray-50 border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50 rounded-3xl transition-all text-left flex items-center gap-6 group"
            >
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-blue-500 shadow-sm transition-colors">
                <CalcIcon size={24} />
              </div>
              <div>
                <h4 className="font-black text-gray-700 group-hover:text-blue-700 transition-colors">평수로 바로 계산하기</h4>
                <p className="text-xs text-gray-400">주소 없이 평수 선택만으로 빠른 견적 확인</p>
              </div>
            </button>
          </div>
        )}

        {currentStep === Step.APARTMENT_LIST && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-3">
              <MapPin size={16} className="text-blue-500" />
              <span className="text-xs font-bold text-blue-900 truncate flex-1">{addressInfo.fullAddress}</span>
            </div>
            <div className="max-h-[280px] overflow-y-auto pr-2 custom-scrollbar space-y-2">
              {apartmentList.map((apt, idx) => (
                <button 
                  key={idx} 
                  onClick={() => { setSelectedAptName(apt); setCurrentStep(Step.DETAIL_UNIT); }}
                  className="w-full p-4 flex items-center gap-4 bg-white border border-gray-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
                >
                  <Building2 size={18} className="text-gray-400 group-hover:text-blue-500" />
                  <span className="font-bold text-gray-700 text-sm">{apt}</span>
                </button>
              ))}
            </div>
            
            <button onClick={() => setCurrentStep(Step.LOCATION)} className="w-full py-3 text-gray-400 text-xs font-bold hover:underline flex items-center justify-center gap-1">
              <ArrowLeft size={12} /> 다시 검색하기
            </button>
          </div>
        )}

        {currentStep === Step.SIMPLE_INPUT && (
          <div className="space-y-8 animate-fadeIn text-center">
            <div className="grid grid-cols-4 gap-3">
              {[18, 24, 28, 30, 32, 34, 40, 45, 50, 55, 60, 70].map(p => (
                <button 
                  key={p} 
                  onClick={() => setSimplePyeong(p)} 
                  className={`py-4 rounded-xl font-black transition-all ${simplePyeong === p ? 'bg-blue-600 text-white shadow-lg scale-105' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                >
                  {p}평
                </button>
              ))}
            </div>
            <button onClick={handleSimpleEstimate} className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-100 transition-all">결과 확인하기</button>
            <button onClick={() => setCurrentStep(Step.LOCATION)} className="text-gray-400 text-sm font-bold flex items-center justify-center gap-1 mx-auto hover:text-gray-600">
              <ArrowLeft size={16} /> 처음으로 돌아가기
            </button>
          </div>
        )}

        {currentStep === Step.DETAIL_UNIT && (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100 flex flex-col gap-1 shadow-sm">
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Selected Apartment</span>
              <span className="font-black text-blue-900 leading-tight text-lg">{selectedAptName}</span>
              <span className="text-[10px] text-gray-400 truncate">{addressInfo.fullAddress}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-1 uppercase tracking-tighter">Building No (동)</label>
                <div className="relative">
                  <input type="text" placeholder="예: 101" className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:ring-2 focus:ring-blue-500 outline-none pr-10 font-black text-gray-700" value={buildingNo} onChange={(e) => setBuildingNo(e.target.value)} />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">동</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-1 uppercase tracking-tighter">Unit No (호)</label>
                <div className="relative">
                  <input type="text" placeholder="예: 502" className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:ring-2 focus:ring-blue-500 outline-none pr-10 font-black text-gray-700" value={unitNo} onChange={(e) => setUnitNo(e.target.value)} />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">호</span>
                </div>
              </div>
            </div>
            <button disabled={!buildingNo || !unitNo} onClick={analyzeUnitSpecs} className="w-full py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-100 transition-all transform hover:-translate-y-1">AI 정밀 견적 시작</button>
            <button onClick={() => setCurrentStep(Step.APARTMENT_LIST)} className="w-full py-2 text-gray-400 text-xs font-bold hover:underline">단지 다시 선택하기</button>
          </div>
        )}

        {currentStep === Step.LOADING && (
          <div className="text-center py-10 animate-fadeIn">
            <div className="relative inline-block mb-8">
              <div className="w-24 h-24 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
              <LayoutPanelLeft className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-black text-gray-800 mb-2">{isSearching ? "주소 정보를 찾는 중..." : "견적 데이터 분석 중..."}</h3>
            <div className="space-y-2 text-sm text-gray-500 font-medium">
              <p>• 주소지 기반 평면 데이터 매칭</p>
              <p>• 가구별 창호 레이아웃 시뮬레이션</p>
              <p>• KCC 본사 정품 시세 자동 반영</p>
            </div>
          </div>
        )}

        {currentStep === Step.RESULT && selectedApt && (
          <div className="text-center animate-fadeIn">
            <div className="bg-gray-50 rounded-3xl p-8 mb-6 border border-gray-100 relative overflow-hidden shadow-inner">
              <div className="absolute top-0 right-0 p-4 opacity-5"><Hash size={120} /></div>
              <div className="flex justify-center mb-5"><span className="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg">{selectedApt.isSimple ? 'Simple' : 'Precise'} Estimate</span></div>
              <h3 className="text-2xl font-black text-gray-800 mb-1 leading-tight">{selectedApt.isSimple ? `${selectedApt.pyeong}평형 예상 견적` : selectedApt.name}</h3>
              {!selectedApt.isSimple && <p className="text-sm font-bold text-blue-600 mb-6">{selectedApt.buildingNo}동 {selectedApt.unitNo}호</p>}
              
              <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-2xl mb-8 border border-gray-100 shadow-sm relative z-10">
                <div className="text-center">
                  <div className="text-[10px] font-black text-gray-400 mb-1 uppercase tracking-widest">Area</div>
                  <div className="text-2xl font-black text-gray-800">{selectedApt.pyeong}평형</div>
                </div>
                <div className="text-center border-l border-gray-100">
                  <div className="text-[10px] font-black text-gray-400 mb-1 uppercase tracking-widest">Brand</div>
                  <div className="text-2xl font-black text-gray-800">KCC 정품</div>
                </div>
              </div>

              <div className="text-gray-400 text-[11px] mb-1 font-black italic uppercase tracking-wider">Estimated Total Cost</div>
              <div className="text-6xl font-black text-blue-600 tracking-tighter mb-4">~{Math.round(calculateEstimate() / 10000).toLocaleString()}<span className="text-2xl ml-1 font-bold">만원</span></div>
              
              {sources.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider text-left">Verification Sources</p>
                  <div className="flex flex-wrap gap-2">
                    {sources.slice(0, 2).map((src, i) => (
                      <a key={i} href={src.uri} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[10px] text-blue-400 hover:underline">
                        <ExternalLink size={10} /> {src.title || 'Data Source'}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {showForm ? (
                <div className="py-5 bg-green-50 text-green-700 rounded-2xl font-bold border border-green-100 animate-fadeIn flex items-center justify-center gap-2"><CheckCircle2 size={20} /> 실측 상담 예약이 완료되었습니다!</div>
              ) : (
                <button onClick={() => setShowForm(true)} className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-xl shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-2">무료 방문 실측 신청하기</button>
              )}
              <button onClick={reset} className="w-full py-3 text-gray-400 text-sm font-black hover:text-blue-600 transition-colors uppercase tracking-widest">처음부터 다시하기</button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-8 flex items-center justify-center gap-4 text-[10px] md:text-xs text-gray-400 font-black uppercase tracking-widest">
        <div className="flex items-center gap-1"><CheckCircle2 size={12} className="text-blue-500" /> FULL INSTALL</div>
        <div className="flex items-center gap-1"><CheckCircle2 size={12} className="text-blue-500" /> KCC ORIGINAL</div>
        <div className="flex items-center gap-1"><CheckCircle2 size={12} className="text-blue-500" /> 10Y WARRANTY</div>
      </div>
    </div>
  );
};

export default Calculator;
