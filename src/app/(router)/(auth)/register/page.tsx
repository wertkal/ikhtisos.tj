'use client'

import axios from 'axios';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';

interface IUser {
  name: string;
  surName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const [cnt, setCnt] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  async function postUser(user: IUser) {
    try {
      await axios.post(`http://localhost:5000/users`, user);
      setMessage('Сабти ном бомуваффақият анҷом ёфт!');
    } catch (error) {
      console.error(error);
      setMessage('Хатогӣ дар вақти сабти ном!');
    }
  }

  function handleAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    const obj: IUser = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      surName: (form.elements.namedItem('surName') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      password: (form.elements.namedItem('password') as HTMLInputElement).value,
      confirmPassword: (form.elements.namedItem('confirmPassword') as HTMLInputElement).value,
    };

    postUser(obj);
  }

  useEffect(() => {
    console.log('Бақайдгирии компонент бор карда шудааст!');
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl px-8 py-10 w-full max-w-md text-white">
        <h2 className="text-2xl font-bold text-center mb-6">Сабти ном</h2>

        <form onSubmit={handleAdd} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Номи корбар"
            className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-white text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
          <input
            type="text"
            name="surName"
            placeholder="Фамилия"
            className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-white text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-white text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Парол"
            className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-white text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Такрори парол"
            className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-white text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
       <Link href={'/login'}>
          <button
            type="submit"
            className="w-full py-3 px-2 rounded-lg bg-white/30 hover:bg-white/50 transition font-semibold"
          >
            Сабти ном
          </button>
            </Link>
        </form>

        {message && (
          <p className="text-sm text-center mt-4 text-green-200">{message}</p>
        )}

        <div className="mt-6 text-center text-sm">
        <Link href={'/login'}             className="px-4 py-2  text-[20px] rounded text-xs cursor-pointer"
        >            go to login            </Link> 
        </div>
      </div>
    </div>
  );
}
