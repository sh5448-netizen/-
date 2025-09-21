import React from 'react';
import Card from './shared/Card';
import { ShoppingCartIcon, SparklesIcon, ChevronRightIcon } from './icons';

const Shop: React.FC = () => {
  const productCategories = [
    { name: '수의사 추천 사료', description: '포메라니안 맞춤 영양 설계' },
    { name: '관절 & 기관지 영양제', description: '슬개골과 호흡기 건강을 위한 필수템' },
    { name: '치아 관리 용품', description: '작은 입을 위한 특별 케어' },
    { name: '피모 관리 솔루션', description: '알로페시아X 예방 및 관리' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <div className="text-center">
          <ShoppingCartIcon className="w-12 h-12 mx-auto text-emerald-500 mb-2" />
          <h2 className="text-2xl font-bold text-gray-800">화해 펫 스토어</h2>
          <p className="text-gray-600 mt-1">포메 보호자들을 위해 신중하게 고른 제품만 모았어요.</p>
        </div>
      </Card>
      
      <Card>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <SparklesIcon className="w-6 h-6 text-purple-500 mr-2" />
          카테고리별 상품
        </h3>
        <div className="space-y-3">
          {productCategories.map((category, index) => (
            <a key={index} href="#" className="flex items-center p-4 bg-white hover:bg-gray-50 rounded-xl shadow-sm border border-gray-200 cursor-pointer transition-all space-x-4">
              <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 truncate">{category.name}</h4>
                  <p className="text-sm text-gray-600 truncate">{category.description}</p>
              </div>
              <ChevronRightIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </a>
          ))}
        </div>
      </Card>

      <div className="mt-6 p-5 bg-gradient-to-r from-emerald-400 to-cyan-400 text-white rounded-2xl shadow-lg text-center">
          <h3 className="text-xl font-bold">지금 바로 쇼핑하러 가기!</h3>
          <p className="text-sm opacity-90 mt-1">포메를 위한 최고의 선택, '화해'에서 만나보세요.</p>
          <button 
            onClick={() => alert('자사 쇼핑몰로 이동합니다!')}
            className="mt-4 bg-white text-emerald-600 px-6 py-2 rounded-lg font-bold hover:bg-emerald-50 transition-colors"
          >
            '화해' 방문하기
          </button>
      </div>
    </div>
  );
};

export default Shop;
