import React, { useState } from "react";

interface CustomCuidadoSelectProps {
  label: string;
  onChange: (value: string) => void;
}

const CustomCuidado: React.FC<CustomCuidadoSelectProps> = ({ label, onChange }) => {
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

  const marcasCuidado = [
    { 
      marca: "Granado Pet", 
      produtos: ["Granado Pet Talco Antipulgas", "Granado Pet Condicionador Pelos Claros", "Granado Pet Colônia Erva Doce"]
    },
    { 
      marca: "Sanol Dog", 
      produtos: ["Sanol Dog Shampoo Neutro", "Sanol Dog Shampoo Pelos Escuros", "Sanol Dog Repelente de Carrapatos"]
    },
    { 
      marca: "Pet Society", 
      produtos: ["Pet Society Shampoo Dermocalmante", "Pet Society Perfume Tutti Frutti", "Pet Society Máscara de Hidratação Intensa"]
    },
    { 
      marca: "Organnact Pet", 
      produtos: ["Organnact Pet Alivium 100", "Organnact Pet Ômega 3", "Organnact Pet Pasta Palatável"]
    },
    { 
      marca: "Biovet", 
      produtos: ["Biovet Spray Cicatrizante", "Biovet Shampoo Antifúngico e Antibacteriano", "Biovet Solução Otológica"]
    },
    { 
      marca: "Vetnil", 
      produtos: ["Vetnil Shampoo Neutro", "Vetnil Solução para Higiene Oral", "Vetnil Colírio Lubrificante"]
    },
    { 
      marca: "Pet Clean", 
      produtos: ["Pet Clean Sabonete Líquido Antipulgas", "Pet Clean Shampoo Pelos Claros", "Pet Clean Condicionador Coco"]
    },
    { 
      marca: "Savali", 
      produtos: ["Savali Shampoo Gatos Filhotes", "Savali Hidratante de Pelos", "Savali Talco Perfumado"]
    }
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
        {marcasCuidado.map((marca, index) => (
          <option key={index} value={marca.marca}>{marca.marca}</option>
        ))}
      </select>
      {selectedMarca && (
        <select
          id="produtos"
          className="mt-2 h-12 rounded-md border border-black px-2 py-1 text-black focus:border-black-2 focus:outline-none"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          value={value}
        >
          <option value="">Selecione o Produto</option>
          {marcasCuidado.find(marca => marca.marca === selectedMarca)?.produtos.map((produtos, index) => (
            <option key={index} value={produtos}>{produtos}</option>
          ))}
        </select>
      )}
    </div>
  );
};

export default CustomCuidado;
