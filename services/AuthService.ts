import { AxiosResponse } from "axios";
import { api } from "./api";

interface User {
  email: string,
  password: string
}

class AuthService {
  login = async (user: User): Promise<AxiosResponse<any>> => {
    try {
      const response = await api.post('/auth/login', user);
      return response;
    } catch (error) {
      throw new Error('Failed to login');
    }
  }
  logout = (): void => {
    localStorage.removeItem('access_token');
  }
}

export default AuthService;