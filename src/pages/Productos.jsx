import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import Details from '../components/Details'

const Products = () => {
    const dispatch = useDispatch()
    const products = useSelector((store) => store.products.products)
    const categories = useSelector((store) => store.categories.categories)
    const [change, setChange] = useState(false)
    const [detail, setDetail] = useState(null)
    const [checked, setChecked] = useState([])
    const [nameFilter, setNameFilter] = useState("")
    const arrayChecked = checked.map(checkbox => checkbox)
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target
        if (checked) {
            setChecked((prevChecked) => [...prevChecked, value ])
        } else {
            setChecked((prevChecked) => prevChecked.filter((item) => item !== value))
        }
    }
    function filterByCategory ( products, categories) {
        if (categories.length == 0 ) {
            return products
        } else {
            const filtered = products.filter( product => categories.includes( product.category_id.name ))
            return filtered
        }
    }
    function filterByName ( products, name ) {
        const filtered = products.filter( product => product.name.toLowerCase().includes( name.toLowerCase()))
        return filtered
    }
    const filteredProductsByName = filterByName(products, nameFilter)
    const filteredProducts = filterByCategory(filteredProductsByName, arrayChecked)
    

    return (
        <div className='h-full w-full flex items-center'>
            {change && <Details detail={detail} change={change} setChange={setChange} />}
            <div className='lg:w-3/6 min-[320px]:w-5/6 bg-white flex items-center  lg:rounded-lg lg:px-4 lg:py-1 gap-2 min-[320px]:rounded-full min-[320px]:py-2 min-[320px]:px-2'>
                <button className='bg-white rounded'><img src="/images/search-icon.png" alt="" /></button>
                <input id='search' type="search" className='w-full h-8 border-none text-center' placeholder='Find Your Product Here' value={nameFilter} onChange={(e) => setNameFilter(e.target.value)}/>
            </div>
            <div className='flex flex-col items-center h-fit bg-white lg:-translate-y-10 min-[320px]:-translate-y-12 py-5 lg:rounded-xl lg:w-11/12 min-[320px]:w-full min-[320px]:rounded-t-[55px]'>
                <div className='w-3/6 flex justify-evenly mb-10 mt-5 min-[320px]:gap-2 lg:gap-0'>
                    {(categories.length > 0) ? categories.map((category) => (
                        <div key={category._id}>
                            <input type="checkbox" id={category._id} value={category.name} onChange={handleCheckboxChange}/>
                            <label htmlFor={category._id}>{category.name}</label>
                        </div>
                    )
                    ) : <p>We're sorry, there's no match!</p>
                    }
                </div>
                <div className='flex flex-wrap gap-8 justify-center h-fit lg:w-5/6 lg:flex-row min-[320px]:flex-col min-[320px]:items-center  min-[320px]:w-full'>
                    {filteredProducts.map((product) => (
                        <div key={product._id} className='py-5 px-0 flex flex-col items-start w-7/12 h-full gap-6'>
                            <div>
                                <img onClick={() => {
                                    setDetail(product)
                                    setChange(true)
                                }} src={product.product_photo} alt="" />
                                <h2 className='text-black font-bold lg:w-full min-[320px]:w-5/6'>{product.name}</h2>
                                {(product.colors.length > 0) ? product.colors.map((color) => (
                                    <div key={color} className='h-8 flex items-center justify-center py-1 px-2 w-fit border border-black border-dashed'>
                                        <p>{color}</p>
                                    </div>
                                )) : <div>
                                        <p>{product.color}</p>
                                     </div>}
                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Products