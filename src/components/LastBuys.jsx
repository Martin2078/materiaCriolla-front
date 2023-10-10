import React from 'react'

const LastBuys = (name, date, price, state,photo,setBuy,setBuyDetail,buyDetail) => {
    return (
        <div onClick={() => {setBuy(true);setBuyDetail({...buyDetail,name,date,price,state,photo})}} className='w-11/12 h-7 cursor-pointer flex justify-evenly items-center border rounded-xl border-black'>
        <div className='w-5/6 h-full flex items-center'>
                <p className='w-1/3 text-center'>{name}</p>
                <p className='w-1/3 text-center'>{date}</p>
                <p className='w-1/3 text-center'>${price}</p>
            </div>
            {state === "Done" ?
                <div className='w-1/6 border rounded-r-xl border-l-black h-full flex justify-between items-center'>
                    <p className='text-xs w-1/4 text-right'>🟢</p>
                    <p className='w-3/4 text-center'>Done</p>
                </div>
                :
                <div className='w-1/6 border rounded-r-xl border-l-black h-full flex justify-between items-center'>
                    <p className='text-xs  w-1/4 text-right'>⚪</p>
                    <p className='w-3/4 text-center'>Pending</p>
                </div>
            }
        </div>
    )
}

export default LastBuys