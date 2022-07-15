import Head from 'next/head'
import Image from 'next/image'
import Login from '../components/login/Login'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Employees from './Employees'

export default function Home() {

  const router = useRouter();

  let fakeToken = ''
  let isValidFakeToken = false;

  useEffect(() => {
    fakeToken = JSON.parse(localStorage.getItem('fakeToken'));
    if ( fakeToken !== null && fakeToken !== '') {
      isValidFakeToken = true; 
      console.log(fakeToken);
      router.push('/employees');
    }
  }, [])
  
  return (
    <>
    {isValidFakeToken  ? <Employees /> : <Login />}
    </>
    
  )
}
