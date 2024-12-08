import axios from 'axios';
import { DiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAll = (): Promise<Array<DiaryEntry>> => {
  return axios.get<Array<DiaryEntry>>(baseUrl).then(result => result.data);
};
