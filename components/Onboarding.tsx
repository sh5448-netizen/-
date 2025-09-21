import React, { useState, useRef } from 'react';
import { PomeranianProfile } from '../types';
import { CameraIcon, DogIcon } from './icons';

interface OnboardingProps {
  onSave: (profile: PomeranianProfile) => void;
}

const healthConditionKorean: { [key: string]: string } = {
  patellarLuxation: '슬개골 탈구',
  trachealCollapse: '기관지 협착증',
  alopeciaX: '알로페시아 X (블랙스킨병)',
  heartDisease: '심장 질환',
  dentalIssues: '치아 문제',
};

const Onboarding: React.FC<OnboardingProps> = ({ onSave }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<PomeranianProfile>({
    name: '',
    age: 1,
    weight: 2,
    gender: 'female',
    activityLevel: 'medium',
    currentFood: '',
    photo: '',
    neuterStatus: 'neutered',
    healthConditions: {
      patellarLuxation: false,
      patellarLuxationGrade: 0,
      trachealCollapse: false,
      alopeciaX: false,
      heartDisease: false,
      dentalIssues: false,
    },
    knownAllergies: [],
  });
  const [allergiesInput, setAllergiesInput] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setProfile(prev => ({ ...prev, photo: result }));
    };
  };

  const handleHealthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setProfile(prev => ({
      ...prev,
      healthConditions: { ...prev.healthConditions, [name]: checked },
    }));
  };

  const handleGradeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const grade = parseInt(e.target.value, 10) as 0 | 1 | 2 | 3 | 4;
    setProfile(prev => ({
      ...prev,
      healthConditions: { ...prev.healthConditions, patellarLuxationGrade: grade },
    }));
  };
  
  const handleSave = () => {
    const allergies = allergiesInput.split(',').map(a => a.trim()).filter(Boolean);
    onSave({ ...profile, knownAllergies: allergies });
  };
  
  const progressIndicator = (
      <div className="flex justify-between w-full max-w-xs mx-auto mb-8">
        {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`w-1/6 h-2 rounded-full transition-colors ${step > i ? 'bg-rose-500' : 'bg-gray-200'}`} />
        ))}
      </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">환영합니다!</h2>
            <p className="text-gray-600 mb-6 text-center">포메라니안의 사진을 등록하는 것으로 시작해봐요.</p>
            <div className="flex flex-col items-center space-y-4">
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                <div className="w-40 h-40 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border-2 border-dashed">
                    {imagePreview ? 
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" /> :
                        <DogIcon className="w-20 h-20 text-gray-400" />
                    }
                </div>
                <button onClick={() => fileInputRef.current?.click()} className="flex items-center justify-center bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                    <CameraIcon className="w-5 h-5 mr-2" />
                    사진 업로드
                </button>
            </div>
            <button onClick={handleNext} className="mt-8 w-full bg-rose-500 text-white py-3 rounded-xl font-semibold hover:bg-rose-600 transition-colors">다음</button>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">기본 정보</h2>
            <p className="text-gray-600 mb-6">반려견에 대해 조금만 알려주세요.</p>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">이름</label>
                <input type="text" name="name" id="name" value={profile.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700">나이 (세)</label>
                  <input type="number" name="age" id="age" value={profile.age} onChange={handleChange} min="0" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500" />
                </div>
                 <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-700">체중 (kg)</label>
                  <input type="number" name="weight" id="weight" value={profile.weight} onChange={handleChange} step="0.1" min="0" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500" />
                </div>
              </div>
               <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">성별</label>
                <select name="gender" id="gender" value={profile.gender} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm rounded-lg">
                  <option value="female">여아</option>
                  <option value="male">남아</option>
                </select>
              </div>
            </div>
             <div className="flex justify-between mt-8">
              <button onClick={handleBack} className="w-1/3 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors">이전</button>
              <button onClick={handleNext} disabled={!profile.name} className="w-1/3 bg-rose-500 text-white py-3 rounded-xl font-semibold hover:bg-rose-600 disabled:bg-rose-300 transition-colors">다음</button>
            </div>
          </div>
        );
      case 3:
        return (
           <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">라이프스타일</h2>
            <p className="text-gray-600 mb-6">반려견의 하루 일과를 알려주세요.</p>
            <div className="space-y-4">
              <div>
                <label htmlFor="activityLevel" className="block text-sm font-medium text-gray-700">활동량</label>
                <select name="activityLevel" id="activityLevel" value={profile.activityLevel} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm rounded-lg">
                  <option value="low">적음 (집순이/집돌이)</option>
                  <option value="medium">보통 (규칙적인 산책)</option>
                  <option value="high">많음 (에너자이저)</option>
                </select>
              </div>
              <div>
                <label htmlFor="neuterStatus" className="block text-sm font-medium text-gray-700">중성화 여부</label>
                <select name="neuterStatus" id="neuterStatus" value={profile.neuterStatus} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm rounded-lg">
                  <option value="neutered">예</option>
                  <option value="intact">아니오</option>
                </select>
              </div>
               <div>
                <label htmlFor="currentFood" className="block text-sm font-medium text-gray-700">현재 먹이는 사료 (선택)</label>
                <input type="text" name="currentFood" id="currentFood" value={profile.currentFood} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500" placeholder="예: 로얄캐닌 포메라니안 어덜트" />
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <button onClick={handleBack} className="w-1/3 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors">이전</button>
              <button onClick={handleNext} className="w-1/3 bg-rose-500 text-white py-3 rounded-xl font-semibold hover:bg-rose-600 transition-colors">다음</button>
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">건강 상태</h2>
            <p className="text-gray-600 mb-6">진단받은 질환이 있다면 선택해주세요. 맞춤 추천에 도움이 됩니다.</p>
            <div className="space-y-4">
              {Object.keys(profile.healthConditions).filter(k => k !== 'patellarLuxationGrade').map((key) => (
                 <div key={key} className="flex items-center">
                  <input id={key} name={key} type="checkbox" checked={profile.healthConditions[key as keyof typeof profile.healthConditions] as boolean} onChange={handleHealthChange} className="h-5 w-5 text-rose-600 border-gray-300 rounded focus:ring-rose-500" />
                  <label htmlFor={key} className="ml-3 block text-md text-gray-700">{healthConditionKorean[key] || key}</label>
                </div>
              ))}
              {profile.healthConditions.patellarLuxation && (
                <div>
                  <label htmlFor="patellarLuxationGrade" className="block text-sm font-medium text-gray-700 mt-4">슬개골 탈구 등급</label>
                  <select name="patellarLuxationGrade" id="patellarLuxationGrade" value={profile.healthConditions.patellarLuxationGrade} onChange={handleGradeChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm rounded-lg">
                    <option value="0">진단받지 않음</option>
                    <option value="1">1기</option>
                    <option value="2">2기</option>
                    <option value="3">3기</option>
                    <option value="4">4기</option>
                  </select>
                </div>
              )}
            </div>
            <div className="flex justify-between mt-8">
              <button onClick={handleBack} className="w-1/3 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors">이전</button>
              <button onClick={handleNext} className="w-1/3 bg-rose-500 text-white py-3 rounded-xl font-semibold hover:bg-rose-600 transition-colors">다음</button>
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">알고 있는 알러지</h2>
            <p className="text-gray-600 mb-6">반려견이 알러지 반응을 보이는 성분을 쉼표로 구분하여 입력해주세요 (예: 닭고기, 밀, 옥수수).</p>
            <textarea
              value={allergiesInput}
              onChange={(e) => setAllergiesInput(e.target.value)}
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500"
              placeholder="예: 닭고기, 옥수수, 콩"
            />
             <div className="flex justify-between mt-8">
              <button onClick={handleBack} className="w-1/3 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors">이전</button>
              <button onClick={handleSave} className="w-1/3 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors">완료 및 저장</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 h-full flex flex-col justify-center bg-stone-50">
      <div className="text-center mb-6">
        <DogIcon className="w-16 h-16 mx-auto text-rose-500" />
        <h1 className="text-3xl font-extrabold text-gray-900 mt-4">포메모여라!</h1>
        <p className="text-sm text-gray-500 mt-1">Made by 주현</p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        {progressIndicator}
        {renderStep()}
      </div>
    </div>
  );
};

export default Onboarding;