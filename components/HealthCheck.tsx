import React, { useState, useEffect } from 'react';
import { PomeranianProfile } from '../types';
import Card from './shared/Card';
import { ChartBarIcon, DocumentCheckIcon } from './icons';

interface HealthCheckProps {
  profile: PomeranianProfile;
}

const CHECKLIST_ITEMS = [
  { id: 'coughing', label: "이번 주에 '거위 소리' 같은 기침을 했나요?", concern: 'trachealCollapse' },
  { id: 'limping', label: "이번 주에 다리를 저는 모습을 보였나요?", concern: 'patellarLuxation' },
  { id: 'hairLoss', label: "새로운 탈모나 피부가 검게 변하는 증상이 있었나요?", concern: 'alopeciaX' },
  { id: 'panting', label: "평소보다 숨을 더 헐떡이거나 피곤해 보였나요?", concern: 'heartDisease' },
  { id: 'badBreath', label: "입냄새가 심하거나 잇몸 건강에 이상이 있었나요?", concern: 'dentalIssues' },
];

type CheckState = Record<string, boolean>;

const HealthCheck: React.FC<HealthCheckProps> = ({ profile }) => {
  const [checks, setChecks] = useState<CheckState>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const savedSubmission = localStorage.getItem(`healthCheck_${profile.name}_${getWeekId()}`);
    if (savedSubmission) {
      setChecks(JSON.parse(savedSubmission));
      setSubmitted(true);
    } else {
      const initialChecks = CHECKLIST_ITEMS.reduce((acc, item) => ({ ...acc, [item.id]: false }), {});
      setChecks(initialChecks);
      setSubmitted(false);
    }
  }, [profile.name]);

  const getWeekId = () => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(((now.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7);
    return `${now.getFullYear()}-W${weekNumber}`;
  };

  const handleCheckChange = (id: string, checked: boolean) => {
    setChecks(prev => ({ ...prev, [id]: checked }));
  };

  const handleSubmit = () => {
    localStorage.setItem(`healthCheck_${profile.name}_${getWeekId()}`, JSON.stringify(checks));
    setSubmitted(true);
    // In a real app, this data would be sent to a backend for trend analysis.
  };

  const relevantChecks = CHECKLIST_ITEMS.filter(item => {
    const concernKey = item.concern as keyof PomeranianProfile['healthConditions'];
    return profile.healthConditions[concernKey] || Object.values(profile.healthConditions).every(v => v === false || v === 0);
  });

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <DocumentCheckIcon className="w-6 h-6 text-rose-500 mr-2" />
          주간 건강 체크리스트
        </h2>
        <p className="text-gray-600 mb-6">{profile.name}의 건강 상태를 추적하여 잠재적인 문제를 조기에 발견하세요.</p>
        
        {submitted ? (
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800">이번 주 기록을 제출해주셔서 감사합니다!</h3>
            <p className="text-green-700 mt-1">우려되는 변화가 감지되면 알려드릴게요.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {relevantChecks.map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <label htmlFor={item.id} className="text-gray-700">{item.label}</label>
                <input
                  type="checkbox"
                  id={item.id}
                  checked={checks[item.id] || false}
                  onChange={(e) => handleCheckChange(item.id, e.target.checked)}
                  className="h-6 w-6 text-rose-600 border-gray-300 rounded-full focus:ring-rose-500 cursor-pointer"
                />
              </div>
            ))}
            <button onClick={handleSubmit} className="mt-6 w-full bg-rose-500 text-white py-3 rounded-lg font-semibold hover:bg-rose-600 transition-colors">
              이번 주 기록 제출하기
            </button>
          </div>
        )}
      </Card>
      
      <Card>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <ChartBarIcon className="w-6 h-6 text-purple-500 mr-2" />
          건강 트렌드
        </h2>
        <div className="text-center p-8 bg-gray-100 rounded-lg">
          <p className="text-gray-600">몇 주간 체크리스트를 기록하면 이곳에 건강 트렌드 차트가 표시됩니다.</p>
          <p className="text-sm text-purple-700 mt-4 font-semibold">이 기능은 포메케어+ 프리미엄 기능입니다.</p>
        </div>
      </Card>
    </div>
  );
};

export default HealthCheck;