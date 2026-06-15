export interface Restriction {
  id: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  law_base: string;
}

export interface KkhParams {
  historical_weight: number; // I (0..5)
  architectural_rarity: number; // U (0..5)
  public_awareness: number; // P (0..5)
  constraint_points: number; // O (0..5)
}

export interface OknObject {
  id: string;
  cadastral_number: string;
  name: string;
  address: string;
  area: number;
  year_built: number;
  floors: number;
  walls_material: string;
  okn_category: string;
  is_okn: boolean;
  wear_pct: number;
  history: string;
  coordinates: [number, number]; // [lat, lng]
  bti_pdf_url: string;
  restrictions: Restriction[];
  kkh_params: KkhParams;
  photos?: string[];
  photosFolder?: string; // для жёсткой привязки галереи (hard mapping)
  building_outline?: [number, number][];
}

export interface Analogue {
  id: string;
  name?: string;
  address: string;
  area: number;
  year_built: number;
  floors: number;
  walls_material: string;
  is_okn: number; // 1.0 = yes, 0.0 = no
  wear_pct: number;
  dist_metro_min: number;
  infrastructure_rate: number;
  noise_rate: number;
  parking: number; // 1.0 = yes, 0.0 = no
  view_rate: number;
  base_price: number;
  cyan_url: string;
  similarity: number; // 0..1 from k-NN
  price_per_sqm: number; // base price / area
  building_outline?: [number, number][];
  coordinates?: [number, number];
  photos?: string[];
}

export interface ManualAdjustment {
  area: number;          // percent offset e.g., -5% to +5% or coeff 0.95 to 1.05
  condition: number;     // e.g., -10% to +10%
  transport: number;     // e.g., -5% to +5%
  view: number;          // e.g., -5% to +5%
  infrastructure: number;// e.g., -5% to +5%
  justification: string; // Required comment text
}

export interface ValuationWeights {
  comparative: number;   // w_comp
  income: number;        // w_inc
  cost: number;          // w_cost
}
