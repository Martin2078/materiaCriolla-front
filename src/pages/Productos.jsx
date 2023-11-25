import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Details from '../components/Details';
import login from "../redux/actions/singInAction";
import productsAction from '../redux/actions/productosAction'
import categoriesAction from '../redux/actions/categoriesAction'

const Products = () => {
  const dispatch = useDispatch();
  const {token,user}=useSelector((store)=>store.profile)
  
  const products = useSelector((store) => store.products.products);
  const categories = useSelector((store) => store.categories.categories);
  const [change, setChange] = useState(false);
  const [detail, setDetail] = useState(null);
  const [checked, setChecked] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const arrayChecked = checked.map(checkbox => checkbox);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setChecked((prevChecked) => [...prevChecked, value]);
    } else {
      setChecked((prevChecked) => prevChecked.filter((item) => item !== value));
    }
  }

  function filterByCategory(products, categories) {
    if (categories.length === 0) {
      return products;
    } else {
      const filtered = products.filter(product => categories.includes(product.category_id.name));
      return filtered;
    }
  }

  function filterByName(products, name) {
    const filtered = products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
    return filtered;
  }

  const filteredProductsByName = filterByName(products, nameFilter);
  const filteredProducts = filterByCategory(filteredProductsByName, arrayChecked);

  const cardStyle = {


    border: '1px solid #000',
    padding: '16px',

    display: 'flex',
    flexDirection: 'column',

    borderRadius: '10px',
    maxWidth: '300px',

  };

  

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
    if (products.length==0) {
      dispatch(productsAction())
      dispatch(categoriesAction())
    }
  }, [token, user])
  return (
    <div className='h-full w-full flex flex-col items-center'>
      {change && <Details detail={detail} change={change} setChange={setChange} />}
      <div className='w-full bg-white flex flex-col items-center lg:rounded-lg lg:px-4 lg:py-1 gap-2 min-[320px]:rounded-full min-[320px]:py-2 min-[320px]:px-2'>
        <div className="flex w-full justify-between px-5 pt-4">
          <p className=" font-bold  text-xl sm:text-3xl">Products</p>
          <input id='search' type="search" style={filterInputStyle} className="outline-none"  placeholder='Find Your Product Here' value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
        </div>
        <div className="flex w-full bg-[url('/images/madera.png')] rounded-xl gap-5 flex-wrap m-5 px-14 justify-around">
          {categories.map((category) => (
            <div className="p-3 flex flex-col justify-start items-center gap-1" key={category._id}>
              <label className="font-semibold text-xl text-white" htmlFor={category._id}>{category.name}</label>
              <input type="checkbox" id={category._id} value={category.name} onChange={handleCheckboxChange} style={checkboxStyle} />
            
            </div>
          ))}
        </div>
      </div>
      <div className=" justify-center overflow-y-scroll flex flex-wrap h-[75vh] w-full">
        {filteredProducts.map((product) => {
          while (product.quantity > 0) {
            return (<div className=" w-3/12 h-[35vh] m-2 mt-20  justify-center items-center " key={product._id} style={cardStyle}>

              <div className=" ">
                <img

                  src={product.product_photo} alt="" style={imageStyle} className="bg-white -translate-y-14 border-solid border-black border-2 rounded-full " />
              </div>

              <div>
                <h2 className='text-black h-12 text-xl font-bold text-center -translate-y-14 '>{product.name}</h2>
                <p className="h-20 -translate-y-12 text-center ">{product.description.length>40? `${product.description.slice(0,65)}...`:product.description}</p>
                <p className="h-5 -translate-y-10 font-bold text-lg">Price: ${product.price}</p>
                <p className="font-bold -translate-y-8 ">Stock: {product.quantity}</p>
              </div>

              <button
                onClick={() => {
                  setDetail(product);
                  setChange(true);
                }}
                className="w-full py-1 font-blond -translate-y-4 rounded-lg text-white text-xm bg-[url('/images/madera.png')]"
              >
                Details
              </button>
            </div>)
          }
        }
        )}
      </div>
    </div>
  );
}

export default Products;
