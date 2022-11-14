import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsAlarm } from "react-icons/bs";
import swal from "sweetalert";
import ModalOption from "./ModalOption";

type Props = {};

const Watch = (props: Props) => {
  const [startDate, setStartDate] = useState(new Date());

  const [time, setTime] = useState<any>();

  const [alarmTime, setAlarmTime] = useState<any>();
  const [currentTime, setCurrentTime] = useState<any>();
  const [isAlarmStart, setIsAlarmStart] = useState(false);
  const [alarmTimeInString, setAlarmTimeInString] = useState<any>();
  const [isRinging, setIsRinging] = useState(false);

  /* audio ref */
  const audioRef = useRef(null);

  /* handle set alarm */
  const handleSetAlarm = () => {
    const time = startDate.getTime();
    if (time < currentTime) {
      swal("Select Future date!", "please select future date ", "error");
      return;
    }
    localStorage.setItem("alarmTime", JSON.stringify(time));
    const getAlarmTime = localStorage.getItem("alarmTime");
    const alarmTime = new Date(
      JSON.parse(getAlarmTime || "")
    ).toLocaleTimeString();
    const alarmDate = new Date(JSON.parse(getAlarmTime || "")).toDateString();
    setAlarmTime(alarmDate + " at " + alarmTime);
    swal(
      "Alarm set at " + startDate.toLocaleTimeString(),
      " alarm successfully set ",
      "success"
    );
  };

  /* handle ring alarm */
  useEffect(() => {
    const alarmTime = JSON.parse(localStorage.getItem("alarmTime") || "0");
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      if (alarmTime && alarmTime > currentTime) {
        const timeDiff = alarmTime - currentTime;
        setTimeout(() => {
          (audioRef as any).current.play();
          (audioRef as any).current.volume = 1;

          setIsRinging(true);
          setIsAlarmStart(true);
        }, timeDiff);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [alarmTime, time]);

  useEffect(() => {
    const nowDate = new Date().toDateString();
    const nowTime = new Date().toTimeString();
    const now = new Date(nowDate + " " + nowTime);

    /* set current time */
    setTime(now.toLocaleTimeString());
    const interval = setInterval(() => {
      const nowDate = new Date().toDateString();
      const nowTime = new Date().toTimeString();
      const now = new Date(nowDate + " " + nowTime);
      setCurrentTime(now.getTime());

      /* set current time */
      setTime(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  useEffect(() => {
    const getAlarmTimeInStorage = localStorage.getItem("alarmTime");
    const getAlarmTime = JSON.parse(getAlarmTimeInStorage || "0");
    const alarmTime = new Date(getAlarmTime).toLocaleTimeString();
    const alarmDate = new Date(getAlarmTime || "").toDateString();
    setAlarmTime(alarmDate + " at " + alarmTime);
    setAlarmTimeInString(getAlarmTime);
  }, [time]);

  /* countdown */
  const countdown = () => {
    const alarmTime = new Date(JSON.parse(alarmTimeInString)) || new Date();
    const now = new Date();
    const diff = alarmTime.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
  };

  return (
    <div className="watch-wrapper">
      {isAlarmStart && (
        <ModalOption
          audioRef={audioRef}
          time={alarmTime}
          setAlarmTime={setAlarmTime}
          setIsAlarmStart={setIsAlarmStart}
          setIsRinging={setIsRinging}
        />
      )}

      <div className="watch-container">
        <audio id="audio" ref={audioRef} autoPlay loop>
          <source
            src={require("./../assets/alarm-sound-1.mp3")}
            type="audio/mpeg"
          />
        </audio>

        {alarmTimeInString > 0 && !isRinging && (
          <div className="alarm-set-time">
            <div className="alarm-set-time__title">Alarm will start at</div>
            <div className="alarm-set-time__time "> {countdown()}</div>
          </div>
        )}

        {/* Design Alarm */}
        <div className="alarm">
          <div className="alarm-clock">
            <BsAlarm size={80} />
          </div>
          <div className="current-time">
            <h1>{time}</h1>
          </div>
          <div className="alarm-text poppins">
            <DatePicker
              selected={startDate}
              onChange={(date: any) => setStartDate(date)}
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm aa"
              showTimeInput
              withPortal
              customInput={
                <input
                  className="alarm-text-input"
                  placeholder="Set Alarm"
                  type="text"
                />
              }
            />
            <button onClick={handleSetAlarm} className="set-button">
              <BsAlarm /> Set alarm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
