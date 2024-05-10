import axios from "axios";

export const buyPackage = async (body, token) => {
  try {
    console.log(body)
    console.log(token)
    const response = await axios.post(`http://192.168.1.3:8000/api/v1/auth/UserBills`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    throw error;
    
  }
};