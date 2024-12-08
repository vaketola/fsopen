import { useState, useEffect } from "react";
import { getAll } from './services/diaries'
import { DiaryEntry } from './types';

const Diary = ({ diaries }: { diaries: Array<DiaryEntry> }): JSX.Element => {
  return (
    <>
      {diaries.map((diary: DiaryEntry): JSX.Element => (
          <p key={diary.id}>
            <b>{diary.date}</b>
            <br></br>visibility: {diary.visibility}
            <br></br>weather: {diary.weather}
            <br></br>comment: {diary.comment || ''}
          </p>
      ))}
    </>
  );
};

const App = (): JSX.Element => {
  const [diaries, setDiaries] = useState<Array<DiaryEntry>>([])

  useEffect(() => {
    getAll().then((data: Array<DiaryEntry>): void => setDiaries(data));
  }, []);

  return (
    <>
      <h2>Diary entries</h2>
      <Diary diaries={diaries} />
    </>
  );
};

export default App;
