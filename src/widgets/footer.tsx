'use client'
import React from 'react'
import Maxwidth from './max-width'
import { usePathname } from 'next/navigation';

const Footer = () => {
    let router = usePathname()
    console.log(router);
  if(router == "/login" || router == "/register" ){
    return ""
  }
  return (
     <div className='' style={{background: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)"}}>
          <Maxwidth>
    <div className='flex justify-between p-[15px_35px] w-[100%] '>
       <div className="">
         <h2 className='text-[18px] font-semibold '>About Us</h2>
         <h2 className='text-[15px] mt-[10px] '>Item 1</h2>
         <h2 className='text-[15px] mt-[5px] '>Item 2</h2>
         <h2 className='text-[15px] mt-[5px] '>Item 3</h2>
         <h2 className='text-[15px] mt-[5px] '>Item 4</h2>
       </div>
       <div className="">
         <h2 className='text-[18px] font-semibold '>About Us</h2>
         <h2 className='text-[15px] mt-[10px] '>Item 1</h2>
         <h2 className='text-[15px] mt-[5px] '>Item 2</h2>
         <h2 className='text-[15px] mt-[5px] '>Item 3</h2>
         <h2 className='text-[15px] mt-[5px] '>Item 4</h2>
       </div>     
         <div className="">
         <h2 className='text-[18px] font-semibold '>About Us</h2>
         <h2 className='text-[15px] mt-[10px] '>Item 1</h2>
         <h2 className='text-[15px] mt-[5px] '>Item 2</h2>
         <h2 className='text-[15px] mt-[5px] '>Item 3</h2>
         <h2 className='text-[15px] mt-[5px] '>Item 4</h2>
       </div>
       <div className="">
         <h2 className='text-[18px] font-semibold '>About Us</h2>
         <h2 className='text-[15px] mt-[10px] '>Item 1</h2>
         <h2 className='text-[15px] mt-[5px] '>Item 2</h2>
         <h2 className='text-[15px] mt-[5px] '>Item 3</h2>
         <h2 className='text-[15px] mt-[5px] '>Item 4</h2>
       </div>
       <div className="">
         <h2 className='text-[18px] font-semibold '>About Us</h2>
         <h2 className='text-[15px] mt-[10px] '>Item 1</h2>
         <h2 className='text-[15px] mt-[5px] '>Item 2</h2>
         <h2 className='text-[15px] mt-[5px] '>Item 3</h2>
         <h2 className='text-[15px] mt-[5px] '>Item 4</h2>
       </div>
    </div>
    </Maxwidth>
    </div>
  )
}

export default Footer
