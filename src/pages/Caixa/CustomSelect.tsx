import React, { useState, useEffect } from "react";
import api from "../Authentication/scripts/api";

interface CustomClienteSelectProps {
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


interface Clientes {
  cliente: string;
}

const CustomCliente: React.FC<CustomClienteSelectProps> = ({ label, onChange }) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const [opcoes, setOpcoes] = useState<string[]>([]);

  const fetchClientes = async () => {
    try {
      const response = await api.get('/clientes');
  
      if (response.status === 200) {
        console.log('Dados do Cliente recebidos:', response.data);
        const caixaDataFromAPI: Clientes[] = response.data;
        const nomesClientes = caixaDataFromAPI.map(cliente => cliente.cliente);
        setOpcoes(nomesClientes);
      } else {
        console.error('Erro ao buscar Cliente');
      }
    } catch (error) {
      console.error('Erro ao buscar Cliente:', error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

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
        <option value="Outro">Outro</option>
      </select>
    </div>
  );
};

export default CustomCliente;
