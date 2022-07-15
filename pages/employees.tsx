import React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import EmployeesChild from '../components/employees/Employees'
import Login from '../components/login/Login'

export default function Employees() {
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
    {isValidFakeToken  ? <EmployeesChild /> : <Login />}
    </>
    
  )
}
