import React, { useState } from "react";

interface CustomSelectSelectProps {
  label: string;
  onChange: (value: string) => void;
  id?: string
  placeholder?: string
}

const CustomSelect: React.FC<CustomSelectSelectProps> = ({ label, onChange }) => {
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

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setValue(selectedValue);
    onChange(selectedValue);
  };

  const generateHorarios = () => {
    const horarios = [];
    for (let h = 8; h <= 17; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hora = h < 10 ? `0${h}` : h;
        const minuto = m === 0 ? '00' : m;
        horarios.push(`${hora}:${minuto}`);
      }
    }
    return horarios;
  };

  const opcoes = generateHorarios();

  return (
    <div className={`relative mb-4 flex flex-col ${focused ? 'mt-2' : 'mt-4'}`}>
      <label
        htmlFor={label}
        className={`absolute transition-all duration-300 ${focused || value ? '-top-3 text-black text-xs font-bold' : 'top-1/2 -translate-y-1/2 text-sm'} left-2 bg-white px-1`}
      >
        {label}
      </label>
      <select
        id={label}
        className="h-12 rounded-md border border-black px-2 py-1 text-black focus:border-black-2 focus:outline-none"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        value={value}
      >
        <option value="">Selecione uma Opção</option>
        {opcoes.map((opcao, index) => (
          <option key={index} value={opcao}>{opcao}</option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
