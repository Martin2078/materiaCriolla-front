import React, { useState } from 'react';
import NotAllow from '../components/NotAllow';
import { useSelector } from 'react-redux';
import moto from '../../public/images/moto.png'
import devolver from '../../public/images/devolver.png'
import mediosPagos from '../../public/images/donacion.png'
import delate from '../../public/images/borrar.png'

const Checkout = () => {
  const { user, token } = useSelector((store) => store.profile);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl text-center mb-8">Shopping Cart</h1>
      <div className="bg-blue-100 rounded p-4">
        <div className="border-b-2 mb-6 flex justify-center items-center"> {/* Tira larga gris para las imágenes */}
          <div className="mx-4">
            <div className="bg-gray-200 p-4 rounded">
              <img src={moto} alt="Icon moto" className="w-8 h-8" />
            </div>
            <div className="text-center mt-2">
              <div className="cart-reminder-title">Shipping</div>
              <div className="cart-reminder-subtitle">Nationwide Shipping</div>
            </div>
          </div>
          <div className="mx-4">
            <div className="bg-gray-200 p-4 rounded">
              <img src={devolver} alt="Icon change" className="w-8 h-8" />
            </div>
            <div className="text-center mt-2">
              <div className="cart-reminder-title">Returns and Exchanges</div>
            </div>
          </div>
          <div className="mx-4">
            <div className="bg-gray-200 p-4 rounded">
              <img src={mediosPagos} alt="Icon payment" className="w-8 h-8" />
            </div>
            <div className="text-center mt-2">
              <div className="cart-reminder-title">Payment Methods</div>
              <div className="cart-reminder-subtitle">3 Interest-Free Installments</div>
            </div>
          </div>
        </div>

        {/* Tira diferente para los artículos */}
        <div className="border-b-2 mb-6" />

        <div className="descriptions-items flex xs:hidden sm:hidden">
          <div className="table-title">ART.</div>
          <div className="text-center">
            <div className="table-title">Talle</div>
            <div className="table-title">Cant.</div>
          </div>
          <div className="table-title">Precio</div>
        </div>

        <div className="items-container">
          <div className="js-entry js-entry-length" data-entry-id="12660957" style={{ borderColor: '#333' }}>
            <div className="flex items-center">
              <div className="img-cart">
                <img
                  src="product_image.jpg"
                  alt="Product"
                  className="w-16 h-16"
                />
              </div>
              <div className="container-infochk-mobile flex items-center">
                <div className="description-content">
                  <div className="title-item-table">Product Name</div>
                  <div className="properties-entry hidden-xs hidden-sm">
                    Size: Product Size
                  </div>
                  <span className="full-price">$ Product Price</span>
                </div>
              </div>
            </div>
            <div className="col-md-3 subtitle-item-table property-cart">
              Product Size
            </div>
            <div className="col-md-4">{/* Formulario de cantidad */}</div>
            <div className="col-md-5">
              <span className="full-price">$ Product Price</span>
            </div>
            <div className="col-md-12">
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
        </div>

        <div className="empty_cart_content js-empty-cart text-center">
          <p className="uppercase">Your cart is empty</p>
          <p>
            There are no items in your cart. <br />
            Please <a href="/categories">click here</a> to continue shopping.
          </p>
        </div>
      </div>
    </div>
  );

};

export default Checkout;
