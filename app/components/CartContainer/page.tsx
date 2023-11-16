"use client"
import dynamic from 'next/dynamic';
import { getShopItems, setCartItems, clearCart, getItems, removeItem, toggleQuantity, calculateTotal } from '@/lib/features/cart/cartSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import { Button } from '@mui/material';
import cartState from '@/app/types/CartState';
const AddShoppingCartIcon = dynamic(() => import('@mui/icons-material//AddShoppingCart'));
const DeleteOutlineIcon = dynamic(() => import('@mui/icons-material/DeleteOutline'));
export default function CardContainer() {
    const dispatch = useDispatch();

    

    const { amount, shopItems, cartItems } = useSelector((store: {
        cart:cartState
    }) => store.cart)


    const fetchData = async () => {
        try {
            const items = await getItems();
            dispatch(getShopItems(items));
        } catch (error) {
            // Handle error
        }
    };

    useEffect(() => {
        if (shopItems.length == 0) {
            fetchData()
        }
    }, [dispatch])

    return <>
        <section className='grid grid-cols-3 gap-4 my-10'>
            
            {shopItems?.map((x: any, index: number) =>
                <div key={index} className='cartItem'>
                    <Image src={x.image} width={200} height={200} loading="lazy"
                        alt={`Picture of ${x.title}`} className='aspect-square mix-blend-multiply object-contain my-0 mx-auto' />
                    <div className='other-details flex flex-wrap gap-y-4'>
                        <span className='basis-full max-w-60 truncate'><b>{x.title}</b></span>
                        <div className='basis-1/2 text-gray-800'>
                            ₱{x.price}
                        </div>
                        <div className='basis-1/2 text-end'>
                            {!x.isAdded &&
                                <Button onClick={() => {
                                    dispatch(setCartItems({ id: x.id }))
                                }}
                                    className='bg-black hover:bg-gray-600 text-white active:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 px-2'>
                                    <AddShoppingCartIcon style={{ fontSize: '17px' }} />
                                </Button>
                            }
                            {x.isAdded &&
                                <Button onClick={() => {
                                    dispatch(removeItem(x.id))
                                }}
                                    className='bg-white border border-gray-300 text-dark hover:bg-black hover:text-white active:bg-black px-2'>
                                    <DeleteOutlineIcon style={{ fontSize: '17px' }} />
                                </Button>
                            }

                        </div>
                    </div>
                </div>
            )}
        </section>
    </>
}
{/* 
TODO:
Add, add to favorites
Add modal for current cart
Typescript bro

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
                    className='text-pink-500'>Remove</a>*/}