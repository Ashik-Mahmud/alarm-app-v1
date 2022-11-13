import { useEffect } from "react";
import { BsAlarm } from "react-icons/bs";
import swal from "sweetalert";
type Props = {
  time: string;
  setIsAlarmStart: (value: boolean) => void;
  setAlarmTime: (value: string) => void;
  audioRef: any;
  setIsRinging: (value: boolean) => void;
};

const ModalOption = ({
  time,
  setAlarmTime,
  audioRef,
  setIsAlarmStart,
  setIsRinging,
}: Props) => {
  /* handle off alarm */
  const handleAlarmOff = () => {
    (audioRef as any).current.pause();
    setIsAlarmStart(false);
    localStorage.removeItem("alarmTime");
    localStorage.removeItem("snoozeCount");
  };

  /* handle snooze for 5 mins */
  const handleSnoozeFor5Mins = () => {
    const snoozeCount = JSON.parse(localStorage.getItem("snoozeCount") || "0");
    const snoozeTime = new Date().getTime() + 30000;
    localStorage.setItem("alarmTime", JSON.stringify(snoozeTime));
    localStorage.setItem("snoozeCount", JSON.stringify(snoozeCount + 1));
    setAlarmTime(new Date(snoozeTime).toLocaleTimeString());
    (audioRef as any).current.pause();
    setIsAlarmStart(false);
    setIsRinging(false);
    const snooze = JSON.parse(localStorage.getItem("snoozeCount") || "0");
    if (snooze >= 5) {
      swal("Snooze limit reached!", "please turn off alarm ", "error");
      localStorage.removeItem("alarmTime");
      localStorage.removeItem("snoozeCount");
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        <div className="modal-body">
          <div className="modal-icon">
            <BsAlarm />
          </div>
          <div className="alarm-time">{time || "00:00:00"}</div>
          <div className="btn-groups">
            <button onClick={handleSnoozeFor5Mins}>Snooze</button>
            <button onClick={handleAlarmOff}>Off</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalOption;
