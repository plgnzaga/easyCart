import { createSlice } from "@reduxjs/toolkit";
import cartState from "@/app/types/CartState";

export const getItems = async () => {
    
    const response = await fetch(`https://fakestoreapi.com/products`, {
        method: 'GET'
    });
    const data = await response.json();
    return data.map((x:any) => {
        return {
            ...x,
            price:x.price * 56,
            quantity: 0,
            isAdded:false,
            supply: Math.trunc(Math.random()*20) + 1
        };
    });
};


const initialState:cartState = {
    shopItems: [],
    cartItems: [],
    amount: 0,
    total: 0,
    showCart: false,
    isLoading: true
}
const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        getShopItems:(state, action) => {
            state.shopItems = action.payload;
            state.isLoading = false;
        },
        setCartItems: (state, {payload}) => {
            const itemId = payload.id;
            const targetItem = state.shopItems.find((x) => x.id === itemId);
            targetItem.isAdded = true;
            state.cartItems.push(targetItem);
            // state.isLoading = false;
            console.log(state.shopItems)
        },
        removeItem:(state,action) => {
            const itemId = action.payload
            state.cartItems = state.cartItems.filter((x) => x.id !== itemId)
            const targetItem = state.shopItems.find((x) => x.id === itemId);
            targetItem.isAdded = false;
        },
        toggleQuantity:(state,{payload}) => {
            const targetItem = state.cartItems.find((x) => x.id === payload.id)
            if(payload.type === 'increase'){
                targetItem.quantity += 1
            }
            else if(payload.type === 'decrease' && targetItem.quantity > 0){
                targetItem.quantity -= 1
            }
        },
        calculateTotal:(state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.quantity;
                total += item.quantity * item.price
            })
            state.amount = amount;
            state.total = total;
        },
        showCartModal:(state) => {
            state.showCart = true;
        },
        hideCartModal:(state) => {
            state.showCart = false;
        },
        clearCart:(state) => {
            state.cartItems = [];
        } 
    }
})

export const {getShopItems,setCartItems,removeItem,toggleQuantity,clearCart,calculateTotal,showCartModal,hideCartModal} = cartSlice.actions; 
export default cartSlice.reducer;