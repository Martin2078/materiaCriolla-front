import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Details from '../components/Details';
import products from "../redux/actions/productosAction";
import axios from "axios";
import edit from "../../public/images/edit.png"
import borrar from "../../public/images/borrar.png"
import EditProduct from "./EditProduct";
import añadir from "../../public/images/añadir.png"
import CreateProducto from "../components/createProducto";
import { toast, Toaster } from 'react-hot-toast'

const Admin = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((store) => store.profile)

  const [productos, setProductos] = useState([])
  const [change, setChange] = useState(false)
  const [producto, setProducto] = useState({})
  const [productoModificado, setProductoModificado] = useState({})
  const [productoBorrado, setProductoBorrado] = useState({})
  const [searchv, setSearchv] = useState("")
  const [productosFiltrados, setProductosFiltrados] = useState(productos)
  const [show, setShow] = useState(false)
  const [categorias, setCategorias] = useState([])
  const [next, setNext] = useState()
  const [prev, setPrev] = useState()
  const [page, setPage] = useState(1)
  const [maxPages, setMaxPages] = useState()

  const search = useRef();
  useEffect(() => {
    getProducts()
    getCategory()
  }, [productoModificado, page])




  const getCategory = async () => {
    await axios("http://localhost:8080/categorys")
      .then((res) => {
        setCategorias(res.data.response)
      })
      .catch((err) => console.log(err));
  }

  const getProducts = async () => {
    const id = user._id
    await axios(`http://localhost:8080/productos/userproducts/${id}?page=${page}&category=${categorias.join(",")}`)
      .then((res) => {
        setProductos(res.data.response)
        setProductosFiltrados(res.data.response)
        setNext(res.data.pages.next)
        setPrev(res.data.pages.prev)
        setMaxPages(res.data.pages.maxPages)
        console.log("pagina: ", res.data)

      })
      .catch((err) => console.log(err));

  }

  function pagination(start, max) {
    let template = []
    for (let i = start; i < max; i++) {
      template.push(<button className={`${page == i ? "text-blue-700 font-bold" : ""}`} onClick={() => setPage(i)}>{i}...</button>)
    }
    template.push(<button className={`${page == max ? "text-blue-700 font-bold" : ""}`} onClick={() => setPage(max)}>{max}...</button>)
    return template
  }
  console.log(user._id)
  const handleSearch = (e) => {
    console.log(e.target.value)

    filter(e.target.value)
  }

  const modificarProducto = async (producto) => {
    await axios.put(`http://localhost:8080/productos/userproducts`, producto)
      .then((res) => {

        setProductoModificado(res.data.response)
        getProducts()
      }

      )

  }

  const filter = (data) => {

    if (data.length > 0) {
      let filtrados = productos.filter(produ => produ.name.toLowerCase().includes(data.toLowerCase()))
      setProductosFiltrados(filtrados)
      console.log(filtrados)

    } else {
      setProductosFiltrados(productos)
    }
  }

  const handleCreate = async (producto) => {

    await axios.post(`http://localhost:8080/productos/createproduct`, producto)
      .then((res) => {
        setProductoModificado(res.data.response)

        if (res.data.success) {
          toast.success("A product has beed created succesfully")

        } else {
          toast.error("Error creating product: " + res.data.message)
        }
      })


  }

  const showCreate = () => {
    setShow(true)
  }


  const handleEditProduct = (data) => {
    setChange(true)
    setProducto(data)

  }

  const handleDelete = async (data) => {
    await axios.delete(`http://localhost:8080/productos/userproducts/delete/${data}`)
      .then((res) => {
        setProductoModificado(res.data.response)

        getProducts()
      })

  }

  const cardStyle = {


    border: '1px solid #000',
    padding: '16px',

    display: 'flex',
    flexDirection: 'column',

    borderRadius: '10px',
    maxWidth: '300px',

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
    width: '6rem',
    height: '6rem',
    objectFit: 'contain',


  };

  return (

    <div className='h-full w-full flex flex-col items-center'>
      <Toaster position='top-center' toastOptions={{ success: { duration: 2000 }, error: { duration: 2000 } }} />
      <div className="flex  justify-between w-full p-4">
        <h1 className="text-3xl font-bold mb-6 mt-6">My products</h1>
        <input type="search" onChange={(e) => { handleSearch(e); setPage(1) }} ref={search} className=" w-1/2 block  rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 text-xs placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-2xl sm:leading-6 sm:h-16" placeholder="search your Product" />
      </div>
      <div className="flex h-16 w-full mb-4 items pt-3 gap-5 justify-center text-center bg-slate-300">
        <p className="text-2xl ">Create a new product</p>
        <img src={añadir} onClick={() => { showCreate() }} className="w-10 h-10" alt="" />
      </div>
      {change && <EditProduct modificarProducto={modificarProducto} producto={producto} change={change} setChange={setChange} />}
      {show ? <CreateProducto show={show} setShow={setShow} user={user} categorias={categorias} handleCreate={handleCreate} /> : null}

      <div className="flex flex-row flex-wrap w-full overflow-y-scroll h-[75vh] justify-center">
        {productosFiltrados.map((product) => (
          <div className="w-3/12 h-[35vh] m-2 mt-16 justify-center items-center">
            <div className="flex items-center" key={product._id} style={cardStyle}>
              <div className="-translate-y-16">
                <img src={product.product_photo} alt="" style={imageStyle} className="bg-white border-solid border-black border-2 rounded-full " />
              </div>
              <div className="">
                <h2 className='text-black text-xl font-bold w-full h-14 mb-6 -translate-y-12 text-center'>{product.name}</h2>

                <p className=" h-16 -translate-y-16 text-center">{product.description.length>40? `${product.description.slice(0,120)}...`:product.description}</p>
              </div>
              <div className="flex   justify-between w-full">
                <button onClick={() => handleEditProduct(product)}><img src={edit} className="w-7  " /> </button>
                <button onClick={() => handleDelete(product._id)}><img src={borrar} className="w-7" /> </button>

              </div>
            </div>

          </div>
        ))}


      </div>

    </div>

  );
}

export default Admin;