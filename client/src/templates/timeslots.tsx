import React from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
// import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat);

// dayjs.extend(isBetween);
// dayjs.tz.setDefault('auto')
type CalendarDates = Date | null;

type BookedTimeList = {
  time: string;
  duration: number;
}[];

// type DefaultTimeSlots = {
//   startTime: string;
//   duration: number;
// }[];

type NewAppointment = {
  date: Date | string;
  time: string;
  id: string;
  price_paid: number;
};

interface TimeslotProps {
  newAppointment: NewAppointment;
  bookedTimes: BookedTimeList;
  formChangeHandler: (event: Date | CalendarDates[] | React.MouseEvent<HTMLButtonElement> | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

const TimeSlots: React.FC<TimeslotProps> = ({ formChangeHandler, bookedTimes, newAppointment }) => {
  const [defaultTimeSlots, setDefaultTimeSlots] = React.useState([
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
  ]);

  const convertTime = (time: string): string => {
    const [hours, minutes] = time.split(":");
    const parseHour = parseInt(hours, 10);
    const period = parseHour >= 12 ? "PM" : "AM";
    const hours12 = parseHour % 12 || 12;

    return `${ hours12 }:${ minutes } ${ period }`
  };

  const displayTimes = () => {
    // if a service is selected (stored in state value "newAppointment.id") use the array of times (serviceDurationFilter) that are further filtered using the selected service duration
    if (newAppointment.id !== "") {
      return serviceDurationFilter.map((times: { startTime: string; duration: number; }) => 
      (
        <div>
          <button
          name='time'
          value={ times.startTime }
          onClick={ formChangeHandler }
          className='w-24 sm:mx-3 bg-pink-300 hover:bg-pink-400 px-3 py-1.5 rounded text-center font-semibold text-white focus:ring focus:ring-pink-500'
        >{ convertTime(times.startTime) }</button>
      </div>
      ));  
    } else {
      return ;
    // uses "filteredTimeSlots" that is a list of time slots that was filtered from times used by already booked appointments *** CAN REMOVE BLOCK??? ***
    // return filteredTimeSlots.map((times: { startTime: string; duration: number; }) => 
    //   (
    //     <div>
    //       <button
    //       name='time'
    //       value={ times.startTime }
    //       onClick={ formChangeHandler }
    //       className='w-24 sm:mx-3 bg-pink-300 hover:bg-pink-200 px-3 py-1.5 rounded-sm text-center font-semibold text-white focus:ring focus:ring-pink-500 focus:bg-pink-400'
    //     >{ convertTime(times.startTime) }</button>
    //   </div>
    //   ));    
  };
}
  // function that checks timeslots against the timeslots taken by booked appointments including durations. Targets times that are UNAVAILABLE - returns a bool to use for filter
  const checkBooked = (timeSlot: { startTime: string; duration: number }) => {
    return bookedTimes.some((booking) => {
      const bookedStart = dayjs(booking.time, 'HH:mm');
      const bookedEnd = bookedStart.add(booking.duration, 'minutes');

      const slotStart = dayjs(timeSlot.startTime, 'HH:mm');
      // const parseService = newAppointment.id !== "" && JSON.parse(newAppointment.id);
      // const slotEnd = slotStart.add(timeSlot.duration, 'minutes');

      return (
        bookedStart.isSame(slotStart) || // booked time is same as slot time
        // bookedEnd.isSame(slotStart.subtract(15, 'minutes')) || // booked time is same as slot time "- 15" to ensure a minimum of 30 min slot before to allow other appointments (min appt time is 30 mins)
        (slotStart.isAfter(bookedStart) && slotStart.isBefore(bookedEnd)) || // removes time slots that are during the duration of appointment. slot times after booked time and before the end time (this is appt duration)
        bookedStart.isSame(slotStart.add(15, 'minutes')) // booked time is same as the slot time + 15 to target the 15 minute slot before the booked time.
      );
    });
  };

  const filteredTimeSlots = defaultTimeSlots.filter((slot) => !checkBooked(slot)); // the "!" operator is used because checkBooked() looks for timeslots that MATCH the already booked appointment times

  // function to check if requested appointment + service duration overlaps any time slots already taken by booked appointments including durations - returns bool to help filter function (serviceDurationFIlter())
  const checkServiceDuration = (timeSlot: { startTime: string; duration: number }) => {
    return bookedTimes.some((booking) => {
      const bookedTime = dayjs(booking.time, 'HH:mm'); // Booked appointment time
      const serviceDuration = newAppointment.id !== "" && JSON.parse(newAppointment.id); // duration in minutes of service selected

      const slotStart = dayjs(timeSlot.startTime, 'HH:mm'); // time of each slot
      const serviceEnd = slotStart.add(serviceDuration.duration, 'minutes') // expected time at end of service

      return (
        (serviceEnd.isAfter(bookedTime) && serviceEnd.isBefore(bookedTime.add(booking.duration, 'minutes'))) // expected time at end of service is after booked appointment start time AND end of service time is before the end of booked appointment
        || (serviceEnd.isAfter(bookedTime) && serviceEnd.isSame(bookedTime.add(booking.duration, 'minutes'))) // expected time at end of service is after booked appointment start AND is the same time as the end of the booked appointment time
        || (slotStart.isBefore(bookedTime) && serviceEnd.isAfter(bookedTime.add(booking.duration, 'minutes'))) // requested appointment time is before booked appointment start AND end of service time is after end of booked appointment time
      )
    })
  };
    
  // uses checkServiceDuration() to see which times (timeslots + duration of service) do NOT overlap with times used by already booked appointments including durations
  const serviceDurationFilter = filteredTimeSlots.filter((slot) => !checkServiceDuration(slot));

  return (
    <>
      <h3 className='text-center font-semibold text-2xl'>Available times:</h3>
      <div className='m-auto px-5 grid grid-cols-3 sm:grid-cols-4 gap-2'>
        { displayTimes() }
      </div>
    </>
  )
};

export default TimeSlots;