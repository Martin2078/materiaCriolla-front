import React, { useEffect, useState } from 'react'
import editIcon from '../../public/images/edit.png?url'
import flecha from '../../public/images/flechaPaginacion.png?url'
import LastBuys from '../components/LastBuys'
import accept from '../../public/images/accept.png?url'
import remove from '../../public/images/remove.png?url'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BuyDetail from '../components/BuyDetail'
import login from '../redux/actions/singInAction'
import NotAllow from '../components/NotAllow'

const Profile = () => {
    const [change, setChange] = useState(false)
    const [data, setData] = useState({})
    const [buy, setBuy] = useState(false)
    const [buyDetail, setBuyDetail] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, token } = useSelector((store) => store.profile)
    function getFile(e) {
        setData({ ...data, photo: e.target.files[0] })
    }
    
    useEffect(() => {
        if(!token.length>0){
            if (localStorage.length>0) {
                const tokenStorage=localStorage.getItem('token')
                const userStorage=JSON.parse(localStorage.getItem('user'))
                const data={user:userStorage,token:tokenStorage}
                setData({...data,name:userStorage.name,surname:userStorage.surname,email:userStorage.email})
                if (userStorage.address.length>0) {
                    // setData({...data,address:{
                    //     city:userStorage.address.city,
                    //     country:userStorage.address.country,
                    //     postalCode:userStorage.address.postalCode,
                    //     province:userStorage.address.province,
                    //     street:userStorage.address.street,
                    //     streetNumber:userStorage.address.streetNumber
                    // }})
                    console.log(Object.values(userStorage.address))
                }else{
                    setData({...data,address:"Please provide a address"})
                }
                dispatch(login(data))
            }}
        // else{
        //     setData({...data,name:user.name,surname:user.surname,email:user.email})
        //         if (user.address.length>0) {
        //             setData({...data,address:{
        //                 city:user.address.city,
        //                 country:user.address.country,
        //                 postalCode:user.address.postalCode,
        //                 province:user.address.province,
        //                 street:user.address.street,
        //                 streetNumber:user.address.streetNumber,
        //             }})
        //         }else{
        //             setData({...data,address:"Please provide a address"})
        //         }

        // }
    }, [token])

    return (
        <>{!token ?
            <NotAllow/>
            :
            <>
                {buy && <BuyDetail name={buyDetail.name} date={buyDetail.date} price={buyDetail.price} state={buyDetail.state} photo={buyDetail.photo} />}
                <div className='w-full h-screen flex flex-col justify-center gap-10 px-5'>
                    <h1 className='text-4xl '>Profile</h1>
                    <div className='w-full h-5/6 flex flex-col gap-10 lg:gap-0'>
                        {/* firstDiv */}
                        <div className='w-full h-4/6 lg:h-3/6 bg-white flex flex-col lg:flex-row justify-center lg:gap-24 gap-8 items-center py-5'>
                            {/* image */}
                            <div className='relative h-4/6 w-8/12 lg:w-3/12 rounded-full flex items-center'>
                                <div className='delay-100 w-full px-2 h-full rounded-full absolute bottom-0  object-center opacity-0 hover:opacity-80 flex justify-center items-center'>
                                    <div className='w-full h-16 bg-neutral-200 border-y border-black flex justify-center items-center'>
                                        <p className='text-xl lg:text-3xl'>Change Image</p>
                                        <input className='opacity-0 cursor-pointer absolute' onClick={(e) => getFile(e)} type="file" label={"Change Image"} />
                                    </div>
                                </div>
                                {user?.photo ?
                                    <img className='object-cover rounded-full' src={user.photo} alt="" />
                                    :
                                    <img className='object-cover rounded-full' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" />
                                }
                            </div>
                            {/* information */}
                            <div className='w-full lg:w-6/12 h-4/6 border relative rounded-xl border-black p-4 flex flex-col items-start justify-center'>
                                <div className='w-full'>
                                    <h3 className='font-bold'>Name:</h3>
                                    {change ? <input className='w-8/12' onChange={(e) => setData({ ...data, name: e.target.value })} type="text" value={user?.name} /> : <p>{user?.name}</p>}
                                </div>
                                <div className='w-full'>
                                    <h3 className='font-bold'>Surname:</h3>
                                    {change ? <input className='w-8/12' onChange={(e) => setData({ ...data, surname: e.target.value })} type="text" value={user?.surname} /> : <p>{user?.surname}</p>}
                                </div>
                                <div className='w-full'>
                                    <h3 className='font-bold'>Email:</h3>
                                    {change ? <input className='w-8/12' onChange={(e) => setData({ ...data, email: e.target.value })} type="text" value={user?.email} /> : <p>{user?.email}</p>}
                                </div>
                                <div className='w-full'>
                                    <h3 className='font-bold'>Address</h3>
                                    {change ? <input className='w-8/12' onChange={(e) => setData({ ...data, address: e.target.value })} type="text" value={"hola"} /> : <p>{user?.address}</p>}
                                </div>
                                {change ?
                                    <div className='w-1/6 h-20 flex gap-2 absolute top-3 right-0'>
                                        <img onClick={() => { setChange(false); }} className='w-7 h-7 right-10 cursor-pointer' src={remove} alt="" />
                                        <img onClick={() => { setChange(false); }} className='w-7 h-7 cursor-pointer' src={accept} alt="" />
                                    </div>
                                    :
                                    <img onClick={() => setChange(true)} className='w-7 h-7 absolute top-3 right-3 cursor-pointer' src={editIcon} alt="" />
                                }
                            </div>
                        </div>
                        {/* SecondDiv */}
                        <div className='w-full h-3/6 bg-white flex justify-center py-5 lg:px-10'>

                            <div className='w-full lg:w-10/12 h-fit py-4 border rounded-xl border-black'>
                                <div className='flex w-full h-1/6 justify-center items-start'>
                                    <p className='font-bold text-3xl'>Your Last Buys</p>
                                </div>

                                {user?.lastBuys.length > 0 ?
                                    user.lastBuys.map((compra) => {
                                        <div className='h-5/6 w-full flex flex-col items-center gap-3 overflow-y-scroll '>
                                            <LastBuys name={compra.name} date={compra.date} price={compra.price} state={compra.state} photo={compra.photo} setBuyDetail={setBuyDetail} setBuy={setBuy} buyDetail={buyDetail} />
                                        </div>
                                    })
                                    :
                                    <div className='w-full flex flex-col items-center gap-4'>
                                        <p className='text-base lg:text-xl text-center'>No se ha efectuado ninguna compra por el momento!</p>
                                        <img className='h-36 lg:h-48 rounded-xl object-contain' src="https://www.lanacion.com.ar/resizer/v2/el-personaje-de-robert-de-niro-toma-un-mate-en-el-YHVM47N37NDA3KOE3SFNEMCGJI.jpg?auth=a6d2203b617ca6e25fa0ce494f29fafcf988fa10c165b967b828d6b15e75fc2c&width=420&height=280&quality=70&smart=false" alt="" />
                                    </div>          
                        }

                        </div>

                    </div>
                </div>
            </div>           
        </>}

        </>
    )
}

export default Profile