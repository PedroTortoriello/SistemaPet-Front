import React, { useState } from 'react';

function Times() {
  const [selectedTimes, setSelectedTimes] = useState([]);

  const handleTimeClick = (time) => {
    if (selectedTimes.includes(time)) {
      setSelectedTimes(selectedTimes.filter(t => t !== time));
    } else {
      setSelectedTimes([...selectedTimes, time]);
    }
  };

    return (
      <div className="w-[280px] p-[15px] border border-black">
        {[...Array(10)].map((_, index) => {
          const time1 = `${8 + index}:00`;
          const time2 = `${8 + index}:30`;
  
          return (
            <div key={index} className="mt-10 flex items-center relative">
              <span className="">{8 + index}</span>
              <input
                type="text"
                placeholder="Digite aqui"
                className="ml-2 bg-[#F1F5F9] dark:text-bodydark px-2 py-1 rounded"
              />
              <div className="" data-time={time1}></div>
              <div className="" data-time={time2}></div>
            </div>
          );
        })}
      </div>
    );
  }
  

  
export default Times;
