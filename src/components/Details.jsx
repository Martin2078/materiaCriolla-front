import React from 'react'
import checkout from '../../public/images/checkout.png'
import close from '../../public/images/close.png'

const Details = ({change,setChange}) => {
  return (
    <div className='fixed top-0 left-0 w-screen h-full bg-[#999] bg-opacity-50 flex justify-center items-center z-10'>
      <div className='w-10/12 h-5/6 lg:w-8/12 lg:h-4/6 bg-white py-10 px-5 flex flex-col lg:flex-row relative rounded-lg'>
        <img onClick={()=>setChange(!change)} className='w-10 h-10 cursor-pointer absolute top-2 right-2' src={close} alt="" />
        <div className='w-1/2 h-full border flex items-end rounded-lg'>
          <img src="https://lasvinas.com.ar/wp-content/uploads/2021/09/WhatsApp-Image-2021-09-15-at-12.13.31-2_clipped_rev_2.jpeg" alt="" />
        </div>
        <div className='w-1/2 h-full flex flex-col items-center justify-between py-4'>

          <div className='w-5/6 h-5/6 flex flex-col gap-3'>

            <h3 className='text-4xl w-full'>Mate Pumpkin</h3>

            <div className='flex flex-col gap-2 h-2/5'>
            <p className='text-xl'>Description</p>
            <div className='w-full h-full border overflow-y-scroll p-1 px-2'>
            <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae praesentium libero aliquid accusamus culpa quidem itaque, labore nostrum ducimus inventore voluptatibus necessitatibus aperiam, ratione nulla assumenda, officiis sed odio fuga.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam, voluptatum. Architecto veritatis accusantium facere adipisci illo! Adipisci animi velit consectetur fuga perferendis, veritatis iusto suscipit illo possimus quam nesciunt tempora!</p>
            </div>
            </div>

            <p className='text-2xl'>$10000</p>
            <p className='text-lg'>stock: 10</p>
            <div>
            <select name="" id="">
              <option value="1">Seleccione una cantidad</option>
              <option value="1">1</option>
              <option value="1">2</option>
              <option value="1">3</option>
              <option onClick={()=>console.log("escribime")} value="1">otras</option>
              <input type="text" />
            </select>
            </div>
            
          </div>
            <div className='flex w-5/6 gap-5'>
              <button className="w-9/12 rounded-lg text-white text-xl bg-[url('../../public/images/madera.png')]">Buy</button>
              <button><img className='w-10 h-10' src={checkout} alt="" /></button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Details