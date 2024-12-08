import { useState, useEffect } from "react";
import { getAllDiaries, createDiary } from './services/diaries'
import { DiaryEntry, NewDiaryEntry, Weather, Visibility } from './types';
import { Alert, Container } from '@mui/material';

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
  const [diaries, setDiaries] = useState<Array<DiaryEntry>>([]);
  const [date, setDate] = useState<string>('');
  const [weather, setWeather] = useState<Weather>(Weather.Cloudy);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Ok);
  const [comment, setComment] = useState<string>('');
  const [notification, setNotification] = useState<string>('');

  useEffect(() => {
    getAllDiaries().then((data: Array<DiaryEntry>): void => setDiaries(data));
  }, []);

  const handleNewDiary = (event: React.SyntheticEvent): void => {
    event.preventDefault();

    const newDiaryEntry: NewDiaryEntry = { date, weather, visibility, comment };

    createDiary(newDiaryEntry).then((result: DiaryEntry): void => {
      setDiaries(diaries.concat(result));
      setDate('');
      setWeather(Weather.Cloudy);
      setVisibility(Visibility.Ok);
      setComment('');
    })
    .catch((error) => {
      if (!error.data) {
        return console.error('unexpected error:', error);
      };
      
      setNotification(error.data);
      setTimeout(() => setNotification(''), 3000);
    });
  };

  return (
    <Container>
      <h2>Add new entry</h2>
      <div>
        {(notification && 
          <Alert severity="warning">
            {notification}
          </Alert>)}
      </div>
      <form onSubmit={handleNewDiary}>
        <div>
          date:{' '}
          <input type='date' value={date} onChange={({target}) => setDate(target.value)} />
        </div>
        <div>
          visibility:
          {Object.keys(Visibility).map((key) => {
            const enumValue = Visibility[key as keyof typeof Visibility];
            return (
              <>
                <input key={key} type='radio' name='visibility' value={enumValue} 
                  checked={visibility === enumValue} 
                  onChange={({ target }) => setVisibility(target.value as Visibility)} 
                /> {key}
              </>
            );
          })}
        </div>
        <div>
          weather:
          {Object.keys(Weather).map((key) => {
            const enumValue = Weather[key as keyof typeof Weather];
            return (
              <>
                <input key={key} type='radio' name='weather' value={enumValue} 
                  checked={weather === enumValue} 
                  onChange={({ target }) => setWeather(target.value as Weather)} 
                /> {key}
              </>
            );
          })}
        </div>
        <div>
          comment:{' '}
          <input value={comment} onChange={({target}) => setComment(target.value)} />
        </div>
        <button type='submit'>add</button>
      </form>

      <h2>Diary entries</h2>
      <Diary diaries={diaries} />
    </Container>
  );
};

export default App;
