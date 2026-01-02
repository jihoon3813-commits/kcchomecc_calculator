
export enum Step {
  LOCATION = 'LOCATION',
  APARTMENT_LIST = 'APARTMENT_LIST',
  SIMPLE_INPUT = 'SIMPLE_INPUT',
  DETAIL_UNIT = 'DETAIL_UNIT',
  LOADING = 'LOADING',
  RESULT = 'RESULT'
}

export interface BrandInfo {
  id: string;
  name: string;
  description: string;
  priceFactor: number;
}

export interface ReplacementType {
  id: string;
  label: string;
  description: string;
  multiplier: number;
}

export interface ApartmentInfo {
  name: string;
  pyeong: number;
  address: string;
  buildingNo?: string;
  unitNo?: string;
  isSimple?: boolean;
}

export interface LocationState {
  city: string;
  gu: string;
  dong: string;
  fullAddress: string;
}
