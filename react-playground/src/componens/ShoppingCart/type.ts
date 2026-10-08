export type Product =  {
    id: number;
    name: string;
    priceInCents: number;
    stock: number;
}

export type CartItem = {
    productId: number;
    quantity: number;
    selected: boolean;
}

export type OrderItem = {
    productId: number;
    name: string;
    quantity: number;
    unitPriceInCents: number;
}

export type Order = {
    id: number;
    createdAt: string;
    items: OrderItem[];
    totalInCents: number;
}