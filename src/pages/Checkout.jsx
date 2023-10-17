import React, { useState, useEffect } from 'react';
import NotAllow from '../components/NotAllow';
import { useSelector, useDispatch } from 'react-redux';
import moto from '../../public/images/moto.png'
import devolver from '../../public/images/devolver.png'
import mediosPagos from '../../public/images/donacion.png'
import delate from '../../public/images/borrar.png'
import login from '../redux/actions/singInAction';
import checkoutActions from '../redux/actions/checkoutAction';
import accept from '../../public/images/accept.png'
import close from '../../public/images/remove.png'

const {addCheckout,deleteCheckout,updateCheckout}=checkoutActions

const Checkout = () => {
  const { user, token } = useSelector((store) => store.profile);
  const [change,setChange]=useState(false)
  const [quantity,setQuantity]=useState()
  const [quantitySelect,setQuantitySelect]=useState()

  function getQuantityChange(product,e) {
    console.log(e.target.value);
    if (e.target.value==4) {
      setQuantitySelect(true)
    }else{
      changeQuantity(product,e.target.value)
    }
  }

  function changeQuantity(id,quantityChange) {
    const data={
      _id:id,
      quantity:quantityChange
    }
    dispatch(updateCheckout(data))
  }

  const dispatch = useDispatch()
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

  return (
    <>{token ?
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

          <div className='w-full h-4/6 overflow-y-scroll flex flex-col gap-2 '>
          {
            user?.checkout.length>0? user.checkout.map(product => {
              return (
                  <div className="flex rounded-xl items-center justify-between px-10 h-20 border border-black">
                    <div className="h-full w-2/12 flex items-center">
                      <img
                        src={product.product_id.product_photo}
                        alt="Product"
                        className="w-16 h-16"
                      />
                    </div>
                    <div className="container-infochk-mobile flex items-center w-4/12">
                      <div className="description-content">
                        <div className="title-item-table">{product.product_id.name}</div>
                        <span className="full-price">${product.product_id.price}</span>
                      </div>
                    </div>
                  <div className="col-md-3 subtitle-item-table property-cart w-3/12 flex gap-1 items-center">
                    <select defaultValue={product.product_id.quantity} onChange={(e)=>getQuantityChange(product.product_id._id,e)} name="" id="">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">More of 3</option>
                    </select>
                  </div>
                  <div className="col-md-4">{/* Formulario de cantidad */}</div>
                  <div className="col-md-5 w-3/12">
                    <span className="full-price">Final price: ${product.product_id.price}</span>
                  </div>
                  <div className="col-md-12 w-1/12">
                    <a
                      className="js-tooltip js-delete-entry"
                      data-toggle="tooltip"
                      data-placement="right"
                      data-remote="true"
                      rel="nofollow"
                      data-method="delete"
                      href="/order_entries/12660957"
                    >
                      <img src={delate} alt="Delete" className="w-6 h-6" />
                    </a>
                  </div>
                  </div>
              )
            })
            :
            <div className="empty_cart_content js-empty-cart text-center">
            <p className="uppercase">Your cart is empty</p>
            <p>
              There are no items in your cart. <br />
              Please <a href="/categories">click here</a> to continue shopping.
            </p>
          </div>
          }
          </div>


          
        </div>
          <div className='w-full h-auto flex justify-center'>
            <button className='w-4/12 rounded-lg h-12 bg-[url("../../public/images/madera.png")]'><p className='text-white text-xl font-bold'>Buy Now</p></button>
          </div>
      </div>
      :
      <NotAllow />

    }
    </>

  );

};

export default Checkout;
