import React, { useState, useRef } from 'react';
import { PomeranianProfile, IngredientAnalysis } from '../types';
import { scanIngredients } from '../services/geminiService';
import Card from './shared/Card';
import { CameraIcon, SparklesIcon, DocumentMagnifyingGlassIcon } from './icons';
import LoadingSpinner from './shared/LoadingSpinner';

interface ScannerProps {
  profile: PomeranianProfile;
}

const Scanner: React.FC<ScannerProps> = ({ profile }) => {
  const [analysis, setAnalysis] = useState<IngredientAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setAnalysis(null);
    setError(null);
    setIsLoading(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async (e) => {
      const base64Image = (e.target?.result as string).split(',')[1];
      setImagePreview(e.target?.result as string);
      
      try {
        const result = await scanIngredients(base64Image, file.type, profile);
        setAnalysis(result);
      } catch (err) {
        setError('성분 분석에 실패했습니다. 더 선명한 이미지로 다시 시도해주세요.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
     reader.onerror = () => {
        setError('이미지 파일을 읽는 데 실패했습니다.');
        setIsLoading(false);
    };
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const getCategoryClass = (category: 'Green' | 'Yellow' | 'Red') => {
    switch (category) {
      case 'Green': return 'bg-green-100 text-green-800';
      case 'Yellow': return 'bg-yellow-100 text-yellow-800';
      case 'Red': return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="text-center">
            <DocumentMagnifyingGlassIcon className="w-12 h-12 mx-auto text-rose-500 mb-2" />
            <h2 className="text-xl font-semibold text-gray-800">AI 영양 성분 스캐너</h2>
            <p className="text-gray-600 mt-2 mb-6">간식의 성분표를 스캔하여 {profile.name}에게 안전한지 즉시 확인해보세요.</p>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />
            <button
                onClick={handleButtonClick}
                disabled={isLoading}
                className="w-full bg-rose-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-rose-600 transition-colors flex items-center justify-center disabled:bg-rose-300"
            >
                <CameraIcon className="w-6 h-6 mr-2" />
                {isLoading ? '분석 중...' : '성분표 스캔하기'}
            </button>
        </div>
      </Card>
      
      {isLoading && <LoadingSpinner />}
      
      {error && <div className="p-4 bg-red-100 text-red-800 rounded-lg">{error}</div>}

      {imagePreview && !isLoading && (
        <Card>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">스캔한 이미지:</h3>
            <img src={imagePreview} alt="Ingredient list preview" className="rounded-lg max-h-60 w-auto mx-auto" />
        </Card>
      )}

      {analysis && (
        <Card>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <SparklesIcon className="w-6 h-6 text-purple-500 mr-2" />
            분석 결과
          </h2>
          <div className="p-4 bg-gray-50 rounded-lg mb-4">
            <p className="font-semibold text-gray-800">요약:</p>
            <p className="text-gray-600">{analysis.summary}</p>
          </div>
          <div className="space-y-2">
            {analysis.ingredients.map((item, index) => (
              <div key={index} className="p-3 border rounded-md">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{item.name}</span>
                  <span className={`px-2 py-0.5 text-sm font-semibold rounded-full ${getCategoryClass(item.category)}`}>
                    {item.category === 'Green' ? '안전' : item.category === 'Yellow' ? '주의' : '위험'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{item.reason}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default Scanner;