import fs from 'fs';

const jsonPath = '/Users/deepak/.gemini/antigravity-ide/brain/0f4b9d88-da09-45b6-86dd-ee2066271705/scratch/extracted_india_map.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

const tsContent = `export interface IndiaStateData {
  name: string;
  id: string;
  path: string;
}

export const INDIA_MAP_DATA: IndiaStateData[] = ${JSON.stringify(data.states, null, 2)};
`;

fs.writeFileSync(
  '/Users/deepak/DeepakFreelance/ShaibyaSolutions/ShaibyaPortfolio/src/components/ui/india-map-data.ts',
  tsContent
);
console.log("Generated src/components/ui/india-map-data.ts successfully!");
