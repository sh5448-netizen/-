
export const HEALTH_CONCERNS = {
    PATELLAR_LUXATION: "Patellar Luxation (슬개골 탈구)",
    TRACHEAL_COLLAPSE: "Tracheal Collapse (기관지 협착증)",
    ALOPECIA_X: "Alopecia X (알로페시아 X / 블랙스킨병)",
    HEART_DISEASE: "Heart Disease (심장 질환)",
    DENTAL_ISSUES: "Dental Issues (치아 문제)",
};

export const NUTRITION_GUIDE = {
    JOINTS: {
        name: "Joint Support",
        name_ko: "관절 건강",
        concern: "patellarLuxation",
        green: ["Glucosamine", "Chondroitin", "MSM", "Green-lipped Mussel", "Omega-3", "Salmon"],
    },
    RESPIRATORY: {
        name: "Respiratory & Trachea Support",
        name_ko: "호흡기 & 기관지 건강",
        concern: "trachealCollapse",
        green: ["Omega-3", "Honey (small amounts)", "Vitamin C", "Hydrolyzed proteins", "Duck"],
    },
    SKIN: {
        name: "Skin & Coat Health (Alopecia X Care)",
        name_ko: "피부 & 피모 건강 (블랙스킨 케어)",
        concern: "alopeciaX",
        green: ["Omega-3 & 6", "Biotin", "Zinc", "High-quality protein (e.g., salmon, duck)", "Flaxseed"],
    },
    HEART: {
        name: "Heart Health",
        name_ko: "심장 건강",
        concern: "heartDisease",
        green: ["Coenzyme Q10", "L-Carnitine", "Taurine", "Omega-3", "Low-sodium chicken breast", "Spinach"],
    },
     DENTAL: {
        name: "Dental Health",
        name_ko: "치아 건강",
        concern: "dentalIssues",
        green: ["SHMP", "Probiotics", "Parsley", "Kelp", "Crunchy kibble"],
    },
};

export const RED_LIGHT_FOODS = {
    POISONS: {
        name: "Absolute Poisons",
        name_ko: "절대 금지 식품",
        items: ["Grapes/Raisins", "Onions", "Garlic", "Chocolate", "Macadamia Nuts", "Xylitol", "Avocado"],
    },
    CAUTIONS: {
        name: "Pomeranian-Specific Cautions",
        name_ko: "포메라니안 특별 주의 식품",
        items: ["High-fat foods (pancreatitis risk)", "Cooked bones", "High-sodium foods", "Artificial additives", "Corn", "Soy", "Wheat"],
    },
};