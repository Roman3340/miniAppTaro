import axios from 'axios';
import { AxiosError } from 'axios';

export interface ChartRequest {
  telegram_id: number;
  name: string;
  date_year: number;
  date_month: number;
  date_day: number;
  date_hour?: number;
  date_min?: number;
  location_lat: number;
  location_lon: number;
  location_utc_offset?: string;
}

export interface ChartResponse {
  chart_image: string;
  chart_data: Record<string, any>;
}

export async function generateChart(payload: ChartRequest): Promise<ChartResponse> {
  try {
    const response = await axios.post<ChartResponse>('/chart/', payload);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error('Error details:', error.response?.data);
      throw new Error(error.response?.data?.detail || error.message);
    }
    throw new Error('Unknown error during chart generation');
  }
}