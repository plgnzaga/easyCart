export default interface cartState {
    shopItems: any[]; 
    cartItems: any[];
    amount: number;
    total: number;
    showCart: boolean;
    isLoading: boolean;
}