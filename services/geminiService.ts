import { GoogleGenAI, Type } from "@google/genai";
import { PomeranianProfile, IngredientAnalysis } from "../types";
import { NUTRITION_GUIDE, RED_LIGHT_FOODS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const healthConditionKorean: { [key: string]: string } = {
  patellarLuxation: '슬개골 탈구',
  trachealCollapse: '기관지 협착증',
  alopeciaX: '알로페시아 X (블랙스킨병)',
  heartDisease: '심장 질환',
  dentalIssues: '치아 문제',
};

export const scanIngredients = async (
  base64Image: string,
  mimeType: string,
  profile: PomeranianProfile
): Promise<IngredientAnalysis> => {

  const knownAllergiesString = profile.knownAllergies.length > 0 ? profile.knownAllergies.join(', ') : '없음';
  const healthConditionsString = Object.entries(profile.healthConditions)
      .filter(([, value]) => value)
      .map(([key]) => healthConditionKorean[key] || key)
      .join(', ') || '특별한 건강 우려 없음';


  const prompt = `
    당신은 포메라니안 전문 수의 영양학 전문가입니다.
    제공된 이미지의 성분표를 다음 프로필을 가진 포메라니안을 위해 분석해주세요:
    - 나이: ${profile.age}살
    - 체중: ${profile.weight}kg
    - 성별: ${profile.gender === 'male' ? '남아' : '여아'}
    - 활동량: ${profile.activityLevel}
    - 건강 상태: ${healthConditionsString}
    - 알려진 알러지: ${knownAllergiesString}

    참고 정보:
    - 일반적으로 추천되는 영양소/식품:
      - 관절 (슬개골 탈구): ${NUTRITION_GUIDE.JOINTS.green.join(', ')}
      - 호흡기 (기관지 협착증): ${NUTRITION_GUIDE.RESPIRATORY.green.join(', ')}
      - 피부/피모 (알로페시아 X): ${NUTRITION_GUIDE.SKIN.green.join(', ')}
      - 심장: ${NUTRITION_GUIDE.HEART.green.join(', ')}
      - 치아: ${NUTRITION_GUIDE.DENTAL.green.join(', ')}
    - 피해야 할 식품:
      - 절대 금지 식품: ${RED_LIGHT_FOODS.POISONS.items.join(', ')}
      - 포메라니안 특별 주의 식품: ${RED_LIGHT_FOODS.CAUTIONS.items.join(', ')}. 특히 고지방 음식은 췌장염 위험을 높일 수 있으니 주의.

    과업:
    1.  이미지에서 모든 성분을 식별합니다.
    2.  각 성분에 대해, 이 포메라니안의 특정 프로필과 일반적인 포메라니안 가이드라인을 기반으로 'Green'(안전), 'Yellow'(주의), 'Red'(위험)으로 분류합니다.
    3.  각 분류에 대한 간결한 '이유'를 제공합니다. 특히 Yellow와 Red 항목에 대해, 강아지의 건강 프로필(예: 기관지 협착증, 알로페시아X)과 관련이 있다면 명확하게 연결지어 설명합니다.
    4.  이 제품이 이 특정 포메라니안에게 추천되는지에 대한 간략한 전체 '요약'을 작성합니다.
    5.  제공된 스키마와 일치하는 유효한 JSON 객체만 반환합니다. 다른 텍스트나 마크다운 서식을 포함하지 마세요.
    `;

  const imagePart = {
    inlineData: {
      data: base64Image,
      mimeType: mimeType,
    },
  };

  const textPart = {
    text: prompt,
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: "제품에 대한 전반적인 요약입니다." },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "성분명입니다." },
                  category: { type: Type.STRING, enum: ["Green", "Yellow", "Red"], description: "성분의 안전도 분류입니다 (Green: 안전, Yellow: 주의, Red: 위험)." },
                  reason: { type: Type.STRING, description: "분류에 대한 이유입니다." },
                },
                required: ["name", "category", "reason"]
              },
            },
          },
          required: ["summary", "ingredients"]
        },
      },
    });

    const jsonString = response.text.trim();
    // Validate if the response is a parsable JSON.
    JSON.parse(jsonString);

    return JSON.parse(jsonString) as IngredientAnalysis;
  } catch (error) {
    console.error("Error calling Gemini API or parsing response:", error);
    throw new Error("AI로부터 분석 결과를 가져오는 데 실패했습니다. 응답 형식이 잘못되었거나 API 호출에 실패했을 수 있습니다.");
  }
};
