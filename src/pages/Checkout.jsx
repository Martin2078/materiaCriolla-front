import React from 'react'
import NotAllow from '../components/NotAllow'
import { useSelector } from 'react-redux'

const Checkout = () => {
    const {user,token}=useSelector((store)=>store.profile)
  return (<>
    {token?
        (<div>
        </div>)
        :
        <NotAllow/>}
        </>
  )
}

export default Checkout