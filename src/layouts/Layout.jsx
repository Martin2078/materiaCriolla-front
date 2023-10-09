import { Outlet } from 'react-router-dom'
import Header from './Header'

const layout = () => {
  return (
    <div className='flex'>
    <Header/>
    <Outlet/>
    </div>
  )
}

export default layout