import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://mdw-final-server.onrender.com',
});

export interface UserData {
  email: string;
  firebase_id: string;
  name: string;
  phone: string;
}

export const getUserID = async (id: string): Promise<UserData> => {
  try {
    const response = await apiClient.get<UserData>(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const createUser = async (userData: UserData): Promise<UserData> => {
  try {
    const response = await apiClient.post<UserData>('/users/create', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (userData: UserData): Promise<UserData> => {
  try {
    const response = await apiClient.put<UserData>(
      `/users/${userData.firebase_id}`,
      {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        firebase_id: userData.firebase_id,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};
