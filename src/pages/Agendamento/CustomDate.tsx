import React, { useState, forwardRef, ForwardedRef } from 'react';

interface CustomDateProps {
  label: string;
  id: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const CustomDate = forwardRef((props: CustomDateProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { label, id, placeholder, onChange } = props;
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  const handleFocus = () => setFocused(true);
  const handleBlur = () => {
    if (!value) {
      setFocused(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={`relative mb-4 flex flex-col ${focused || value ? 'mt-2' : 'mt-4'}`}>
      <label
        htmlFor={id}
        className={`absolute transition-all duration-300 ${focused || value ? '-top-3 text-black text-xs font-bold' : 'top-1/2 -translate-y-1/2 text-sm'} left-2 bg-white px-1`}
      >
        {label}
      </label>
      <input 
        ref={ref}
        type="date"
        id={id}
        className="h-12 rounded-md border border-black px-2 py-1 text-black focus:border-black-2 focus:outline-none"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
});

export default CustomDate;
