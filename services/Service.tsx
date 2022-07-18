import { RestorePageRounded } from "@material-ui/icons";
import Axios from "axios";
import { error } from "console";
import { Http2ServerRequest } from "http2";
const Services = {
  postLogin: async function (credentials) {
    await fetch('/api/api-login',{
      method: 'POST',
      body:JSON.stringify({credentials}),
      headers:{
        'Content-type': 'application/json'
      }
    }).then((response) => {
      const data = response.json();
      localStorage.setItem('fakeToken', JSON.stringify(data));
    }).catch((err) => {
        return err;
    });
  }, 
  getEmployees: async function () {
   const res = await Axios.get(`https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/:juan_jose`);
   return res.data.data.employees;
  },
  createUSer: async function (data) {
    const res = await Axios.post(`https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/:juan_jose`, data).then(()=>{
    console.log(res.data); 
    return res.data.json();
    })
    .catch((err) => {
      return err;
    })
  }
    
}

export default Services;
