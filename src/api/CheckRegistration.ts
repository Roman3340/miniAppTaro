// api.ts
import axios from 'axios';

export async function checkRegistration(telegramId: number) {
  const response = await axios.get(`/users/check_registration/${telegramId}`);
  console.log(telegramId);
  console.log(response);
  return response.data;
}
