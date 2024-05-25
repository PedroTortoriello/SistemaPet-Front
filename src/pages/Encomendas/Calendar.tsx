import React, { useState } from 'react';

const Calendar = ({ showCalendar, toggleCalendar, onSelectDay, currentDate }) => {
  const [months] = useState([
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]);

  const [daysOfWeek] = useState(['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa']);

  const [selectedDay, setSelectedDay] = useState(currentDate); // Definindo selectedDay com o currentDate

  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());

  const getDaysOfMonth = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const days = [];

    const lastMonthDays = new Date(year, month, 0).getDate();
    const startDay = lastMonthDays - firstDayOfWeek + 1;

    for (let i = startDay; i <= lastMonthDays; i++) {
      days.push({ day: i, previousMonth: true });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, previousMonth: false });
    }

    return days;
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleDayClick = (day) => {
    console.log('Dia selecionado:', day);
    
    setSelectedDay(day);
    onSelectDay(day); 
    toggleCalendar(); 
  };
  
  
  const daysOfMonth = getDaysOfMonth(currentYear, currentMonth);

  return (
    <div className="relative">
      {showCalendar && (
        <div className="absolute top-5 p-4 border border-gray-300 rounded w-[230px] bg-white max-h-[230px] shadow-md datepicker-dropdown" style={{border: '1px solid rgba(0, 0, 0, 0.2)', padding: '4px', borderRadius: '4px', direction: 'ltr'}}>
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="text-black">&lt;</button>
            <span className="font-bold text-black">{months[currentMonth]} {currentYear}</span>
            <button onClick={nextMonth} className="text-black">&gt;</button>
          </div>
          <table className="table-auto">
            <thead>
              <tr>
                {daysOfWeek.map((day, index) => ( 
                  <th key={index} className="p-1 text-black" style={{fontSize: '12px', lineHeight: '1'}}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(Math.ceil(daysOfMonth.length / 7))].map((_, weekIndex) => (
                <tr key={weekIndex}>
                  {[...Array(7)].map((_, dayIndex) => {
                    const dayObject = daysOfMonth[weekIndex * 7 + dayIndex];
                    return (
                        <td 
                          key={dayIndex} 
                          className={`p-2 cursor-pointer text-center ${dayObject?.previousMonth ? 'text-gray-400' : 'text-black'} ${selectedDay === dayObject?.day ? 'bg-[#cdab7e] font-bold' : ''}`} 
                          onClick={() => handleDayClick(new Date(currentYear, currentMonth, dayObject?.day))}
                          style={{fontSize: '12px', lineHeight: '1'}}
                        >
                        {dayObject?.day}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Calendar;
