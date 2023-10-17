import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Details from '../components/Details';

const Products = () => {
  const dispatch = useDispatch();
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
    backgroundImage: 'url("/images/madera.png")',
    backgroundSize: 'cover',
    border: '1px solid #000',
    padding: '16px',
    margin: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '10px',
    maxWidth: '300px',
    flex: '1',
  };

  const cardContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
  };

  const filterInputStyle = {
    flex: 1,
    height: '40px',
    fontSize: '16px',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const checkboxStyle = {
    width: '20px',
    height: '20px',
    marginRight: '8px',
  };

  const colorContainerStyle = {
    display: 'flex',
    gap: '8px',
  };

  const imageStyle = {
    width: '100%',
    height: '200px', 
    objectFit: 'contain',
  };

  return (
    <div className='h-full w-full flex flex-col items-center'>
      {change && <Details detail={detail} change={change} setChange={setChange} />}
      <div className='lg:w-3/6 min-[320px]:w-5/6 bg-white flex items-center lg:rounded-lg lg:px-4 lg:py-1 gap-2 min-[320px]:rounded-full min-[320px]:py-2 min-[320px]:px-2'>
        <div style={{ flex: 1 }}>
          <input id='search' type="search" style={filterInputStyle} placeholder='Find Your Product Here' value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {categories.map((category) => (
            <div key={category._id}>
              <input type="checkbox" id={category._id} value={category.name} onChange={handleCheckboxChange} style={checkboxStyle} />
              <label htmlFor={category._id}>{category.name}</label>
            </div>
          ))}
        </div>
      </div>
      <div style={cardContainerStyle}>
        {filteredProducts.map((product) => (
          <div className="justify-center items-center text-center" key={product._id} style={cardStyle}>
            <img onClick={() => {
              setDetail(product);
              setChange(true);
            }} src={product.product_photo} alt="" style={imageStyle} />
            <h2 className='text-white text-2xl font-bold lg:w-full min-[320px]:w-5/6'>{product.name}</h2>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
