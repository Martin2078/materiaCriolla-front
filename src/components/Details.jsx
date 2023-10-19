import React, { useEffect, useState } from 'react'
import carrito from '/images/añadir-a-carrito.png'
import close from '/images/close.png'
import añadir from '/images/añadir.png'
import { useDispatch, useSelector } from 'react-redux'
import paymentAction from '../redux/actions/paymentAction'
import checkoutActions from '../redux/actions/checkoutAction'
import quitarCarrito from '../../public/images/quitar-de-carrito.png'
import {toast,Toaster} from 'react-hot-toast'

const addCheckout=checkoutActions.addCheckout
const deleteCheckout=checkoutActions.deleteCheckout
const Details = ({ detail, change, setChange }) => {
  const dispatch = useDispatch()
  const user = useSelector(store => store.profile.user)
  let finded
  const [added,setAdded]=useState(false)
  const [actualPhoto, setActualPhoto] = useState(detail.product_photo[0])
  const [quantity, setQuantity] = useState(1)
  const [quantitySelect, setQuantitySelect] = useState(false)
  const { name, price } = detail

  async function addToCheckout() {
    let product_id = {
      quantity,
      _id: detail._id
    }
    dispatch(addCheckout(product_id))
    .then(res=>{
      if (res.payload.user) {
        toast.success(res.payload.message)
      }
    })
  }
  async function deleteProduct() {
    dispatch(deleteCheckout(detail._id))
    .then(res=>{
      if (res.payload.user) {
        toast.success(res.payload.message)
      }
    })
  }

  const handlePayment = async (product) => {
    try {
      const response = await dispatch(paymentAction(product))
      console.log(response)
      if (response.payload.operation_type && response.payload.operation_type === 'regular_payment') {
        window.location.href = response.payload.init_point
      }
    } catch (error) {
      console.log(error)
    }
  }

  function getQuantity(e) {
    if (e.target.value == 4) {
      setQuantitySelect(true)
    } else {
      setQuantity(e.target.value)
    }
  }

  function quantityRender() {
    let template = []
    for (let i = 1; i <= detail.quantity; i++) {
      if (i == 1) {
        template.push(<option value="1">1 unidad</option>)
      } else {
        template.push(<option value={i}>{i} unidades</option>)
      }
    }
    return template
  }

  function addPhoto(e) {
    const photo = e.target.files[0]
  }
  useEffect(()=>{
    if (user && user.checkout.length) {
      finded = user.checkout.map(product => product.product_id).find(product=>product._id===detail._id)
      if (finded) {
        setAdded(true)
      }
    }else{
      setAdded(false)
    }


  },[user])

  return (
    <div key={detail._id} className='fixed top-0 left-0 w-screen h-screen py-4 md:py-0 px-4 lg:px-0 bg-[#999] bg-opacity-50 flex justify-center items-center z-10'>
      <Toaster position='top-center' toastOptions={{success:{duration:1000}}}/>
      <div className='w-full h-full xl:w-8/12 lg:w-10/12 md:h-4/6 bg-white pt-10 md: md:py-10 px-5 flex flex-col md:flex-row relative rounded-lg'>
        <img onClick={() => setChange(!change)} className='w-10 h-10 cursor-pointer absolute top-1 right-1 md:top-2 md:right-2' src={close} alt="" />
        <div className='w-full relative md:w-1/2 md:h-full h-1/2 flex flex-col items-center border rounded-lg justify-between'>
          <div className='w-11/12 rounded-lg absolute bottom-2 bg-neutral-400 bg-opacity-50 border flex items-center justify-between border-black p-1 px-3'>
            <div className='flex gap-2 overflow-x-auto'>
              {detail.product_photo?.map((photo, index) => {
                return (
                  <div key={index} onClick={() => setActualPhoto(photo)} className='border cursor-pointer border-black'>
                    <img key={index} className='w-10 h-10' src={photo} alt="" />
                  </div>)
              })}
            </div>
            <div className='relative hover:scale-110'>
              <img onClick={() => addPhoto()} className='h-8 w-8 cursor-pointer' src={añadir} alt="" />
              <input onChange={(e) => addPhoto(e)} className='w-8 h-8 absolute top-0 opacity-0' type="file" />
            </div>
          </div>
          <img className='w-full max-h-64 object-contain rounded-lg' src={actualPhoto} alt="" />
        </div>
        <div className='w-full h-fit md:w-1/2 md:h-full flex flex-col items-center justify-between py-4 overflow-y-scroll md:overflow-hidden'>
          <div className='w-5/6 h-fit md:h-5/6 flex flex-col gap-1 md:gap-4 lg:gap-3'>
            <h3 className='text-3xl md:text-4xl w-full'>{detail.name}</h3>
            <div className='flex flex-col gap-2 h-2/5'>
              <p className='text-xl'>Description</p>
              <div className='w-full h-32 md:h-full border overflow-y-scroll p-1 px-2 rounded-lg'>
                <p >{detail.description}</p>
              </div>
            </div>
            <p className='text-2xl'>${detail.price}</p>
            <p className='text-lg font-semibold'>Stock: {detail.quantity}</p>
            <div className='w-full h-2/6 md:h-1/6 flex flex-col gap-1'>
              <p className='text-lg font-semibold'>Colors</p>
              <div className='w-full h-fit flex gap-2 '>
                {detail.colors.length == 0 ? <div className='h-8 flex items-center justify-center py-1 px-2 w-fit border border-black border-dashed'>
                  <p>black</p>
                </div>
                  :
                  detail.colors.map((color, index) => {
                    return (
                      <div key={index} className='h-8 flex items-center justify-center py-1 px-2 w-fit border border-black border-dashed'>
                        <p>{color}</p>
                      </div>)
                  })}
              </div>
            </div>
            <div className='w-full h-12 md:h-0'>
              {quantitySelect
                ?
                <input className='border border-black px-1' placeholder='Quantity' type="text" defaultValue={1} onChange={(e) => setQuantity(e.target.value)} />
                :
                (<select onClick={(e) => { getQuantity(e); console.log(e.target.value) }} name="quantity" id="">
                  {detail.quantity > 4 ? <>
                    <option value="1">1 unit</option>
                    <option value="2">2 units</option>
                    <option value="3">3 units</option>
                    <option value="4">Others</option></>
                    : quantityRender()
                  }
                </select>)}
            </div>
          </div>
          <div className='flex w-5/6 h-10 gap-5'>
            <button
              onClick={() => handlePayment([{product_id: {name: name, price: price}, quantity: quantity}])}
              className="w-9/12 rounded-lg text-white text-xl bg-[url('/images/madera.png')]"
            >
              Buy
            </button>
            { added ?
              <button onClick={() => deleteProduct()}><img className='w-8 h-8' src={quitarCarrito} alt="" /></button>
              :
              <button onClick={() => addToCheckout()}><img className='w-8 h-8' src={carrito} alt="" /></button>

            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details
