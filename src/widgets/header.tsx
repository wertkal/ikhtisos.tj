"use client"

import Link from 'next/link'
import React from 'react'
import img from "../../public/photo_2025-03-14_23-30-29-removebg-preview.png"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/shared/ui/button"
import "@/app/styles/globals.css"
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { usePathname } from 'next/navigation'
import Maxwidth from './max-width'

const Header = () => {
  let { theme, setTheme } = useTheme()

  let router = usePathname()
  console.log(router);

  let { t, i18n } = useTranslation()
  if(router == "/login" || router == "/register" ){
    return ""
  }
  return (
    <div className='' style={{background: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)"}}>
      <Maxwidth>
    <div className='flex items-center justify-between sticky top-0 m-auto p-[5px_30px] '>
      <div className="flex">
        <Image src={img} width={70} height={70} alt='Ikhtisos.tj' />
        <h1 className='text-[20px] font-semibold relative top-[15px] '>Ikhtisos.tj</h1>
      </div>
      <div className="flex items-center justify-around w-[48%] relative bottom-[3px] ">
        <Link href={"/client"}>
          <h1 className={`text-[18px] font-semibold hover:text-orange-500 hover:scale-110 ${router == "/client" && ("text-blue-600")} `}>Асосӣ</h1>
        </Link>
        <Link href={"/client/aboutUs"}>
          <h1 className={`text-[18px] font-semibold hover:text-orange-500 hover:scale-110 ${router == "/client/aboutUs" && ("text-blue-600")} `}>Дар бораи мо</h1>
        </Link>
        <Link href={"/client/selectedSpecialty"}>
          <h1 className={`text-[18px] font-semibold hover:text-orange-500 hover:scale-110 ${router == "/client/selectedSpecialty" && ("text-blue-600")} `}>Ихтисоси интихоб шуда</h1>
        </Link>
        <Link href={"/client/news"}>
          <h1 className={`text-[18px] font-semibold hover:text-orange-500 hover:scale-110 ${router == "/client/news" && ("text-blue-600")} `}>Ахбор</h1>
        </Link>
        <Link href={"/client/specialBot"}>
          <h1 className={`text-[18px] font-semibold hover:text-orange-500 hover:scale-110 ${router == "/client/specialBot" && ("text-blue-600")} `}>Боти Махсус</h1>
        </Link>
      </div>
      <div className="flex justify-between w-[270px] relative ">
        {
         <Link href={"/login"}><button className='bg-blue-400 text-white w-[85px] h-[35px] rounded-[5px] relative left-[140px] cursor-pointer'>Sign Up</button></Link>
        }
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="h-[1px] w-[1px] transition-all text-yellow-300 " />
          ) : (
            <Moon className="h-[1px] w-[1px] transition-all" />
          )}
        </Button>
      </div>
    </div>
      </Maxwidth>
    </div>
  )
}

export default Header
