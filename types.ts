export enum OrderStatus {
  PENDING = 0,   // 待接单
  ACCEPTED = 1,  // 已接单
  IN_PROGRESS = 2, // 上门中
  COMPLETED = 3, // 已完成
  CANCELLED = 4  // 已取消
}

export interface User {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  points: number;
}

export interface Address {
  id: string;
  contactName: string;
  contactPhone: string;
  detail: string;
  tag: 'Home' | 'Company' | 'Other';
  isDefault: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string; // Lucide icon name or image url
  priceDesc: string;
}

export interface Order {
  id: string;
  userId: string;
  categoryIds: string[];
  quantity: string; // e.g., "5kg"
  imageUrls: string[];
  appointmentTime: string; // ISO string
  address: Address;
  status: OrderStatus;
  recycler?: {
    name: string;
    phone: string;
    rating: number;
  };
  createTime: string;
}

export interface ChartData {
  name: string;
  value: number;
}