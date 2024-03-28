"use client"

import {  getShopItems,setCartItems,clearCart, getItems,removeItem,toggleQuantity,calculateTotal} from '@/lib/features/cart/cartSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'

export default function CardContainer() {
    const dispatch = useDispatch();
    const { amount, shopItems,cartItems } = useSelector((store:any) => store.cart)

    
    const fetchData = async () => {
        try {
            const items = await getItems();
            dispatch(getShopItems(items));
        } catch (error) {
            // Handle error
        }
    };

    useEffect(() => {
        if(shopItems.length == 0){
            fetchData()
        }
    },[dispatch])

    return <>
        <section className='grid grid-cols-3 gap-4'>
            {shopItems.map((x:any,index:number) => 
                <div key={index} className='cartItem'>
                    <Image src={x.image} width={200} height={200} alt={`Picture of ${x.title}`} className='aspect-square mix-blend-multiply object-contain my-0 mx-auto' />
                    {/* <Image src={x.image} width={100} height={100} alt={`Picture of ${x.title}`} loading="lazy" /> */}
                    <div className='other-details'>
                    
                    <b>{x.title}</b>
                    <em>{x.quantity}</em>
                    <b>{x.supply} Left</b>
                    <button onClick={() => {
                        dispatch(toggleQuantity({
                            id:x.id,
                            type:"increase"
                        }))
                    }}>+</button>
                    <button onClick={() => {
                        dispatch(toggleQuantity({
                            id:x.id,
                            type:"decrease"
                        }))
                    }}>-</button>
                    <a onClick={() => {
                        dispatch(removeItem(x.id))
                    }} 
                    className='text-pink-500'>Remove</a>
                    </div>
                </div>
            )}
        </section>
    </>
}