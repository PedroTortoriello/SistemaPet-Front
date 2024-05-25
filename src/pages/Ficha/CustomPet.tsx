import React, { useState, forwardRef, ChangeEvent } from "react";

interface CustomPetProps {
  label: string;
  id: string;
  placeholder: string;
  prefix?: string;
  onChange?: (value: string) => void; // Adicionando a propriedade onChange opcional
}

const CustomPet: React.ForwardRefRenderFunction<HTMLInputElement, CustomPetProps> = (
  { label, id, placeholder, prefix, onChange }, // Adicionando onChange à lista de props
  ref
) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  const handleFocus = () => setFocused(true);

  const handleBlur = () => {
    if (!value) setFocused(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (onChange) { // Verificando se onChange é definido antes de chamá-lo
      onChange(newValue);
    }
  };

  const displayedValue = prefix ? `${prefix} ${value}` : value;

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
        type="text"
        id={id}
        className="h-12 rounded-md border border-black px-2 py-1 text-black focus:border-black-2 focus:outline-none"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        value={displayedValue}
        placeholder={placeholder}
      />
    </div>
  );
};

export default forwardRef(CustomPet);
