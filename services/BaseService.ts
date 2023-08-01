import { AxiosResponse } from "axios";
import { api } from "./api";

export abstract class BaseService {
  create = async (url: string, payload: any): Promise<AxiosResponse<any> | Error> => {
    try {
      const response = await api.post(url, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  update = async (url: string, payload: any): Promise<AxiosResponse<any>> => {
    try {
      const response = await api.put(url, payload);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update data');
    }
  }

  getList = async (url: string): Promise<AxiosResponse<any>> => {
    try {
      const response = await api.get(url);
      return response.data;
    } catch (error: any) {
      throw new Error('Failed to fetch data');
    }
  }

  delete = async (url: string): Promise<AxiosResponse<any>> => {
    try {
      const response = await api.delete(url);
      return response;
    } catch (error) {
      throw error;
    }
  }

  get = async (url: string, id: number): Promise<AxiosResponse<any> | null> => {
    try {
      const apiUrl = url + '/' + id;
      const response = await api.get(apiUrl);
      return response.data;
    } catch (error: any) {
      throw new Error('Failed to fetch data');
    }
  }
}