/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import CheckoutIcon from '/images/checkout.png?url'
import LogOut from '/images/logOut.png?url'
import Information from '/images/information.png?url'
import { Link } from 'react-router-dom'
import HomeIcon from '/images/home.png?url'
import ProductsIcon from '/images/mate.png?url'
import menu from '/images/menu.png?url'
import close from '/images/close.png?url'
import logIn from '/images/signIn.png'
import register from '/images/register.png?url'
import logo from '/images/logo.png'
import edit from "/images/edit.png"
import { useSelector, useDispatch } from 'react-redux'
import signOut from '../redux/actions/signOutAction.js'
import { useSpring, animated } from '@react-spring/web'

const display = ({ open, setOpen }) => {
    const { user, token } = useSelector((store) => store.profile)
    const [screenwidth, setScreenWidth] = useState(window.innerWidth)
    const dispatch = useDispatch()
    async function closeAccount() {
        dispatch(signOut(token))
    }
    const animacion = useSpring({
        from: {
            width: screenwidth>=1024 ? open ? "9vw" : "15vw" : open ? "100vw" : "100vw",
            height: screenwidth<1024 ? open ? "20vh" : "100vh" : "100vh"
        },
        to: {
            width: screenwidth>=1024 ? open ? "28vw" : "9vw" : open ? "100vw" : "100vw",
            height: screenwidth<1024 ? open ? "100vh" : "20vh" : "100vh"
        },
        config: { duration: 500 }
    })
    const handleResize = () => {
        setScreenWidth(window.innerWidth)
        console.log(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener("resize", handleResize);
    }, [])
    return (

        <animated.div style={{ ...animacion }} className={`lg:relative z-10 ${open ? "lg:w-3/12 h-screen" : "lg:w-1/12"} flex flex-col items-center lg:justify-between ${open && "min-[320px]:fixed"} min-[320px]:bg-white lg:pt-20 lg:pb-10 min-[320px]:py-5 border-b lg:border-r lg:border-b-0 border-black min-[320px]:gap-5 min-[320px]:w-screen `}>
            <img onClick={() => setOpen(!open)} className={`absolute block cursor-pointer ${!open ? "top-4 lg:self-center lg:left-autoc min-[320px]:left-8 w-6" : "top-2 right-2 w-8"}`} src={!open ? menu : close} alt="" />
            <img className={`${!open ? "absolute top-1 right-3 w-20" : "w-28"} block lg:hidden w-20`} src={logo} alt="" />

            <div className={`w-full min-[320px]:hidden lg:flex min-[320px]:px-4 lg:px-0 gap-2 justify-center items-center ${!open && "hidden"}`}>
                <Link to={'/Me'}>
                    {user?.photo ?
                        <img className={`${open ? "w-12 h-12" : "w-16 h-16"} rounded-full`} src={user.photo} alt="" />
                        :
                        <img className={`${open ? "w-12 h-12" : "w-16 h-16"} rounded-full`} src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" />}
                </Link>
                {token && open &&
                    <div>
                        <h1 className='font-bold text-xl'>{user?.name || "not finded"}</h1>
                        <p className='text-xs'>{user?.email}</p>
                    </div>}
            </div>

            <ul className={` ${open ? " lg:pt-0 w-full" : "min-[320px]:px-4 min-[320px]:mt-20 lg:mt-0"} lg:items-center list-none flex lg:gap-10 lg:flex-col lg:h-4/6 lg:justify-start min-[320px]:h-full ${open ? "min-[320px]:flex-col md:items-center min-[320px]:items-start min-[320px]:px-8 min-[320px]:justify-start min-[320px]:gap-10 min-[320px]:mt-10" : "min-[320px]:flex-row min-[320px]:justify-center"} min-[320px]:gap-5`}>
                <li className={`${open && "min-[320px]:w-10/12 md:w-3/12 lg:w-7/12"}`}><Link to={'/'} className='flex gap-4 justify-start items-center'>
                    <img className={`${open ? "min-[320px]:w-10 lg:w-6 lg:h-6 min-[320px]:h-10" : "w-6 h-6"}`} src={HomeIcon} alt="" />
                    <p className={`${open ? "min-[320px]:text-xl lg:text-base" : "hidden"}`}>{open && "Home"}</p>
                </Link></li>
                <li className={`${open && "min-[320px]:w-10/12 md:w-3/12 lg:w-7/12"}`}><Link to={'/Products'} className='flex gap-4 justify-start items-center'>
                    <img className={`${open ? "min-[320px]:w-10 lg:w-6 lg:h-6 min-[320px]:h-10" : "w-6 h-6"}`} src={ProductsIcon} alt="" />
                    <p className={`${open ? "min-[320px]:text-xl lg:text-base" : "hidden"}`}>{open && "Products"}</p>
                </Link></li>
                <li className={`${open && "min-[320px]:w-10/12 md:w-3/12 lg:w-7/12"}`}><Link to={'/AboutUs'} className='flex gap-4 justify-start items-center'>
                    <img className={`${open ? "min-[320px]:w-10 lg:w-6 lg:h-6 min-[320px]:h-10" : "w-6 h-6"}`} src={Information} alt="" />
                    <p className={`${open ? "min-[320px]:text-xl lg:text-base" : "hidden"}`}>{open && "Information"}</p>
                </Link></li>
                <li className={`${open && "min-[320px]:w-10/12 md:w-3/12 lg:w-7/12"}`}><Link to={'/Checkout'} className='flex gap-4 justify-start items-center'>
                    <img className={`${open ? "min-[320px]:w-10 lg:w-6 lg:h-6 min-[320px]:h-10" : "w-6 h-6"}`} src={CheckoutIcon} alt="" />
                    <p className={`${open ? "min-[320px]:text-xl lg:text-base" : "hidden"}`}>{open && "Checkout"}</p>
                </Link></li>
                {!token ? <>
                    <li className={`${open && "min-[320px]:w-10/12 md:w-3/12 lg:w-7/12"}`}>
                        <Link to={'/SignIn'} className='flex gap-4 justify-start items-center'>
                            <img className={`${open ? "min-[320px]:w-10 lg:w-6 lg:h-6 min-[320px]:h-10" : "w-6 h-6"}`} src={logIn} alt="" />
                            <p className={`${open ? "min-[320px]:text-xl lg:text-base" : "hidden"}`}>{open && "Log In"}</p>
                        </Link>
                    </li>
                    <li className={`${open && "min-[320px]:w-10/12 md:w-3/12 lg:w-7/12"}`}>
                        <Link to={'/Register'} className='flex gap-4 justify-start items-center'>
                            <img className={`${open ? "min-[320px]:w-10 lg:w-6 lg:h-6 min-[320px]:h-10" : "w-6 h-6"}`} src={register} alt="" />
                            <p className={`${open ? "min-[320px]:text-xl lg:text-base" : "hidden"}`}>{open && "Register"}</p>
                        </Link>
                    </li>
                </>
                    : <>
                        <li className={`${open && "min-[320px]:w-10/12 md:w-3/12 lg:w-7/12"} lg:hidden`}><Link to={'/Me'} className='flex gap-4 justify-start items-center'>
                            <img className={`${open ? "w-10 h-10" : "w-6 h-6"} rounded-full`} src={token ? user?.photo : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt="" />
                            <p className={`${open ? "min-[320px]:text-xl lg:text-base" : "hidden"}`}>{open && "Profile"}</p>
                        </Link></li>
                        {user.role == 1 ? <li className={`${open && "min-[320px]:w-10/12 md:w-3/12 lg:w-7/12"}`}>
                            <Link to={'/admin'} className='flex gap-4 justify-start items-center'><img className={`${open ? "min-[320px]:w-10 lg:w-6 lg:h-6 min-[320px]:h-10" : "w-6 h-6"}`} src={edit} alt="" />
                                <p className={`${open ? "min-[320px]:text-xl lg:text-base" : "hidden"}`}>{open && "Admin panel"}</p>
                            </Link>
                        </li> : null}
                        <li className={`${open && "min-[320px]:w-10/12 md:w-3/12 lg:w-7/12"}`}>
                            <Link onClick={() => closeAccount()} to={'/'} className='flex gap-4 justify-start items-center'><img className={`${open ? "min-[320px]:w-10 lg:w-6 lg:h-6 min-[320px]:h-10" : "w-6 h-6"}`} src={LogOut} alt="" />
                                <p className={`${open ? "min-[320px]:text-xl lg:text-base" : "hidden" }`}>{open && "Log Out"}</p></Link>
                        </li>


                    </>
                }
            </ul>


            <img className={`${open ? "w-36 h-36" : "w-20 h-20"} rounded-full min-[320px]:hidden lg:block`} src={logo} alt="" />
        </animated.div>
    )
}

export default display