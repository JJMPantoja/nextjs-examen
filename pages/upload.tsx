import React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import UploadChild from '../components/cargar/Upload'
import Login from '../components/login/Login'

export default function Upload() {
  const router = useRouter();

  let fakeToken = ''
  let isValidFakeToken = false;

  useEffect(() => {
    fakeToken = JSON.parse(localStorage.getItem('fakeToken'));
    if ( fakeToken === null || fakeToken === '') {
      isValidFakeToken = true; 
      router.push('/login');
    }
  }, [])
  
  return (
    <>
    <UploadChild />
    </>
    
  )
}
