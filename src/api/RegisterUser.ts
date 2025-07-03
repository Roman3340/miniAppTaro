import axios from 'axios';
import { AxiosError } from 'axios';


export type RegistrationPayload = {
  telegram_id: number;
  first_name?: string | undefined;
  username?: string | undefined;
  name?: string | undefined;
  gender?: string | undefined;
  birth_date?: string | undefined;
  birth_time?: string | undefined;
  birth_place?: string | undefined;
  residence_place?: string | undefined;
  privacy_agreed: boolean;
  is_unregistered: boolean;
};


// export async function registerUser(payload: RegistrationPayload) {
//   const response = await axios.post('/users/register', payload);
//   return response.data;
// }

export async function registerUser(payload: RegistrationPayload) {
  try {
    const response = await axios.post('/users/register', payload);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error('Error details:', error.response?.data);
      throw new Error(error.response?.data?.detail || error.message);
    }
    throw new Error('Unknown error during registration');
  }
}
