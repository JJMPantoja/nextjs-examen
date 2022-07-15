import Login from '../components/login/Login'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Employees from './employees'

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
     <Login />
    </>
    
  )
}
