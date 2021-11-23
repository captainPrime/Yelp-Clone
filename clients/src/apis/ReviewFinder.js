import axios from 'axios';

//this is used to run the link with USEEFFECT 
export default axios.create({
    baseURL: "http://localhost:3001/api/v1/reviews"
})

//NOTE