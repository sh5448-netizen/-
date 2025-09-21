export interface PomeranianProfile {
  name: string;
  age: number;
  weight: number;
  gender: 'male' | 'female';
  activityLevel: 'low' | 'medium' | 'high';
  currentFood: string;
  photo?: string; // base64 encoded image
  neuterStatus: 'neutered' | 'intact';
  healthConditions: {
    patellarLuxation: boolean;
    patellarLuxationGrade: 1 | 2 | 3 | 4 | 0;
    trachealCollapse: boolean;
    alopeciaX: boolean; // Alopecia X / Black Skin Disease
    heartDisease: boolean;
    dentalIssues: boolean;
  };
  knownAllergies: string[];
}

export enum Screen {
  Dashboard = 'Dashboard',
  HealthCheck = 'HealthCheck',
  Scanner = 'Scanner',
  Community = 'Community',
  Shop = 'Shop',
}

export interface IngredientAnalysis {
  summary: string;
  ingredients: Array<{
    name: string;
    category: 'Green' | 'Yellow' | 'Red';
    reason: string;
  }>;
}