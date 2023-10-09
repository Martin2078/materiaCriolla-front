import React, { useEffect, useState } from 'react'
import editIcon from '../../public/images/edit.png'
import flecha from '../../public/images/flechaPaginacion.png'
import LastBuys from '../components/LastBuys'
import accept from '../../public/images/accept.png'
import remove from '../../public/images/remove.png'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

const Profile = () => {
    const [change, setChange] = useState(false)
    const [data, setData] = useState({
        address:"correa108",
        email:"martinleonel@gmail.com",
        name:"rober",
        lastName:"sdas"
    })
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const token=false
    // const {user,token}=useSelector((store)=>store.profile)
    function getFile(e) {
        setData({ ...data, photo: e.target.files[0] })
    }
    async function sendChanges() {
        
    }
    //  useEffect(()=>{
    //     if (!token) {
    //         navigate("/")
    //     }
    // setData({...data,email:user.email,name:user.mail,lastName:user.lastName,address:user.address})
    //  },[])

    return (
        <div className='w-4/5 h-screen flex flex-col justify-center gap-10 px-5'>
            <h1 className='text-4xl '>Profile</h1>
            <div className='w-full h-5/6 flex flex-col'>
                {/* firstDiv */}
                <div className='w-full h-3/6 bg-white flex justify-center gap-24 items-center py-5'>
                    {/* image */}
                    <div className='relative h-4/6 w-3/12 rounded-full flex items-center'>
                        <div className='delay-100 w-full px-2 h-full rounded-full absolute bottom-0  object-center opacity-0 hover:opacity-80 flex justify-center items-center'>
                            <div className='w-full h-16 bg-neutral-200 border-y border-black flex justify-center items-center'>
                                <p className='text-3xl'>Change Image</p>
                                <input className='opacity-0 cursor-pointer absolute' onClick={(e) => getFile(e)} type="file" label={"Change Image"} />
                            </div>
                        </div>
                        {/* {user?.photo ?
                            <img className='object-cover rounded-full' src={user.photo} alt="" />
                            :
                            <img className='object-cover rounded-full' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" />
                        } */}
                        <img className='object-cover rounded-full' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" />
                    </div>
                    {/* information */}
                    <div className='w-6/12 h-4/6 border relative rounded-xl border-black p-4 flex flex-col items-start justify-center'>
                        <div className='w-full'>
                            <h3 className='font-bold'>Name:</h3>
                            {change ? <input className='w-8/12' onChange={(e) => setData({ ...data, name: e.target.value })} type="text" value={data.name} /> : <p>{data.name}</p>}
                        </div>
                        <div className='w-full'>
                            <h3 className='font-bold'>Last Name:</h3>
                            {change ? <input className='w-8/12' onChange={(e) => setData({ ...data, lastName: e.target.value })} type="text" value={data.lastName} /> : <p>{data.lastName}</p>}
                        </div>
                        <div className='w-full'>
                            <h3 className='font-bold'>Email:</h3>
                            {change ? <input className='w-8/12' onChange={(e) => setData({ ...data, email: e.target.value })} type="text" value={data.email} /> : <p>{data.email}</p>}
                        </div>
                        <div className='w-full'>
                            <h3 className='font-bold'>Address</h3>
                            {change ? <input className='w-8/12' onChange={(e) => setData({ ...data, address: e.target.value })} type="text" value={data.address} /> : <p>{data.address}</p>}
                        </div>
                        {change ?
                            <div className='w-1/6 h-20 flex gap-2 absolute top-3 right-0'>
                                <img onClick={() => { setChange(false);}} className='w-7 h-7 right-10 cursor-pointer' src={remove} alt="" />
                                <img onClick={() => { setChange(false); sendChanges() }} className='w-7 h-7 cursor-pointer' src={accept} alt="" />
                            </div>
                            :
                            <img onClick={() => setChange(true)} className='w-7 h-7 absolute top-3 right-3 cursor-pointer' src={editIcon} alt="" />
                        }
                    </div>
                </div>
                {/* SecondDiv */}
                <div className='w-full h-3/6 bg-white flex justify-center py-5 px-10'>

                    <div className='w-10/12 py-4 border rounded-xl border-black'>
                        <div className='flex w-full h-1/6 justify-center items-start'>
                            <p className='font-bold text-3xl'>Your Last Buys</p>
                        </div>
                        <div className='h-5/6 w-full flex flex-col items-center gap-3 overflow-y-scroll '>
                            {/* {user?.lastBuys.length>0?
                            user.lastBuys.map((compra)=>{
                                <LastBuys name={compra.name} date={compra.date} price={compra.price} state={compra.state} />
                            })
                            :
                            <div>
                            <p>No se ha efectuado ninguna compra por el momento</p>
                            </div>
                            } */}

                            <div className='w-11/12 h-7 flex justify-evenly items-center border rounded-xl border-black'>
                                <div className='w-5/6 h-full flex items-center'>
                                    <p className='w-1/3 text-center'>nombreProducto123</p>
                                    <p className='w-1/3 text-center'>4/23/32</p>
                                    <p className='w-1/3 text-center'>$21321312</p>
                                </div>
                                <div className='w-1/6 border rounded-r-xl border-l-black h-full flex justify-between items-center'>
                                    <p className='text-xs w-1/4 text-right'>🟢</p>
                                    <p className='w-3/4 text-center'>Done</p>
                                </div>
                            </div>






                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Profile