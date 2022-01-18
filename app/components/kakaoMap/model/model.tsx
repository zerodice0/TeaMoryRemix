export interface MapData {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: number;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: number;
  y: number;
}

export interface Pagenation {
  current: number;
  first: number;
  hasMaxPage: boolean;
  hasNextPage: boolean;
  last: number;
  perPage: number;
  totalCount: number;
  gotoFirst: () => void;
  gotoLast: () => void;
  gotoPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export type UpdateSearchKeyword = (data:MapData[], status:string, pagination:Pagenation) => void