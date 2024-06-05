import { useState } from "react";

interface CustomInputProduto {
  label: string;
  placeholder: string;
  onChange: (value: string) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void; // Adjust the type as needed
  ref: React.RefCallback<HTMLInputElement>; // Adjust the type as needed
  name: string;
  id?: string; // Optional id property
  min?: string | number; // Optional min property
  max?: string | number; // Optional max property
}

const InputProduto: React.FC<CustomInputProduto> = ({ label, onChange }) => {
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
    setValue(event.target.value);
    onChange(event.target.value);
  };

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
      >
        <option value="">Selecione o Produto</option>
        <option value="Ração">Ração</option>
        <option value="Brinquedo">Brinquedo</option>
      </select>
    </div>
  );
};

export default InputProduto;
