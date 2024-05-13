import axios from "axios";

export const buyPackage = async (data, token) => {
  try {
    console.log(token)
    const response = await axios.post(`http://192.168.1.3:8000/api/v1/auth/UserBills`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    throw error;
    
  }
};

export const fetchBill = async (_id, token) => {
  try {
    const response = await axios.get("http://192.168.1.3:8000/api/v1/auth/getBill", data,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response;
  } catch (error) {
    throw error;
  }
};