import React from 'react'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
// import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(customParseFormat);
// dayjs.extend(isBetween);

type CalendarDates = Date | null;

type TimeList = {
  time: string;
  duration: number;
}[]

interface TimeslotProps {
  timeList: TimeList;
  formChangeHandler: (event: Date | CalendarDates[] | React.MouseEvent<HTMLButtonElement> | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

const TimeSlots: React.FC<TimeslotProps> = ({ formChangeHandler, timeList }) => {
  const timeSlots = [
    { startTime: '10:00', duration: 15 },
    { startTime: '10:15', duration: 15 },
    { startTime: '10:30', duration: 15 },
    { startTime: '10:45', duration: 15 },
    { startTime: '11:00', duration: 15 },
    { startTime: '11:15', duration: 15 },
    { startTime: '11:30', duration: 15 },
    { startTime: '11:45', duration: 15 },
    { startTime: '12:00', duration: 15 },
    { startTime: '12:15', duration: 15 },
    { startTime: '12:30', duration: 15 },
    { startTime: '12:45', duration: 15 },
    { startTime: '13:00', duration: 15 },
    { startTime: '13:15', duration: 15 },
    { startTime: '13:30', duration: 15 },
    { startTime: '13:45', duration: 15 },
    { startTime: '14:00', duration: 15 },
    { startTime: '14:15', duration: 15 },
    { startTime: '14:30', duration: 15 },
    { startTime: '14:45', duration: 15 },
    { startTime: '15:00', duration: 15 },
    { startTime: '15:15', duration: 15 },
    { startTime: '15:30', duration: 15 },
    { startTime: '15:45', duration: 15 },
    { startTime: '16:00', duration: 15 },
    { startTime: '16:15', duration: 15 },
    { startTime: '16:30', duration: 15 },
    { startTime: '16:45', duration: 15 },
    { startTime: '17:00', duration: 15 },
    { startTime: '17:15', duration: 15 },
    { startTime: '17:30', duration: 15 },
    { startTime: '17:45', duration: 15 },
    { startTime: '18:00', duration: 15 },
    { startTime: '18:15', duration: 15 },
    { startTime: '18:30', duration: 15 },
    { startTime: '18:45', duration: 15 },
    { startTime: '19:00', duration: 15 },
    { startTime: '19:15', duration: 15 },
    { startTime: '19:30', duration: 15 },
  ];

  const convertTime = (time: string): string => {
    const [hours, minutes] = time.split(":");
    const parseHour = parseInt(hours, 10);
    const period = parseHour >= 12 ? "PM" : "AM";
    const hours12 = parseHour % 12 || 12;

    return `${ hours12 }:${ minutes } ${ period }`
  };

  const times = () => {
    return filteredTimeSlots.map((times: { startTime: string; duration: number; }) => 
      (
        <div>
          <button
          name='time'
          value={ times.startTime }
          onClick={ formChangeHandler }
          className='w-24 sm:mx-3 bg-pink-300 hover:bg-pink-200 px-3 py-1.5 rounded-sm text-center font-semibold text-white focus:ring focus:ring-pink-500 focus:bg-pink-400'
        >{ convertTime(times.startTime) }</button>
      </div>
      ));    
  };
  
  const checkBooked = (timeSlot: { startTime: string; duration: number }) => {
    return timeList.some((booking) => {
      const bookedStart = dayjs(booking.time, 'HH:mm');
      const bookedEnd = bookedStart.add(booking.duration, 'minutes');

      const slotStart = dayjs(timeSlot.startTime, 'HH:mm');
      // const slotEnd = slotStart.add(timeSlot.duration, 'minutes');

      return (
        bookedStart.isSame(slotStart) || // booked time is same as slot time
        bookedEnd.isSame(slotStart.subtract(15, 'minutes')) || // booked time is same as slot time "- 15" to ensure a minimum of 30 min slot before to allow other appointments (min appt time is 30 mins)
        (slotStart.isAfter(bookedStart) && slotStart.isBefore(bookedEnd)) || // removes time slots that are during the duration of appointment. slot times after booked time and before the end time (this is appt duration)
        bookedStart.isSame(slotStart.add(15, 'minutes')) // booked time is same as the slot time + 15 to target the 15 minute slot before the booked time.
      )
    })
  }

  const filteredTimeSlots = timeSlots.filter((slot) => !checkBooked(slot)) // the "!" operator is used because checkBooked() looks for timeslots that MATCH the appointment times

  return (
    <div className='m-auto px-5 border-2 border-solid border-blue-300 grid grid-cols-3 sm:grid-cols-4 gap-2'>
      { times() }
    </div>
  )
};

export default TimeSlots;