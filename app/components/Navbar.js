"use client"
import dynamic from 'next/dynamic'
import { useDispatch, useSelector } from 'react-redux'

import { useEffect } from 'react'
import { calculateTotal,showCartModal,hideCartModal } from '@/lib/features/cart/cartSlice'
import { rowdies } from '../dist/fonts'
import { Box, ClickAwayListener, Typography } from '@mui/material'
//import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

const ShoppingCartCheckoutIcon = dynamic(() => import('@mui/icons-material/ShoppingCartCheckout'));
const Navbar = () => {
    const { amount, total, cartItems,showCart } = useSelector((store) => store.cart)
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
                <div className='basis-2/4 grid place-items-center'><h2 className={rowdies.className}>EasyCart</h2></div>
                <div className='basis-1/4 grid place-items-end items-center'>
                <ClickAwayListener onClickAway={() => {
                    dispatch(hideCartModal())
                }}>
                <Box sx={{ position: 'relative' }}>
                    <button type="button" onClick={() => {
                        dispatch(showCartModal())
                    }}>
                        <small>
                            <ShoppingCartCheckoutIcon />
                            <b>{cartItems.length}</b>
                            {/* {amount}
                            {total.toFixed(2)} */}
                        </small>
                    </button>
                    {showCart ? (
                        <Box>
                            { cartItems.length == 0 &&
                                <Typography>There are no items in your cart</Typography>
                            }
                            { cartItems.length > 0 &&
                                <>{JSON.stringify(cartItems)}</>
                            }
                        </Box>
                    ) : null}
                </Box>
            </ClickAwayListener>
                </div>
            </nav>
            

        </>
    )
}

export default Navbar;