"use client"

import { useDispatch, useSelector } from 'react-redux'

import { useEffect } from 'react'
import { calculateTotal } from '@/lib/features/cart/cartSlice'

const Navbar = () => {
    const { amount, total, cartItems } = useSelector((store) => store.cart)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(calculateTotal());
    }, [cartItems])
    return (
        <>
            <nav className='flex bg-white h-14 px-4'>
                <div className='basis-1/4 grid grid-cols-4 place-items-start items-center'>
                    <small className='mx-auto'>Men</small>
                    <small className='mx-auto'>Electronics</small>
                    <small className='mx-auto'>Jewelry</small>
                    <small className='mx-auto'>Women</small>
                </div>
                <div className='basis-2/4 grid place-items-center'><h3>EasyCart</h3></div>
                <div className='basis-1/4 grid place-items-end items-center'>
                    <small>
                        {amount}
                        {total.toFixed(2)}
                    </small>
                </div>
            </nav>
            
        </>
    )
}

export default Navbar;