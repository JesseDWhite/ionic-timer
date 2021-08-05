import { IonButton, IonProgressBar } from '@ionic/react';
import './StopWatch.css';
import { useState, useEffect } from 'react';

function App() {

  const [time, setTime] = useState(0)
  const [timerOn, setTimerOn] = useState(false)
  const [laps, setLap] = useState([]) //eventually could be mapped through to display all previous lap times.


  const minutes = ('0' + Math.floor((time / 60000) % 60)).slice(-2); //divided by how many 60000 milliseconds there are in a minute and then back down to 0 when 60 seconds are met.
  const seconds = ('0' + Math.floor((time / 1000) % 60)).slice(-2); //divided by how many 1000 milliseconds there are in a second and then back down to 0 when 60 seconds are met.
  const milliseconds = ('0' + ((time / 10) % 100)).slice(-2); //divided by how many 100's milliseconds there are and then back to 0 when 100 are met. The slice keeps it at two digits.

  useEffect(() => {
    let interval = null;
    if (timerOn) { //timer has been turned on and runs the interval.
      interval = setInterval(() => {
        setTime(previousTime => previousTime + 10) //increase the setTime by 10.
      }, 10); //number of milliseconds within setInterval.
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval) //this cleanup function is the one that is actaully stoping the timer and clearing the memory.
  }, [timerOn]); //uses this hook based on the truthy-ness of the timerOn state hook.

  const setNewLap = () => {
    let currentLap = time - laps.reduce((previousLapTime, currentLapTime) => previousLapTime + currentLapTime, 0); //will set the initial value to 0 to allow reduce to work.
    setLap(previousLaps => [...previousLaps, currentLap]) //creates a spread clone of the privious laps and adds the newest laptime to the beginning.
  }

  const displayLapTimes = laps.map((lap, index) => { //will map through the array of laps and append each indivdual lap.
    const lapMinutes = ('0' + Math.floor((lap / 60000) % 60)).slice(-2);
    const lapSeconds = ('0' + Math.floor((lap / 1000) % 60)).slice(-2);
    const lapMilliseconds = ('0' + ((lap / 10) % 100)).slice(-2);
    return (
      <p key={index}>Lap {index + 1}: {lapMinutes}:{lapSeconds}:{lapMilliseconds}</p>
    )
  })

  const resetStopWatch = () => {
    setTime(0);
    setTimerOn(false);
    setLap([]);
  }

  return (
    <div className="container">
      <span>{minutes}:</span>
      <span>{seconds}:</span>
      <span>{milliseconds}</span>
      <div>
        <IonProgressBar value={seconds} color='tertiary'></IonProgressBar>
        {!timerOn && time === 0 && ( //render conditional that checks for timerOn and if it is equal to 0.
          <IonButton onClick={() => setTimerOn(true)} color='tertiary' size='large'>Start Timer</IonButton>
        )}
        {timerOn && (
          <IonButton onClick={() => setNewLap(time)} color='tertiary' size='large'>Lap</IonButton>
        )}
        {timerOn && (
          <IonButton onClick={() => setTimerOn(false)} color='danger' size='large'>Stop Timer</IonButton>
        )}
        {!timerOn && time !== 0 && (
          <IonButton onClick={() => setTimerOn(true)} color='tertiary' size='large'>Resume</IonButton>
        )}
        {!timerOn && time > 0 && (
          <IonButton onClick={() => resetStopWatch()} color='danger' size='large'>Reset</IonButton>
        )}
      </div>
      <div>
        <h3>Lap Time</h3>
        <span>{displayLapTimes}</span>
      </div>
    </div>
  );
};

export default App;
