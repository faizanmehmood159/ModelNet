import axios from "axios";

export const buyPackage = async (data, token) => {
  try {
    console.log(token)
<<<<<<< HEAD
<<<<<<< HEAD
    const response = await axios.post(`http://192.168.38.237:8000/api/v1/auth/UserBills`, data, {
=======
    const response = await axios.post(`http://192.168.1.3:8000/api/v1/auth/confirmPayment`, data, {
>>>>>>> 8bad7dd317d799d62602f9695c481758418597c0
=======
    const response = await axios.post(`http://192.168.1.4:8000/api/v1/auth/confirmPayment`, data, {
>>>>>>> faizan
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    throw error;
    
  }
};
export const bill = async (_id,token) => {
  try {
<<<<<<< HEAD
<<<<<<< HEAD
    const response = await axios.get("http://192.168.38.237:8000/api/v1/auth/getBill", data,{
=======
    const response = await axios.get(`http://192.168.1.3:8000/api/v1/auth/getBill?_id=${_id}`,{
=======
    const response = await axios.get(`http://192.168.1.4:8000/api/v1/auth/getBill?_id=${_id}`,{
>>>>>>> faizan
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchBill = async (token) => {
  try {
<<<<<<< HEAD
    const response = await axios.get("http://192.168.1.3:8000/api/v1/auth/allBills",{
>>>>>>> 8bad7dd317d799d62602f9695c481758418597c0
=======
    const response = await axios.get("http://192.168.1.4:8000/api/v1/auth/allBills",{
>>>>>>> faizan
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response;
  } catch (error) {
    throw error;
  }
};