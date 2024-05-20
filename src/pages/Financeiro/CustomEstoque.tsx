import React, { useState } from "react";

interface CustomAlimSelectProps {
  label: string;
  onChange: (value: string) => void;
}

const CustomAlim: React.FC<CustomAlimSelectProps> = ({ label, onChange }) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const [selectedMarca, setSelectedMarca] = useState('');
  
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
    setSelectedMarca(event.target.value);
    onChange(event.target.value);
  };

  const marcasAlimentacao = [
    { marca: "Royal Canin", produtos: ["Royal Canin Indoor", "Royal Canin Maxi", "Royal Canin Medium"] },
    { marca: "Pedigree", produtos: ["Pedigree Vital Protection", "Pedigree Dentastix", "Pedigree Puppy"] },
    { marca: "Premier Pet", produtos: ["Premier Pet Raças Pequenas", "Premier Pet Golden Fórmula", "Premier Pet Ambientes Internos"] },
    { marca: "Guabi Natural", produtos: ["Guabi Natural Raças Pequenas", "Guabi Natural Carne", "Guabi Natural Salmão"] },
    { marca: "Biofresh", produtos: ["Biofresh para Cães Filhotes", "Biofresh para Cães Adultos", "Biofresh para Cães Sênior"] },
    { marca: "Nestlé Purina", produtos: ["Nestlé Purina Pro Plan", "Nestlé Purina Dog Chow", "Nestlé Purina Cat Chow"] },
    { marca: "Farmina", produtos: ["Farmina N&D Prime", "Farmina N&D Pumpkin", "Farmina N&D Quinoa"] },
    { marca: "Golden", produtos: ["Golden Formula Cães Adultos", "Golden Formula Cães Filhotes", "Golden Fórmula Cães Sênior"] },
    { marca: "PremieRpet", produtos: ["PremieRpet Ambientes Internos", "PremieRpet Golden Formula", "PremieRpet Raças Pequenas"] },
    { marca: "Hills", produtos: ["Hills Science Diet Cães Adultos", "Hills Science Diet Cães Filhotes", "Hills Science Diet Cães Sênior"] }
  ];

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
        value={selectedMarca}
      >
        <option value="">Selecione a Marca</option>
        {marcasAlimentacao.map((marca, index) => (
          <option key={index} value={marca.marca}>{marca.marca}</option>
        ))}
      </select>
      {selectedMarca && (
        <select
          id="produtos"
          className="mt-4 h-12 rounded-md border border-black px-2 py-1 text-black focus:border-black-2 focus:outline-none"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          value={value}
        >
          <option value="">Selecione o Produto</option>
          {marcasAlimentacao.find(marca => marca.marca === selectedMarca)?.produtos.map((produto, index) => (
            <option key={index} value={produto}>{produto}</option>
          ))}
        </select>
      )}
    </div>
  );
};

export default CustomAlim;
