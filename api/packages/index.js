import axios from "axios";

export const buyPackage = async (data, token) => {
  try {
    console.log(token)
    const response = await axios.post(`http://192.168.1.5:8000/api/v1/auth/confirmPayment`, data, {
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
    const response = await axios.get(`http://192.168.1.5:8000/api/v1/auth/getBill?_id=${_id}`,{
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
    const response = await axios.get("http://192.168.1.5:8000/api/v1/auth/allBills",{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response;
  } catch (error) {
    throw error;
  }
};