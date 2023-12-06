import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Details from '../components/Details';
import login from "../redux/actions/singInAction";
import productsAction from '../redux/actions/productosAction'
import categoriesAction from '../redux/actions/categoriesAction'
import { useParams } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const { itemName } = useParams();
  const { token, user } = useSelector((store) => store.profile)

  const products = useSelector((store) => store.products.products);
  const categories = useSelector((store) => store.categories.categories);
  const [change, setChange] = useState(false);
  const [detail, setDetail] = useState(null);
  const [checked, setChecked] = useState([]);
  const [nameFilter, setNameFilter] = useState(itemName == ':' ? "" : itemName);


  function addCategory(id) {
    if (checked.find(check => check == id)) {
      setChecked([...checked.filter((check) => check !== id)])
    } else {
      setChecked([...checked, id])
    }
  }

  function filterByCategory(products, categories) {
    if (categories.length === 0) {
      return products;
    } else {
      const filtered = products.filter(product => categories.includes(product.category_id._id));
      return filtered;
    }
  }

  function filterByName(products, name) {
    const filtered = products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
    return filtered;
  }

  const filteredProductsByName = filterByName(products, nameFilter);
  const filteredProducts = filterByCategory(filteredProductsByName, checked);



  const filterInputStyle = {

    height: '40px',
    fontSize: '16px',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const checkboxStyle = {
    width: '20px',
    height: '20px',
  };


  const imageStyle = {
    width: '6rem',
    height: '6rem',
    objectFit: 'contain',
  };

  useEffect(() => {
    if (!token || !token.length) {
      if (localStorage.length > 0) {
        const tokenStorage = localStorage.getItem('token')
        const userStorage = JSON.parse(localStorage.getItem('user'))
        const data2 = { user: userStorage, token: tokenStorage }
        dispatch(login(data2))
      }
    }
    if (products.length == 0) {
      dispatch(productsAction())
      dispatch(categoriesAction())
    }
  }, [token, user])

  return (
    <div className='h-full w-full flex flex-col items-center'>
      {change && <Details detail={detail} change={change} setChange={setChange} />}
      <div className='w-full bg-white flex flex-col items-center lg:rounded-lg lg:px-4 lg:py-1 gap-2 min-[320px]:rounded-full min-[320px]:py-2 min-[320px]:px-2'>
        <div className="flex flex-col items-center gap-5 lg:flex-row w-full justify-between px-5 pt-4">
          <p className=" font-bold  text-2xl sm:text-3xl">Products</p>
          <input id='search' type="search" style={filterInputStyle} className="outline-none w-5/6 lg:w-2/6" placeholder='Find Your Product Here' defaultValue={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
        </div>
        <div className="flex justify-center w-full bg-[url('/images/madera.png')] rounded-xl gap-5 flex-wrap m-5 px-2 lg:px-14 py-4 lg:justify-around">
          {categories.map((category) => (
            <button onClick={() => addCategory(category._id)} className={`w-2/5 md:w-2/6 lg:w-[10vw] h-10 text-center rounded-xl text-xl font-bold text-white  ${checked.includes(category._id) ? "border border-white" : "shadow-md shadow-white"}`} key={category._id}>
              {category.name}
            </button>
          ))}
        </div>
      </div>
      <div className="lg:overflow-y-scroll flex flex-col items-center justify-center md:flex-row md:flex-wrap gap-x-5 gap-y-20 pt-20 pb-5 h-full  lg:h-[78vh] w-full">
        {filteredProducts.map((product) => {
          if (product.quantity > 0) {
            while (product.quantity > 0) {
              return (<div className=" w-[90vw] min-[425px]:w-[80vw] md:w-[40vw] lg:w-[25vw] xl:w-[20vw] h-[35vh] md:h-[40vh] lg:h-[35vh] px-4 border border-black rounded-md flex flex-col justify-center items-center " key={product._id}>
                <div className="h-1/6 w-full flex items-center justify-center " >
                  <img src={product.product_photo} alt="" style={imageStyle} className="bg-white border-solid -translate-y-8 border-black border-2 rounded-full  " />
                </div>


                <div className="h-4/6 w-full flex flex-col justify-between mb-1">
                  <div className="w-full h-4/5">
                    <h2 className='text-black text-lg lg:text-xl font-bold text-center h-2/6 overflow-hidden'>{product.name}</h2>
                    <p className="h-4/6 text-start overflow-hidden ">{product.description.length>40? `${product.description.slice(0,70)}...`:product.description}</p>
                  </div>
                  <div className="w-full h-1/5">
                    <p className="h-5  font-bold text-lg">Price: ${product.price}</p>
                    <p className="font-bold ">Stock: {product.quantity}</p>
                  </div>
                </div>

                <div className="h-1/6 w-full flex items-center ">
                  <button
                    onClick={() => {
                      setDetail(product);
                      setChange(true);
                    }}
                    className="w-full py-1 font-blond rounded-lg text-white text-xm bg-[url('/images/madera.png')]"
                  >
                    Details
                  </button>
                </div>
              </div>)
            }
          }
        }
        )}
      </div>
    </div>
  );
}

export default Products;
