import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductsLayout from '../components/ProductsLayout'
import CategoryLayout from '../components/CategoryLayout'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import login from '../redux/actions/singInAction'

const Products = () => {

const[category, setCategory]=useState([])
const[productos,setProductos]=useState([])
const [categoryChecked, setCategoryChecked]  = useState([])
const [productosFiltrados, setProductosFiltrados] = useState(productos)
const [searchValue, setSearchValue] = useState([])
const [filterProMax, setFilterProMax] = useState([])

const search = useRef();
const dispatch=useDispatch()
  const {user,token}=useSelector(store=>store.profile)
useEffect(()=>{
  if (!token.length > 0) {
    if (localStorage.length > 0) {
        const tokenStorage = localStorage.getItem('token')
        const userStorage = JSON.parse(localStorage.getItem('user'))
        console.log(tokenStorage);
        console.log(userStorage);
        const data = { user: userStorage, token: tokenStorage }
        dispatch(login(data))
    }
    getCategory()
    getProducts()
}
},[token])



  const  getProducts = async() =>{
    await axios("http://localhost:8080/products")
    .then((res)=>{
        setProductos(res.data.response)
        setProductosFiltrados(res.data.response)
        
    })
    .catch((err) => console.log(err));
   
}


const  getCategory = async() =>{
    await axios("http://localhost:8080/categorys")
    .then((res)=>{
        setCategory(res.data.response)
    })
    .catch((err) => console.log(err));
}
const handleSearch = (e)=>{
    filter(e.target.value)
}
const filter =(data)=>{
   
    let filtrados = []
   
    
    productosFiltrados.forEach(element =>{
        if(element.name.includes(data)){
            
           // filtrados.push(element)
           if(data !== ""){
            if(searchValue.length > 0){
                filtrados = searchValue.filter((elemento)=>elemento.name.includes(data))
               }else{
                filtrados = productos.filter((elemento)=>elemento.name.includes(data))
               }
           }else{
            filtrados = []
           }
          
           
           if(filtrados.length>0){
            console.log("ieno")
            console.log(filtrados)
            setProductosFiltrados(filtrados)
            setFilterProMax(filtrados)
           } else {
            console.log("vacio")
            if(searchValue.length>0){
                setProductosFiltrados(searchValue)
                setFilterProMax(searchValue)
            } else{
                setProductosFiltrados(productos)
                setFilterProMax(productos)
            }
            
           }
           //
           // if(filtrados.length<1){
           //     console.log("menor")
           //     setProductosFiltrados(productos)
           // }else{
           //     setProductosFiltrados(filtrados)
           // }
           
            
        }
   
        
       // if(productosFiltrados.some(product => product.category_id === element.category_id)){
       //     setProductosFiltrados([element])
       //     console.log("contiene")
       // } else{
       //     setProductosFiltrados([...productosFiltrados, element] )
       //     console.log("no contiene")
       // }
        
    });
    
}








  return (
    <div className='w-full h-screen'>
    <div className= 'w-full flex p-2 justify-between'>
        <p className='w-1/3  text-xl md:text-4xl'>Products</p>
         
        
   <div className="w-1/3 ">
      <div className="relative ">
         <input type="search" onChange={(e)=>{ handleSearch(e)}} ref={search} className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 text-xs placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-2xl sm:leading-6 sm:h-16" placeholder="search your Product"/>
         <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
               <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
         </div>
      </div>

      
   </div>
<div className='w-2/7 flex flex-col'>
<p className='text-xl'>tips</p>
</div>
 

 

</div>
<div className='flex w-full justify-start gap-16 text-center bg-gray-300 p-1 h-16'>



<CategoryLayout
categorias = {category}
setCategoryChecked ={setCategoryChecked}
category = {category}
categoryChecked = {categoryChecked}
setProductos = {setProductos}
productos={productos}
setCategory={setCategory}
productosFiltrados = {productosFiltrados}
setProductosFiltrados = {setProductosFiltrados}
setSearchValue = {setSearchValue}
filterProMax ={filterProMax}


/>
   
</div>

<ProductsLayout
productos = {productos}
categoryChecked = {categoryChecked}
setProductos = {setProductos}
productosFiltrados = {productosFiltrados}
searchValue = {searchValue}

/>

</div>

  )
}

export default Products


{/* <div className="input-wrapper">
  <input type="search" className="input" placeholder="Search">

  <svg xmlns="http://www.w3.org/2000/svg" className="input-icon" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
  </svg>
</div>

<br>

<div className="input-wrapper">
  <input type="password" className="input password" placeholder="Password" data-lpignore="true">

  <svg xmlns="http://www.w3.org/2000/svg" className="input-icon password" viewBox="0 0 20 20" fill="currentColor">
  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
</svg>
</div>

.input-wrapper {
  position: relative;
  width: 271px;
}

.input {
  box-sizing: border-box;
  color: #191919;
  padding: 15px 15px 15px 35px;
  width: 100%;
}

.input.password {
  padding: 15px 35px 15px 15px;
}

.input-icon {
  color: #191919;
  position: absolute;
  width: 20px;
  height: 20px;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
}

.input-icon.password {
  left: unset;
  right: 12px;
} */}