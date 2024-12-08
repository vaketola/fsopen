import { useState, useEffect } from "react";
import { getAllDiaries, createDiary } from './services/diaries'
import { DiaryEntry, NewDiaryEntry, Weather, Visibility } from './types';

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
  const [date, setDate] = useState<string>('')
  const [weather, setWeather] = useState<string>('')
  const [visibility, setVisibility] = useState<string>('')
  const [comment, setComment] = useState<string>('')

  useEffect(() => {
    getAllDiaries().then((data: Array<DiaryEntry>): void => setDiaries(data));
  }, []);

  const handleNewDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newDiaryEntry: NewDiaryEntry = {
      date: date,
      weather: weather as Weather,
      visibility: visibility as Visibility,
      comment: comment,
    };

    createDiary(newDiaryEntry).then((result: DiaryEntry): void => {
      setDiaries(diaries.concat(result));
      setDate('');
      setWeather('');
      setVisibility('');
      setComment('');
    });
  };

  return (
    <>
      <h2>Add new entry</h2>
      <form onSubmit={handleNewDiary}>
        <div>
          date:{' '}
          <input value={date} onChange={({target}) => setDate(target.value)} />
        </div>
        <div>
          weather:{' '}
          <input value={weather} onChange={({target}) => setWeather(target.value)} />
        </div>
        <div>
          visibility:{' '}
          <input value={visibility} onChange={({target}) => setVisibility(target.value)} />
        </div>
        <div>
          comment:{' '}
          <input value={comment} onChange={({target}) => setComment(target.value)} />
        </div>
        <button type='submit'>add</button>
      </form>

      <h2>Diary entries</h2>
      <Diary diaries={diaries} />
    </>
  );
};

export default App;
