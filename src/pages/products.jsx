/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductsLayout from '../components/ProductsLayout'
import CategoryLayout from '../components/CategoryLayout'
import { useRef } from 'react'
import Tips from '../components/Tips'

const Products = () => {

  const [category, setCategory] = useState([])
  const [productos, setProductos] = useState([])
  const [categoryChecked, setCategoryChecked] = useState([])
  const [productosFiltrados, setProductosFiltrados] = useState([])
  const [searchValue, setSearchValue] = useState(productos)
  const [filterProMax, setFilterProMax] = useState(productos)
  const [showTips, setShowTips] = useState(false)
  const [check, setCheck] = useState(false)

  const search = useRef();
  useEffect(() => {
    getCategory()
    getProducts()
  }, [])

  const setShow = () => {

    if (categoryChecked.length > 0) {
      setShowTips(true)
    } else {
      setShowTips(false)
    }
  }

  const handleFilter = (data) => {

    console.log("en la funcion: ", searchValue)
    if (data == "cat") {
      if (searchValue.length > 0) {
        setProductosFiltrados(searchValue)
      } else {
        setProductosFiltrados(productos)
      }
    } else {
      if (filterProMax.length > 0) {
        setProductosFiltrados(filterProMax)
      } else {
        setProductosFiltrados(productos)
      }

    }
  }

  const getProducts = async () => {
    await axios("http://localhost:8080/products")
      .then((res) => {
        setProductos(res.data.response)
        setProductosFiltrados(res.data.response)
        setFilterProMax(res.data.response)
        setSearchValue(res.data.response)

      })
      .catch((err) => console.log(err));

  }

  const getCategory = async () => {
    await axios("http://localhost:8080/categorys")
      .then((res) => {
        setCategory(res.data.response)
      })
      .catch((err) => console.log(err));
  }
  const handleSearch = (e) => {
    filter(e.target.value)
  }
  const filter = (data) => {

    console.log(data)

    let filtrados = []

    console.log("searchvalue: ", searchValue)

    searchValue.forEach(element => {
      let nombre = element.name.toLowerCase()
      if (nombre.includes(data) && data != "") {
        filtrados.push(element)
        console.log(filtrados)
      }
    })
    console.log(filtrados)
    if (filtrados.length > 0) {
      setProductosFiltrados(filtrados)
      setFilterProMax(filtrados)
    } else {
      if (data == "") {
        console.log("borro")
        setFilterProMax(productos)
        setProductosFiltrados(searchValue)
      } else {
        console.log("vacio")
        setProductosFiltrados([])
      }
    }
  }

  console.log(showTips)

  return (
    <div className='w-full h-screen '>
      <div className='flex flex-row-reverse justify-between'>
        {categoryChecked.length > 0 ? <Tips
          categoryChecked={categoryChecked}
        /> : null}
        <div className='w-full '>
          <div className='w-full flex p-2 justify-between'>
            <p className='w-1/2  text-xl md:text-4xl'>Products</p>
            <div className="w-1/2 ">
              <div className="relative ">
                <input type="search" onChange={(e) => { handleSearch(e) }} ref={search} className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 text-xs placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-2xl sm:leading-6 sm:h-16" placeholder="search your Product" />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className='flex w-full justify-around text-center bg-gray-300  h-16'>
            <CategoryLayout
              categorias={category}
              setCategoryChecked={setCategoryChecked}
              category={category}
              categoryChecked={categoryChecked}
              setProductos={setProductos}
              productos={productos}
              setCategory={setCategory}
              productosFiltrados={productosFiltrados}
              setProductosFiltrados={setProductosFiltrados}
              setSearchValue={setSearchValue}
              filterProMax={filterProMax}
              searchValue={searchValue}
              handleFilter={handleFilter}
              setShow={setShow}
              setCheck={setCheck}
            />
          </div>
          <ProductsLayout
            productos={productos}
            categoryChecked={categoryChecked}
            setProductos={setProductos}
            productosFiltrados={productosFiltrados}
            searchValue={searchValue}
            filterProMax={filterProMax}
            setProductosFiltrados={setProductosFiltrados}
            setSearchValue={setSearchValue}
          />
        </div>
      </div>
    </div>
  )
}

export default Products