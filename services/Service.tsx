import Axios from "axios";
import { Http2ServerRequest } from "http2";
const Services = {
  postLogin: async function (credentials) {
    const response = await fetch('/api/api-login',{
      method: 'POST',
      body:JSON.stringify({credentials}),
      headers:{
        'Content-type': 'application/json'
      }
    });
    const data = await response.json();
    localStorage.setItem('fakeToken', JSON.stringify(data.data));
    return response;
  }, 
  getEmployees: async function () {
   const res = await Axios.get(`https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/:juan_jose`);
   return res.data.data.employees;
  },
  createUSer: async function (data) {
    const res = await Axios.post(`https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/:juan_jose`, data).then(()=>{
    console.log(res.data); 
    debugger; 
    return res.data.json();
    })
    .catch((err) => {
      return err;
    })
  }
    
}

export default Services;
