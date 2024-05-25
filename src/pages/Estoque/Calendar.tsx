import React, { useState } from 'react';

const Calendar = ({ showCalendar, toggleCalendar, onSelectMonth, currentDate }) => {
  const [months] = useState([
    'Jan', 'Fev', 'Mar', 'Abril', 'Maio', 'Jun',
    'Jul', 'Agosto', 'Set', 'Out', 'Nov', 'Dez'
  ]);

  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const nextYear = () => {
    setCurrentYear(currentYear + 1);
  };

  const prevYear = () => {
    setCurrentYear(currentYear - 1);
  };

  const handleMonthClick = (monthIndex) => {
    console.log('Mês selecionado:', monthIndex);
    onSelectMonth(new Date(currentYear, monthIndex, 1));
    toggleCalendar(); 
  };

  return (
    <div className="relative">
      {showCalendar && (
        <div className="absolute top-5 p-4 border border-gray-300 rounded w-[230px] bg-white max-h-[230px] shadow-md datepicker-dropdown" style={{ border: '1px solid rgba(0, 0, 0, 0.2)', padding: '4px', borderRadius: '4px', direction: 'ltr' }}>
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevYear} className="text-black">&lt;</button>
            <span className="font-bold text-black">{currentYear}</span>
            <button onClick={nextYear} className="text-black">&gt;</button>
          </div>
          <table className="table-auto">
            <tbody>
              {[...Array(3)].map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {[...Array(4)].map((_, colIndex) => {
                    const monthIndex = rowIndex * 4 + colIndex;
                    if (monthIndex < 12) {
                      return (
                        <td 
                          key={colIndex} 
                          className="p-3 cursor-pointer hover:bg-[#cdab7e] text-center text-black"
                          onClick={() => handleMonthClick(monthIndex)}
                          style={{ fontSize: '13px', lineHeight: '1' }}
                        >
                          {months[monthIndex]}
                        </td>
                      );
                    } else {
                      return <td key={colIndex}></td>;
                    }
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
