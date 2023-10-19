import React, { useEffect } from 'react'
import NotAllow from '../components/NotAllow'
import { useSelector, useDispatch } from 'react-redux'
import paymentAction from '../redux/actions/paymentAction'
import moto from '/images/moto.png'
import devolver from '/images/devolver.png'
import mediosPagos from '/images/donacion.png'
import delate from '/images/borrar.png'
import login from '../redux/actions/singInAction'
import checkoutActions from '../redux/actions/checkoutAction'
import {toast,Toaster} from 'react-hot-toast'
import {Link} from 'react-router-dom'
const { deleteCheckout, updateCheckout } = checkoutActions

const Checkout = () => {
  const { user, token } = useSelector((store) => store.profile)
  console.log(user.checkout)
  const dispatch = useDispatch()

  async function deleteProduct(id) {
    dispatch(deleteCheckout(id))
    .then(res=>{
      if (res.payload.user) {
        toast.success(res.payload.message)
      }
    })
  }

  function getQuantityChange(product, e) {
    changeQuantity(product, e.target.value)
  }
  function renderOptions(quantity) {
    let template = []
    for (let i = 1; i <= quantity; i++) {
      template.push(<option value={i}>{i}</option>)
    }
    return template
  }
  function changeQuantity(id, quantityChange) {
    const data = {
      _id: id,
      quantity: quantityChange
    }
    dispatch(updateCheckout(data))
  }

  useEffect(() => {
    if (!token || !token.length) {
      if (localStorage.length > 0) {
        const tokenStorage = localStorage.getItem('token')
        const userStorage = JSON.parse(localStorage.getItem('user'))
        const data2 = { user: userStorage, token: tokenStorage }
        dispatch(login(data2))
      }
    }
  }, [token, user])

  const handlePayment = async (products) => {
    try {
      const response = await dispatch(paymentAction(products))
      console.log(response)
      if (response.payload.operation_type && response.payload.operation_type === 'regular_payment') {
        window.location.href = response.payload.init_point
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <Toaster position='top-center'/>
    {token ?
      <div className="px-2 h-screen w-full">
        <h1 className="text-3xl px-4 py-5">Checkout</h1>

        <div className=" rounded p-4 max-h-auto">
          <div className="mb-4 h-1/6 flex justify-center items-start "> {/* Tira larga gris para las imágenes */}
            <div className="mx-4 h-full">
              <div className="bg-gray-200 p-4 rounded">
                <img src={moto} alt="Icon moto" className="w-8 h-8" />
              </div>
              <div className="text-center mt-2">
                <div className="cart-reminder-title">Shipping</div>
                <div className="cart-reminder-subtitle">Nationwide Shipping</div>
              </div>
            </div>
            <div className="mx-4 h-full" >
              <div className="bg-gray-200 p-4 rounded">
                <img src={devolver} alt="Icon change" className="w-8 h-8" />
              </div>
              <div className="text-center mt-2">
                <div className="cart-reminder-title">Returns and Exchanges</div>
              </div>
            </div>
            <div className="mx-4 h-full">
              <div className="bg-gray-200 p-4 rounded">
                <img src={mediosPagos} alt="Icon payment" className="w-8 h-8" />
              </div>
              <div className="text-center mt-2">
                <div className="cart-reminder-title">Payment Methods</div>
                <div className="cart-reminder-subtitle">3 Interest-Free Installments</div>
              </div>
            </div>
          </div>

          <div className='w-full h-[65vh] overflow-y-auto flex flex-col items-center gap-5 '>
            {user?.checkout.length>0 ?
              user.checkout.map(product => {
                while (product.product_id.quantity > 0) {
                  return (
                    <div className="w-10/12 flex rounded-xl items-center justify-between px-10 h-[8vh] border border-black">
                      <div className="h-full w-2/12 flex items-center">
                        <img
                          src={product.product_id.product_photo}
                          alt="Product"
                          className="w-16 h-16 object-contain"
                        />
                      </div>
                      <div className="container-infochk-mobile flex items-center w-4/12">
                        <div className="description-content">
                          <div className="title-item-table">{product.product_id.name}</div>
                          <span className="full-price">${product.product_id.price}</span>
                        </div>
                      </div>
                      <div className="col-md-3 subtitle-item-table property-cart w-3/12 flex gap-1 items-center">
                        {<select defaultValue={product.quantity} onChange={(e) => getQuantityChange(product.product_id._id, e)} name="" id="">
                          {renderOptions(product.product_id.quantity)}
                        </select>}
                      </div>

                      <div className="col-md-5 w-3/12">
                        <span className="full-price">Final price: ${product.product_id.price * product.quantity}</span>
                      </div>
                      <div className="col-md-12 w-1/12">
                        <button
                          
                          onClick={()=>deleteProduct(product.product_id._id)}
                        >
                          <img src={delate} alt="Delete" className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  )

                }
              })
              :
              <div className="w-full h-full py-24 text-center flex flex-col items-center gap-5">
                <p className="uppercase text-3xl">Your cart is empty</p>
                <img className='w-6/12 h-5/6 rounded-xl object-cover object-center' src="https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt82791d141ef3edb0/615f6c62f0cc0276fbb25878/8bf04d92e36e127032e31f24bdcf2a52a165a925.jpg?auto=webp&format=pjpg&width=3840&quality=60" alt="" />
                <Link to={'/Products'} className='w-4/12 h-fit py-2 rounded-lg bg-[url("/images/madera.png")]'>
                  <p className='text-white text-2xl'>
                  Add products!
                  </p></Link>
              </div>
              
            }
          </div>
        </div>

        {user?.checkout.length>0&&<div className='w-full h-auto flex justify-center'>
          <button
          className='w-4/12 rounded-lg h-12 bg-[url("/images/madera.png")]'
          onClick={() => handlePayment(user.checkout)}
          >
            <p className='text-white text-xl font-bold'>Buy Now</p></button>
        </div>}
      </div>
      :
      <NotAllow />

    }
    </>

  );

};

export default Checkout;
