import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5432',
});

export interface AparmentData {
  id_apartment: string;
  firebase_id: string;
  adress: string;
  m2: number;
  floor: number;
  cod: string;
  description: string;
  phone: string;
  building: string;
  email: string;
}

export const getAparmentById = async (id: string): Promise<AparmentData> => {
  console.log('id GETAPARMENTBYID:', id);

  try {
    const response = await apiClient.get<AparmentData>(`/aparments/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching apartment:', error);
    throw error;
  }
};

export const getAparmentByUser = async (
  firebase_id: string
): Promise<AparmentData[]> => {
  try {
    const response = await apiClient.get<AparmentData[]>(
      `/aparments/myaparments/${firebase_id}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching apartment:', error);
    throw error;
  }
};

export const createAparment = async (
  aparmentData: AparmentData
): Promise<AparmentData> => {
  try {
    const response = await apiClient.post<AparmentData>(
      '/aparments/create',
      aparmentData
    );
    return response.data;
  } catch (error) {
    console.error('Error creating apartment:', error);
    throw error;
  }
};

export const updateAparment = async (
  aparmentData: AparmentData
): Promise<AparmentData> => {
  try {
    const response = await apiClient.put<AparmentData>(
      `/aparments/${aparmentData.firebase_id}`,
      aparmentData
    );
    return response.data;
  } catch (error) {
    console.error('Error updating apartment:', error);
    throw error;
  }
};

export const getAllAparments = async (): Promise<AparmentData[]> => {
  try {
    const response = await apiClient.get<AparmentData[]>('/aparments');
    return response.data;
  } catch (error) {
    console.error('Error fetching apartments:', error);
    throw error;
  }
};

export const deleteAparment = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/aparments/${id}`);
  } catch (error) {
    console.error('Error deleting apartment:', error);
    throw error;
  }
};
