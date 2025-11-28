import { Address, Category, Order, OrderStatus, User } from '../types';

export const CURRENT_USER: User = {
  id: 'u123',
  name: '张三',
  phone: '13800138000',
  avatar: 'https://picsum.photos/100/100',
  points: 1250
};

export const CATEGORIES: Category[] = [
  { id: 'c1', name: '纸类', icon: 'FileText', priceDesc: '0.8元/kg' },
  { id: 'c2', name: '塑料', icon: 'Milk', priceDesc: '0.5元/kg' },
  { id: 'c3', name: '金属', icon: 'Hammer', priceDesc: '1.2元/kg' },
  { id: 'c4', name: '衣物', icon: 'Shirt', priceDesc: '0.4元/kg' },
  { id: 'c5', name: '电子', icon: 'Smartphone', priceDesc: '按件计价' },
  { id: 'c6', name: '家电', icon: 'Tv', priceDesc: '按件计价' },
];

// Mutable state for the session
let addresses: Address[] = [
  { id: 'a1', contactName: '张三', contactPhone: '13800138000', detail: '北京市朝阳区阳光小区1号楼202', tag: 'Home', isDefault: true },
  { id: 'a2', contactName: '张经理', contactPhone: '13912345678', detail: '北京市海淀区科技园A座', tag: 'Company', isDefault: false },
];

let orders: Order[] = [
  {
    id: 'ord_001',
    userId: 'u123',
    categoryIds: ['c1'],
    quantity: '10kg',
    imageUrls: ['https://picsum.photos/200/200'],
    appointmentTime: '2023-10-27T10:00:00',
    address: addresses[0],
    status: OrderStatus.COMPLETED,
    recycler: { name: '李师傅', phone: '13500000000', rating: 4.8 },
    createTime: '2023-10-26T09:00:00'
  },
  {
    id: 'ord_002',
    userId: 'u123',
    categoryIds: ['c2', 'c3'],
    quantity: '2袋',
    imageUrls: [],
    appointmentTime: '2023-11-15T14:30:00',
    address: addresses[0],
    status: OrderStatus.PENDING,
    createTime: '2023-11-15T08:00:00'
  }
];

// Helpers
export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Address Services
export const getAddresses = async (): Promise<Address[]> => {
  await wait(300);
  return [...addresses];
};

export const getAddressById = async (id: string): Promise<Address | undefined> => {
  await wait(200);
  return addresses.find(a => a.id === id);
};

export const saveAddress = async (address: Omit<Address, 'id'> & { id?: string }) => {
  await wait(500);
  if (address.isDefault) {
    addresses.forEach(a => a.isDefault = false);
  }
  
  if (address.id) {
    // Update
    addresses = addresses.map(a => a.id === address.id ? { ...a, ...address } as Address : a);
  } else {
    // Create
    const newAddr = { ...address, id: `a${Date.now()}` } as Address;
    addresses.push(newAddr);
  }
};

export const deleteAddress = async (id: string) => {
  await wait(300);
  addresses = addresses.filter(a => a.id !== id);
};

// Order Services
export const getOrders = async (): Promise<Order[]> => {
  await wait(300);
  return [...orders];
};

export const getOrderById = async (id: string): Promise<Order | undefined> => {
  await wait(300);
  return orders.find(o => o.id === id);
};

export const cancelOrder = async (id: string) => {
  await wait(500);
  orders = orders.map(o => o.id === id ? { ...o, status: OrderStatus.CANCELLED } : o);
};

export const createOrder = async (order: Order) => {
    await wait(800);
    orders.unshift(order);
};

// Export initial data for synchronous access if absolutely needed (prefer async)
export { addresses as MOCK_ADDRESSES, orders as MOCK_ORDERS };