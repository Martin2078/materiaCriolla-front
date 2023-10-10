/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Display from '../components/display.jsx'



const Header = () => {
 const [open, setOpen] = useState(true)
  return (
      <Display open={open} setOpen={setOpen}/>
  )
}

export default Header