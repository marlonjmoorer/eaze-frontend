import axios from 'axios'


const Api = axios.create({
  baseURL: "http://localhost:8000",
})

Api.interceptors.request.use(req => {
    console.log('Fetching')
    return req
  },)
Api.interceptors.response.use(null, function (err) {
    const {response}= err
    if (response&&response.status === 401) {
      //localStorage.removeItem('token');  store.commit("LOGOUT")
    }
    console.warn('Error status', err.response.status);
    console.warn('Error status', err.response);
    return Promise.reject(err)
  
});
 
 export default Api

