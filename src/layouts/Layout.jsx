import { Outlet } from 'react-router-dom'
import Header from './Header'

const layout = () => {
  return (
    <div className='flex min-[320px]:flex-col lg:flex-row'>
    <Header/>
    <Outlet/>
    </div>
  )
}

export default layout