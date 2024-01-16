import React from 'react'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

type CalendarDates = Date | null;

interface TimeslotProps {
  formChangeHandler: (event: Date | CalendarDates[] | React.MouseEvent<HTMLButtonElement> | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
};

const TimeSlots: React.FC<TimeslotProps> = ({ formChangeHandler }) => {
  const timeSlots = [
    { startTime: '10:00', endTime: "10:15", duration: 15 },
    { startTime: '10:15', endTime: '10:30', duration: 15 },
    { startTime: '10:30', endTime: '10:45', duration: 15 },
    { startTime: '10:45', endTime: '11:00', duration: 15 },
    { startTime: '11:00', endTime: "11:15", duration: 15 },
    { startTime: '11:15', endTime: '11:30', duration: 15 },
    { startTime: '11:30', endTime: '11:45', duration: 15 },
    { startTime: '11:45', endTime: '12:00', duration: 15 },
    { startTime: '12:00', endTime: "12:15", duration: 15 },
    { startTime: '12:15', endTime: '12:30', duration: 15 },
    { startTime: '12:30', endTime: '12:45', duration: 15 },
    { startTime: '12:45', endTime: '13:00', duration: 15 },
    { startTime: '13:00', endTime: "13:15", duration: 15 },
    { startTime: '13:15', endTime: '13:30', duration: 15 },
    { startTime: '13:30', endTime: '13:45', duration: 15 },
    { startTime: '13:45', endTime: '14:00', duration: 15 },
    { startTime: '14:00', endTime: "14:15", duration: 15 },
    { startTime: '14:15', endTime: '14:30', duration: 15 },
    { startTime: '14:30', endTime: '14:45', duration: 15 },
    { startTime: '14:45', endTime: '15:00', duration: 15 },
    { startTime: '15:00', endTime: "15:15", duration: 15 },
    { startTime: '15:15', endTime: '15:30', duration: 15 },
    { startTime: '15:30', endTime: '15:45', duration: 15 },
    { startTime: '15:45', endTime: '16:00', duration: 15 },
    { startTime: '16:00', endTime: "16:15", duration: 15 },
    { startTime: '16:15', endTime: '16:30', duration: 15 },
    { startTime: '16:30', endTime: '16:45', duration: 15 },
    { startTime: '16:45', endTime: '17:00', duration: 15 },
    { startTime: '17:00', endTime: "17:15", duration: 15 },
    { startTime: '17:15', endTime: '17:30', duration: 15 },
    { startTime: '17:30', endTime: '17:45', duration: 15 },
    { startTime: '17:45', endTime: '17:00', duration: 15 },
    { startTime: '18:00', endTime: "18:15", duration: 15 },
    { startTime: '18:15', endTime: '18:30', duration: 15 },
    { startTime: '18:30', endTime: '18:45', duration: 15 },
    { startTime: '18:45', endTime: '19:00', duration: 15 },
    { startTime: '19:00', endTime: "19:15", duration: 15 },
    { startTime: '19:15', endTime: '19:30', duration: 15 },
    { startTime: '19:30', endTime: '19:45', duration: 15 },
  ];

  const convertTime = (time: string): string => {
    const [hours, minutes] = time.split(":");
    const parseHour = parseInt(hours, 10);
    const period = parseHour >= 12 ? "PM" : "AM";
    const hours12 = parseHour % 12 || 12;

    return `${ hours12 }:${ minutes } ${ period }`
  };

  const times = () => {
    return filteredTimeSlots.map((times: { startTime: string; endTime: string; duration: number; }) => 
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


  const booked = {
    startTime: '19:30',
    duration: 60
  };
  
  const filteredTimeSlots = timeSlots.filter((slot) => {
    const slotStartTime = dayjs(slot.startTime, 'HH:mm');
    const bookedStartTime = dayjs(booked.startTime, 'HH:mm');
    const startTimeBuffer = bookedStartTime.subtract(15, 'minutes'); // 'subtract() method with 15 because there needs to be a MINIMUM of 30 minutes prior to allow appointments before
    const bookedEndTime = bookedStartTime.add(booked.duration - 15, 'minutes'); // '- 15' to remove 15 minute time buffer since appointments can be back to back with no break

    return (
      slotStartTime.isBefore(startTimeBuffer) ||
      slotStartTime.isAfter(bookedEndTime)
    );
  });



  return (
    <div className='m-auto px-5 border-2 border-solid border-blue-300 grid grid-cols-3 sm:grid-cols-4 gap-2'>
      { times() }
    </div>
  )
};

export default TimeSlots;