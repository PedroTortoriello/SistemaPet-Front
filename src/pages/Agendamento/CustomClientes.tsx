import React, { useState, useEffect } from "react";

interface Option {
  telefone: string;
  email: string;
  value: string;
  label: string;
}

interface CustomClientesSelectProps {
  label: string;
  onChange: (value: string) => void;
  onClientSelect: (client: Option) => void; // Adicione esta linha
  options: Option[];
  id?: string;
  placeholder?: string;
  value?: string;
}


const CustomClientesSelect: React.FC<CustomClientesSelectProps> = ({ label, onChange, onClientSelect, options, id, placeholder, value }) => {
  const [focused, setFocused] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');
  const [showInput, setShowInput] = useState(false);
  const [otherValue, setOtherValue] = useState("");

  useEffect(() => {
    setSelectedValue(value || '');
  }, [value]);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    if (!selectedValue) {
      setFocused(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
    onChange(selectedValue);
    const selectedOption = options.find(option => option.value === selectedValue);
    if (selectedOption) {
      onClientSelect(selectedOption); // Chame onClientSelect com o cliente selecionado
    }
    if (selectedValue === "outros") {
      setShowInput(true);
    } else {
      setShowInput(false);
    }
  };

  const handleOtherInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOtherValue(value);
    onChange(value);
  };

  return (
    <div className={`relative mb-4 flex flex-col ${focused ? 'mt-2' : 'mt-4'}`}>
      <label
        htmlFor={id}
        className={`absolute transition-all duration-300 ${focused || selectedValue ? '-top-3 text-black text-xs font-bold' : 'top-1/2 -translate-y-1/2 text-sm'} left-2 bg-white px-1`}
      >
        {label}
      </label>
      {showInput ? (
        <input
          type="text"
          id={id}
          className="h-12 rounded-md border border-black px-2 py-1 text-black focus:border-black-2 focus:outline-none"
          value={otherValue}
          onChange={handleOtherInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder || 'Digite Outro Valor'}
        />
      ) : (
        <select
          id={id}
          className="h-12 rounded-md border border-black px-2 py-1 text-black focus:border-black-2 focus:outline-none"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          value={selectedValue}
        >
          <option value="">{placeholder || 'Selecione uma Opção'}</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
          <option value="outros">Outros</option>
        </select>
      )}
    </div>
  );
};

export default CustomClientesSelect;
