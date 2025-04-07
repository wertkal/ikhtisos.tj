'use client'

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, FormEvent } from 'react';

export default function Login() {
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const userEmail = (form.elements.namedItem('useremail') as HTMLInputElement)?.value;
    const password = (form.elements.namedItem('password') as HTMLInputElement)?.value;
    const role = (form.elements.namedItem("role") as HTMLSelectElement)?.value;

    try {
      const { data } = await axios.get(`http://localhost:5000/users`);
      const user = data.find((user: any) => user.userEmail === userEmail && user.password === password && user.role === role);

      if (user) {
        localStorage.setItem('access_token', 'hellomybrotherhowareyou');
        router.push('/');
      } else {
        setErrorMsg('Истифодабаранда ё парол нодуруст аст. Лутфан сабти ном кунед.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMsg('Хатои шабака ё сервер.');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl px-8 py-10 w-full max-w-sm text-white">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            name="useremail"
            placeholder="Почтаи электронии корбар"
            className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-white text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Коди корбар"
            className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-white text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
          <select
            className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-white text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
            name="role"
            id="">
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-white/30 hover:bg-white/50 transition font-semibold"
          >
            Sign In
          </button>
        </form>

        {errorMsg && (
          <p className="text-red-200 text-sm mt-4 text-center">{errorMsg}</p>
        )}

        <div className="mt-6 text-center text-sm">
          <Link href={'/register'} className="px-4 py-2  text-[20px] rounded text-xs cursor-pointer"
          >            go to register           </Link>
        </div>
      </div>
    </div>
  );
}
