import React, { useMemo } from 'react';
import { PomeranianProfile } from '../types';
import { NUTRITION_GUIDE, RED_LIGHT_FOODS } from '../constants';
import Card from './shared/Card';
import { CheckCircleIcon, XCircleIcon, SparklesIcon } from './icons';

interface DashboardProps {
  profile: PomeranianProfile;
}

const Dashboard: React.FC<DashboardProps> = ({ profile }) => {
  const recommendations = useMemo(() => {
    const greenLights: { name: string, items: string[] }[] = [];
    const activeConcerns = Object.entries(profile.healthConditions)
        .filter(([, value]) => value === true)
        .map(([key]) => key);

    if (activeConcerns.length === 0) {
        // Default recommendations if no specific conditions are selected
        greenLights.push({ name: NUTRITION_GUIDE.JOINTS.name_ko, items: NUTRITION_GUIDE.JOINTS.green.slice(0, 3) });
        greenLights.push({ name: NUTRITION_GUIDE.SKIN.name_ko, items: NUTRITION_GUIDE.SKIN.green.slice(0, 3) });
        greenLights.push({ name: NUTRITION_GUIDE.RESPIRATORY.name_ko, items: NUTRITION_GUIDE.RESPIRATORY.green.slice(0, 3) });
    } else {
        Object.values(NUTRITION_GUIDE).forEach(guide => {
            if (activeConcerns.includes(guide.concern)) {
                greenLights.push({ name: guide.name_ko, items: guide.green.slice(0, 4) });
            }
        });
    }

    return { greenLights };
  }, [profile]);

  return (
    <div className="space-y-6">
      <div className="p-5 bg-gradient-to-br from-rose-400 to-orange-300 text-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold">오늘의 {profile.name} 맞춤 식단</h1>
        <p className="mt-1 opacity-90">{profile.name}를 위한 오늘의 식단 제안</p>
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <CheckCircleIcon className="w-6 h-6 text-green-500 mr-2" />
          청신호 식품 (추천)
        </h2>
        <div className="space-y-4">
            {recommendations.greenLights.map(rec => (
                <div key={rec.name}>
                    <h3 className="font-semibold text-gray-700">{rec.name}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {rec.items.map(item => (
                            <span key={item} className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">{item}</span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <XCircleIcon className="w-6 h-6 text-red-500 mr-2" />
          적신호 식품 (주의)
        </h2>
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-gray-700">{RED_LIGHT_FOODS.POISONS.name_ko}</h3>
            <p className="text-sm text-gray-600">{RED_LIGHT_FOODS.POISONS.items.join(', ')}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">{RED_LIGHT_FOODS.CAUTIONS.name_ko}</h3>
            <p className="text-sm text-gray-600">{RED_LIGHT_FOODS.CAUTIONS.items.join(', ')}</p>
          </div>
           {profile.knownAllergies.length > 0 && (
                <div>
                    <h3 className="font-semibold text-yellow-700">알고 있는 알러지 유발 식품</h3>
                    <p className="text-sm text-gray-600">{profile.knownAllergies.join(', ')}</p>
                </div>
           )}
        </div>
      </Card>
      
      <div className="mt-6 p-4 border-2 border-dashed border-purple-300 rounded-xl bg-purple-50 text-center">
          <SparklesIcon className="w-8 h-8 mx-auto text-purple-500 mb-2"/>
          <h3 className="text-lg font-semibold text-purple-800">포메케어+</h3>
          <p className="text-sm text-purple-700 mt-1">업그레이드하고 AI 맞춤 식단과 수의 영양사 1:1 채팅을 이용해보세요!</p>
          <button className="mt-3 bg-purple-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors">더 알아보기</button>
      </div>
    </div>
  );
};

export default Dashboard;