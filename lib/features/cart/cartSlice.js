import { createSlice } from "@reduxjs/toolkit";


export const getItems = async () => {
    
    const response = await fetch(`https://fakestoreapi.com/products`, {
        method: 'GET'
    });
    const data = await response.json();
    return data.map((x) => {
        return {
            ...x,
            price:x.price * 56,
            quantity: 0,
            supply: Math.trunc(Math.random()*20) + 1
        };
    });
};


const initialState = {
    shopItems:[],
    cartItems:[],
    amount:0,
    total:0,
    isLoading:true
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
            state.cartItems.push(targetItem);
            // state.isLoading = false;
            console.log(state.shopItems)
        },
        removeItem:(state,action) => {
            const itemId = action.payload
            state.cartItems = state.cartItems.filter((x) => x.id !== itemId)
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
        clearCart:(state) => {
            state.cartItems = [];
        } 
    }
})

export const {getShopItems,setCartItems,removeItem,toggleQuantity,clearCart,calculateTotal} = cartSlice.actions; 
export default cartSlice.reducer;