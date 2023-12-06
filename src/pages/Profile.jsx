/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import editIcon from '/images/edit.png?url'
import flecha from '/images/flechaPaginacion.png?url'
import LastBuys from '../components/LastBuys'
import accept from '/images/accept.png?url'
import remove from '/images/remove.png?url'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BuyDetail from '../components/BuyDetail'
import login from '../redux/actions/singInAction'
import NotAllow from '../components/NotAllow'
import userChangeAction from '../redux/actions/userChangeAction'
import { Toaster, toast } from 'react-hot-toast'

const Profile = () => {
  const [change, setChange] = useState(false)
  const [data, setData] = useState({})
  const [buy, setBuy] = useState(false)
  const [buyDetail, setBuyDetail] = useState({})
  const [renderizar, setRenderizar] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, token } = useSelector((store) => store.profile)
  function getFile(e) {
    setData({ ...data, photo: e.target.files[0] })
  }
  async function changeData() {

    if (data.birthdate.slice(0,4)>2004) {
      toast.error("User must be over 18 years old!")
      setData({ ...user, birthdate: user.birthdate.slice(0,10).split("-").reverse().join("/") })
    }else{
      let data3 = {
        city: data.city || data.address.city,
        country: data.country || data.address.country,
        postalCode: data.postalCode || data.address.postalCode,
        province: data.province || data.address.province,
        street: data.street || data.address.street,
        streetNumber: data.streetNumber || data.address.streetNumber,
        name: data.name,
        surname: data.surname,
        birthdate: data.birthdate,
        email: data.email
      }
      
      dispatch(userChangeAction(data3))
        .then(res => {
          if (res.payload.error) {
            res.payload.error.error.forEach((element) => toast.error(element))
            setRenderizar(true)
          } else {
            toast.success("Information updated!")
            setChange(false)
            setRenderizar(true)
          }
        })
    } 
    
  }

  useEffect(() => {
    setRenderizar(false)
    if (!token || !token.length) {
      if (localStorage.length > 0) {
        const tokenStorage = localStorage.getItem('token')
        const userStorage = JSON.parse(localStorage.getItem('user'))
        const data2 = { user: userStorage, token: tokenStorage }
        dispatch(login(data2))
      }
    } else {
      setData({ ...user, ...user.address, birthdate: user.birthdate.slice(0,10).split("-").reverse().join("/") })
    }



  }, [token, renderizar])

  return (
    <>{!token ?
      <NotAllow />
      :
      <>
        {buy && <BuyDetail name={buyDetail.name} date={buyDetail.date} price={buyDetail.price} state={buyDetail.state} photo={buyDetail.photo} />}
        <div className='w-full h-screen flex flex-col justify-center gap-10 px-2 lg:px-5'>
          <h1 className='text-4xl '>Profile</h1>
          <div className='w-full h-5/6 flex flex-col gap-10 lg:gap-0'>
            {/* firstDiv */}
            <div className='w-full h-fit lg:h-4/6 bg-white flex flex-col lg:flex-row justify-center lg:gap-24 gap-8 items-center py-5'>
              {/* image */}
              <div className='relative h-5/6 w-8/12 lg:w-3/12 rounded-full flex items-center justify-center'>
                <div className='delay-100 w-full px-2 h-full rounded-full absolute bottom-0  object-center opacity-0 hover:opacity-80 flex justify-center items-center'>
                  <div className='w-full h-16 bg-neutral-200 border-y border-black flex justify-center items-center'>
                    <p className='text-xl lg:text-3xl'>Change Image</p>
                    <input className='opacity-0 cursor-pointer absolute' onClick={(e) => getFile(e)} type="file" label={"Change Image"} />
                  </div>
                </div>
                {user?.photo ?
                  <img className='object-cover rounded-full w-full' src={user.photo} alt="" />
                  :
                  <img className='object-cover rounded-full' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" />
                }
              </div>
              {/* information */}
              <div className='w-full xl:w-6/12 lg:w-7/12 h-5/6 border relative rounded-xl border-black flex-col md:flex-row p-4 flex items-start justify-center'>
                <div className='w-full md:w-1/2 flex md:flex-col flex-wrap gap-2'>
                  <div className='w-1/2 md:w-full'>
                    <h3 className='font-bold text-lg'>Name:</h3>
                    {change ? <input className='w-full' onChange={(e) => setData({ ...data, name: e.target.value })} type="text" defaultValue={data?.name} /> : <p>{data?.name}</p>}
                  </div >
                  <div className='w-1/2 md:w-full'>
                    <h3 className='font-bold text-lg'>Surname:</h3>
                    {change ? <input className='w-full' onChange={(e) => setData({ ...data, surname: e.target.value })} type="text" defaultValue={data?.surname} /> : <p>{data?.surname}</p>}
                  </div>
                  <div className='w-full' >
                    <h3 className='font-bold text-lg'>Email:</h3>
                    {change ? <input className='w-full' onChange={(e) => setData({ ...data, email: e.target.value })} type="text" defaultValue={data?.email} /> : <p>{data?.email}</p>}
                  </div>
                  <div className='w-full md:w-3/4' >
                    <h3 className='font-bold text-lg'>Birthdate:</h3>
                    {change ? <input className='w-full' onChange={(e) => setData({ ...data, birthdate: e.target.value })} type="date" defaultValue={data?.birthdate} /> : <p>{data?.birthdate}</p>}
                  </div>
                </div>
                <div className='w-full md:w-1/2'>
                  <h3 className='font-bold text-lg mb-1 mt-1 md:mt-0'>Address:</h3>
                  <div className='flex w-full'>
                    <div className='w-1/2'>
                      <h3 className='font-bold text-base'>Country</h3>
                      {change ? <input className='w-full' onChange={(e) => setData({ ...data, country: e.target.value })} type="text" defaultValue={data.address?.country} /> : <p>{data.address?.country}</p>}
                    </div>
                    <div className='w-1/2'>
                      <h3 className='font-bold'>Province</h3>
                      {change ? <input className='w-full' onChange={(e) => setData({ ...data, province: e.target.value })} type="text" defaultValue={data.address?.province} /> : <p>{data.address?.province}</p>}
                    </div>
                  </div>
                  <div className='flex w-full flex-col'>
                    <div className='w-full'>
                      <h3 className='font-bold'>City</h3>
                      {change ? <input className='w-full' onChange={(e) => setData({ ...data, city: e.target.value })} type="text" defaultValue={data.address?.city} /> : <p>{data.address?.city}</p>}
                    </div>
                    <div className='w-full'>
                      <h3 className='font-bold'>Street</h3>
                      {change ? <input className='w-full' onChange={(e) => setData({ ...data, street: e.target.value })} type="text" defaultValue={data.address?.street} /> : <p>{data.address?.street}</p>}
                    </div>
                  </div>
                  <div className='flex w-full'>
                    <div className='w-1/2'>
                      <h3 className='font-bold'>SteetNumber</h3>
                      {change ? <input className='w-full' onChange={(e) => setData({ ...data, streetNumber: e.target.value })} type="text" defaultValue={data.address?.streetNumber} /> : <p>{data.address?.streetNumber}</p>}
                    </div>
                    <div className='w-1/2'>
                      <h3 className='font-bold'>Postal Code</h3>
                      {change ? <input className='w-full' onChange={(e) => setData({ ...data, postalCode: e.target.value })} type="text" defaultValue={data.address?.postalCode} /> : <p>{data.address?.postalCode}</p>}
                    </div>
                  </div>
                </div>
                {change ?
                  <div className='w-1/6 h-20 flex gap-2 absolute top-3 right-0'>
                    <img onClick={() => { setData({ ...user, birthdate: user.birthdate.slice(0,10).split("-").reverse().join("/") }); setChange(false) }} className='w-7 h-7 right-10 cursor-pointer' src={remove} alt="" />
                    <img onClick={() => { changeData();}} className='w-7 h-7 cursor-pointer' src={accept} alt="" />
                  </div>
                  :
                  <img onClick={() => { setChange(true); setData({ ...user, birthdate: user.birthdate.slice(0, 10).replaceAll("-", "/") }) }} className='w-7 h-7 absolute top-3 right-3 cursor-pointer' src={editIcon} alt="" />
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
      <Toaster position='top-center' />
    </>
  )
}

export default Profile