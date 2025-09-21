import React from 'react';
import Card from './shared/Card';
import { UsersIconGroup, ChatBubbleLeftRightIcon, AcademicCapIcon, ShieldCheckIcon, HeartIcon, SpeakerWaveIcon, ChevronRightIcon } from './icons';

const Community: React.FC = () => {
  const forums = [
    { title: "기관지 협착증 관리", description: "켁켁거림 줄이는 노하우, 환경 관리", icon: SpeakerWaveIcon, color: "text-indigo-500", bgColor: "bg-indigo-100" },
    { title: "슬개골 탈구 관리", description: "관절 영양제, 재활 운동, 수술 후기", icon: ShieldCheckIcon, color: "text-blue-500", bgColor: "bg-blue-100" },
    { title: "알로페시아X (블랙스킨) 극복", description: "피모 관리, 효과 본 영양제 및 사료", icon: ShieldCheckIcon, color: "text-orange-500", bgColor: "bg-orange-100" },
    { title: "노견 심장병 케어", description: "심장병 관리 및 노견 돌봄 경험 공유", icon: HeartIcon, color: "text-red-500", bgColor: "bg-red-100" },
    { title: "치아 관리 꿀팁", description: "올바른 양치 방법과 치석 관리 제품", icon: ShieldCheckIcon, color: "text-teal-500", bgColor: "bg-teal-100" },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <div className="text-center">
          <UsersIconGroup className="w-12 h-12 mx-auto text-rose-500 mb-2" />
          <h2 className="text-xl font-semibold text-gray-800">포메라니안만 모여라!</h2>
          <p className="text-gray-600 mt-1">다른 포메 견주들과 소통해보세요.</p>
        </div>
      </Card>
      
      <div className="p-4 bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-lg">
          <div className="flex items-center">
              <AcademicCapIcon className="w-10 h-10 text-indigo-500 mr-4"/>
              <div>
                <h3 className="text-lg font-semibold text-indigo-800">수의사 Q&amp;A</h3>
                <p className="text-indigo-700">다음 세션 주제는 "포메라니안 슬개골 관리"입니다. 포메케어+ 회원 전용.</p>
              </div>
          </div>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <ChatBubbleLeftRightIcon className="w-6 h-6 text-gray-500 mr-2" />
          커뮤니티 포럼
        </h3>
        <div className="space-y-3">
          {forums.map((forum, index) => (
            <div key={index} className="flex items-center p-4 bg-white hover:bg-gray-50 rounded-xl shadow-sm border border-gray-200 cursor-pointer transition-all space-x-4">
              <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${forum.bgColor}`}>
                  <forum.icon className={`w-7 h-7 ${forum.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 truncate">{forum.title}</h4>
                  <p className="text-sm text-gray-600 truncate">{forum.description}</p>
              </div>
              <ChevronRightIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Community;