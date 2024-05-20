import React, { useState } from "react";

interface CustomInputProps {
  label: string;
  register: any;
  id: string;
  placeholder: string;
  prefix?: string; // Adicionamos um parâmetro opcional para o prefixo
}

const CustomInput: React.FC<CustomInputProps> = ({ label, register, id, placeholder, prefix }) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    if (!value) {
      setFocused(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  // Adicionamos o prefixo ao valor exibido
  const displayedValue = prefix && !value.startsWith(prefix) ? `${prefix} ${value}` : value;

  return (
    <div className={`relative mb-4 flex flex-col ${focused || value ? 'mt-2' : 'mt-4'}`}>
      <label
        htmlFor={id}
        className={`absolute transition-all duration-300 ${focused || value ? '-top-3 text-black text-xs font-bold' : 'top-1/2 -translate-y-1/2 text-sm'} left-2 bg-white px-1`}
      >
        {label}
      </label>
      <input 
        type="text"
        id={id}
        className="h-12 rounded-md border border-black px-2 py-1 text-black focus:border-black-2 focus:outline-none"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        value={displayedValue} // Usamos o valor com o prefixo
        placeholder={placeholder}
        ref={register}
      />
    </div>
  );
};

export default CustomInput;
