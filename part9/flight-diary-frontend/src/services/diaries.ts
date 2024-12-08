import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllDiaries = async (): Promise<Array<DiaryEntry>> => {
  const result = await axios.get<Array<DiaryEntry>>(baseUrl);
  return result.data;
};

export const createDiary = async (object: NewDiaryEntry): Promise<DiaryEntry> => {
  try {
    const result = await axios.post<DiaryEntry>(baseUrl, object);
    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // console.log(error.status);
      // console.error(error.response);
      return Promise.reject(error.response);
    };
    // console.error(error);
    return Promise.reject(error);
  };
};
