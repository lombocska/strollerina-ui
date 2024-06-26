import { Dispatch, SVGProps, SetStateAction } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type CarseatCard = {
  id: string;
  generatedId:string;
  brand: string;
  brandValue: string;
  name: string;
  img:string;
  priceFrom: string;
  bestAdac: number;
};

export type StrollerCard = {
  id: string;
  generatedId:string;
  brand: string;
  brandValue: string;
  name: string;
  img:string;
  priceFrom: number;
  weight: string;
  openHeight: string;
  cabinApproved: boolean;
  lightweight: boolean;
  doubleStroller: string;
  reversibleSeat: boolean;
  recliningSeat: boolean;
  suitableForTallKids: boolean;
  suitableForChubbyKids: boolean;
  tags: any;
  sumLoadCapacity: number;
  seatLoadCapacity: number;
  basketCapacity: number;
  minAge: number;
  maxAge: number;
};


export type CarseatsContentProps =  CarseatCard[];


export type StrollersContentProps = StrollerCard[];


export type BrandContentProps = {
  brands: BrandItem[];
};
export type BrandItem = {
  name: string;
  img:string;
  value: string;
};

export type AdacInfo = {
  adac: string;
  adacLink: string;
  adacTestedYear: number;
  installation: string;
  priceFrom: number;
};

export type AdacType = {
  name: string;
  value: 'VERY_GOOD' | 'GOOD' | 'SATISFACTORY' | 'POOR';
};



export type FacingType = {
  name: string;
  value: 'FORWARD' | 'REAR';
};
export interface AdacSelectionProps {
  adacs: AdacType[];
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  isCleared: boolean;
}

export type CarseatCardDTO = {
  brand: string;
  name: string;
  id: number;
  img: string;
  tags: string[];
  weight: number;
  minWeight: number;
  maxWeight: number;
  video: string;
  minAge: number;
  maxAge: number;
  minHeight: number;
  maxHeight: number;
  lieFlat: boolean;
  recliningPositions: number;
  rearFacing: boolean;
  forwardFacing: boolean;
  airplaneApproved: boolean;
  sideProtection: boolean;
  rotating: boolean;
  adacInfo: AdacInfo[];
};

export type StrollerInfoDTO = {
  id: number;
  generatedId: string;
  brand: string;
  brandValue: string;
  name: string;
  weight: number;
  openHeight: number;
  openWidth: number;
  openLength: number;
  closedHeight: number;
  closedWidth: number;
  closedLength: number;
  link: string;
  manualLink?: string;
  img: string;
  video: string;
  priceFrom: number;
  description: string;
  sumLoadCapacity: number;
  seatLoadCapacity: number;
  basketLoadCapacity: number;
  frontWheelSize: number;
  backWheelSize: number;
  backrestHeight: number;
  seatWidth: number;
  minAge: number;
  maxAge: number;
  doubleStroller: boolean;
  reversibleSeat: boolean;
  recliningSeat: boolean;
  tags: string[];
};

export type ManualDTO = {
  manualLink: string;
  name: string;
  img: string;
  brandName: string;
};

export type ProductCardProps = {
  name: string;
  brand: string;
  img: string;
  price: number | null;
  generatedId: string;
  brandValue: string;
  infoLinkPrefix: string;
}

export type CarSeatFiltersProps = Partial<{
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  isCleared: boolean; // Pontos típus
  brands: BrandContentProps;
  setCarseats: React.Dispatch<React.SetStateAction<CarseatCard[]>>;
  filters: any;
  initialFilters: any;
}>;



export type CarSeatFilters = {
  brandsName: string[]; // Example type, adjust as per actual implementation
  adacsName: string[];
  facingMode: string[];
  maxWeigth: number;
  maxKidWeight: number;
  maxKidHeight: number;
  onlyWAdacTest: boolean;
  maxPrice: number;
  tags: string[];
};


export type StrollerFiltersProps = Partial<{
  isCleared: boolean | false;
  brands: BrandContentProps;
  setStrollers: React.Dispatch<React.SetStateAction<StrollerCard[]>>;
  filters: any; // Adjust as per your actual filters type
  initialFilters: any; // Adjust as per your actual initialFilters type
  setFilters: React.Dispatch<React.SetStateAction<any>>; // Adjust as per your actual setFilters type
}>;

export type StrollerFilters = {
  brandsName: string[]; // Módosítsd a tényleges típusra, ha brandsName típusa nem string tömb
  maxHeight: number;
  closedMaxHeight: number;
  maxWidth: number;
  maxLength: number;
  closedMaxLength: number;
  maxWeight: number;
  maxPrice: number;
  minSeatHeight: number;
  minFrontWheelSize: number;
  minBackWheelSize: number;
  tags: string[]; // Módosítsd a tényleges típusra, ha tags típusa nem string tömb
};

export interface Tag {
  section: string;
  name: string;
  label: string;
  tooltip: string;
}

export interface TagsProps {
  tags: Tag[];
  section: string;
  lsName: string;
  isCleared: boolean;
  setFilters: React.Dispatch<React.SetStateAction<any>>; // Módosítsd az any típust a saját state típusodra
}

export interface NumberInputProps {
  title: string;
  label: string;
  inputValue:  string; // Az inputValue lehet string, mivel a <Input> komponens value prop-ja stringet vár
  setInputValue: (value: number | string) => void;
  demo?: React.ReactNode;
  endContent?: React.ReactNode | null; // endContent lehet React komponens vagy null
  min?: number;
  max?: number;
  step?: number;
}