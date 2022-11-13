import { useState } from "react";
import DatePicker from "react-datepicker";
import { BsAlarm } from "react-icons/bs";
type Props = {};

const Watch = (props: Props) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="watch-wrapper">
      <div className="watch-container">
        {/* Design Alarm */}
        <div className="alarm">
          <div className="alarm-clock">
            <BsAlarm />
          </div>
          <div className="current-time">
            <div className="current-time-hour">12</div>
            <div className="current-time-minute">00</div>
            <div className="current-time-second">00</div>
          </div>
          <div className="alarm-text">
            <DatePicker
              selected={startDate}
              onChange={(date: any) => setStartDate(date)}
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm aa"
              showTimeInput
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
