import axios, { AxiosResponse } from "axios";
import api from "./api";

class UserService {
  constructor() {
    // 
  }
  
  createUser = async (payload: any): Promise<AxiosResponse<any>>=> {
    try {
      const response = await api.post('/users', payload);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
  }

  getUsers = async (): Promise<AxiosResponse<any>> => {
    try {
      const response = await api.get('/user?PageNumber=0&PageSize=200');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
  }
}

export default UserService;