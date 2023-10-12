import { Outlet } from 'react-router-dom'
import Header from './Header'
import {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import login from '../redux/actions/singInAction'

const layout = () => {
  const token=useSelector((store)=>store.profile.token)
  const dispatch=useDispatch()
  useEffect(()=>{
    if(!token){
      if (localStorage.length>0) {
          const tokenStorage=localStorage.getItem('token')
          const userStorage=localStorage.getItem('user')
          const data={user:userStorage,token:tokenStorage}
          dispatch(login(data))
      }
  }
  },[token])
  return (
    <div className='flex min-[320px]:flex-col lg:flex-row'>
    <Header/>
    <Outlet/>
    </div>
  )
}

export default layout