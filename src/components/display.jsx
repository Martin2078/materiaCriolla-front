/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import CheckoutIcon from '../../public/images/checkout.png'
import LogOut from '../../public/images/logOut.png'
import Information from '../../public/images/information.png'
import { Link } from 'react-router-dom'
import HomeIcon from '../../public/images/home.png'
import ProductsIcon from '../../public/images/mate.png'
import menu from '../../public/images/menu.png'
import close from '../../public/images/close.png'
import logIn from '../../public/images/logIn.png'
import register from '../../public/images/register.png'

const display = ({ open, setOpen }) => {
    return (
        <div className={`relative ${open ? "w-3/12" : "w-1/12"} lg:h-screen min-[320px]:h-1/6 flex lg:flex-col items-center justify-between pt-20 pb-10 border border-r-black`}>
            <img onClick={() => setOpen(!open)} className={`absolute min-[320px]:hidden lg:block cursor-pointer ${!open ? "top-4 left-9 w-6" : "top-2 right-2 w-8"}`} src={!open ? menu : close} alt="" />
            <div className='w-full flex justify-center items-start gap-5'>
                <Link to={'/Me'}><img className='w-16 h-16 rounded-full' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" /></Link>
                {open &&
                    <div>
                        <h1 className='font-bold text-xl'>name</h1>
                        <p className='text-sm'>email@gmail.com</p>
                    </div>
                }
            </div>

            <div className={`flex flex-col ${open ? "items-start" : "items-center"} justify-start gap-10 w-2/4 h-4/6`}>
                <Link to={'/'} className='flex gap-4 justify-start'>
                    <img className='w-6 h-6' src={HomeIcon} alt="" />
                    {open && "Home"}
                </Link>
                <Link to={'/'} className='flex gap-4 justify-start'>
                    <img className='w-6 h-6' src={ProductsIcon} alt="" />
                    {open && "Products"}
                </Link>
                <Link to={'/'} className='flex gap-4 justify-start'>
                    <img className='w-6 h-6' src={Information} alt="" />
                    {open && "Information"}
                </Link>
                <Link to={'/'} className='flex gap-4 justify-start'>
                    <img className='w-6 h-6 ' src={CheckoutIcon} alt="" />
                    {open && "Checkout"}
                </Link>
                {/* {!token ? <>
                    <Link to={'/'} className='flex gap-4'>
                        <img className='w-6 h-6 ' src={logIn} alt="" />
                        {open && "Log In"}
                    </Link>
                    <Link to={'/'} className='flex gap-4'>
                        <img className='w-6 h-6 ' src={register} alt="" />
                        {open && "Register"}
                    </Link>
                </>
                    :
                    <Link to={'/'}>        <img className='w-6 h-6 rounded-full' src={LogOut} alt="" />
                        {open && "Log Out"}</Link>
                } */}
            </div>
            <img className='w-16 h-16 rounded-full' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" />
        </div>
    )
}

export default display