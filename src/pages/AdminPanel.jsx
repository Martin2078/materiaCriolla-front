
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Details from '../components/Details';
import products from "../redux/actions/productosAction";
import axios from "axios";
import edit from "../../public/images/edit.png"
import borrar from "../../public/images/borrar.png"
import EditProduct from "./EditProduct";

const Admin = () => {
  const dispatch = useDispatch();
  const {user,token}=useSelector((store)=>store.profile)

  const [productos, setProductos] = useState([])
  const [change, setChange] = useState(false)
  const [producto,setProducto] =useState({})
  const [productoModificado, setProductoModificado]= useState({})
  const[productoBorrado, setProductoBorrado]= useState({})
  useEffect(() => {
    getProducts()
  }, [productoModificado, productoBorrado])
  
  const getProducts = async () => {
    const id= user._id
    await axios(`http://localhost:8080/productos/userproducts/${id}`)
      .then((res) => {
        setProductos(res.data.response)
        

      })
      .catch((err) => console.log(err));

  }
  console.log(user._id)


const modificarProducto =async(producto)=>{
    await axios.put(`http://localhost:8080/productos/userproducts`, producto)
    .then((res) =>{

        setProductoModificado(res.data.response)
        getProducts()
    }
        
    )
    
}
 

  const handleEditProduct = (data)=>{
    setChange(true)
    setProducto(data)
    
  }

  const handleDelete =async (data)=>{
    await axios.delete(`http://localhost:8080/productos/userproducts/delete/${data}`)
    .then((res) => {
        setProductoBorrado(res.data.response)
        
        getProducts()
      })
    
  }

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
        <h1 className="text-2xl mb-6 mt-6">My products</h1>
      {change && <EditProduct modificarProducto={modificarProducto} producto={producto} change={change} setChange={setChange} setProductoModificado={setProductoModificado} />}
      
      <div style={cardContainerStyle}>
        {productos.map((product) => (
            <>
          <div className="justify-center items-center text-center" key={product._id} style={cardStyle}>
            <img 
             src={product.product_photo} alt="" style={imageStyle} />
            <h2 className='text-white text-2xl font-bold lg:w-full min-[320px]:w-5/6'>{product.name}</h2>
            <div className="flex justify-between w-full">
            <button onClick={()=>handleEditProduct(product)}><img  src= {edit} className="w-7" /> </button>
            <button onClick={()=>handleDelete(product._id)}><img  src= {borrar} className="w-7" /> </button>
            
         </div>
          </div>
          
          </>
        ))}
      </div>
    </div>
    
  );
}

export default Admin;


