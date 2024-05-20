import { useState } from "react";

interface MarcaBrinquedo {
  marca: string;
  produtos: string[];
}

interface CustomBrinquedosSelectProps {
  label: string;
  onChange: (value: string) => void;
}

const CustomBrinquedos: React.FC<CustomBrinquedosSelectProps> = ({ label, onChange }) => {
  const [focused, setFocused] = useState(false);
  const [selectedMarca, setSelectedMarca] = useState<MarcaBrinquedo | null>(null);
  const [selectedProduto, setSelectedProduto] = useState('');

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const handleChangeMarca = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const marcaSelecionada = marcasBrinquedos.find(marca => marca.marca === event.target.value);
    setSelectedMarca(marcaSelecionada || null);
    setSelectedProduto('');
    onChange('');
  };

  const handleChangeProduto = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProduto(event.target.value);
    onChange(event.target.value);
  };

  const marcasBrinquedos: MarcaBrinquedo[] = [
    {
      marca: "Jambo",
      produtos: ["Bola de Futebol Jambo Pet", "Bola de Tênis com Squeeze"]
    },
    {
      marca: "Pet Games",
      produtos: ["Pet Ball", "Pet Bone"]
    },
    {
      marca: "Chalesco",
      produtos: ["Brinquedo Corda com Bola", "Bolinha Pula-Pula"]
    },
    {
      marca: "Ferplast Brasil",
      produtos: ["Brinquedo de Nylon Ferplast", "Bola de Pelúcia com Apito"]
    },
    {
      marca: "Petlove",
      produtos: ["Bola para Mordida Petlove", "Frango de Pelúcia com Apito"]
    },
    {
      marca: "Petz",
      produtos: ["Petz Bone", "Petz Ball"]
    },
    {
      marca: "Zee.Dog",
      produtos: ["Zee.Dog Rope", "Zee.Dog Squeaky Toy"]
    },
    {
      marca: "Empório Pet",
      produtos: ["Bolinha de Vinil para Cães", "Osso de Corda para Mordida"]
    }
  ];

  return (
    <div className={`relative mb-4 flex flex-col ${focused ? 'mt-2' : 'mt-4'}`}>
      <label
        htmlFor={label}
        className={`absolute transition-all duration-300 ${focused || selectedMarca ? '-top-3 text-black text-xs font-bold' : 'top-1/2 -translate-y-1/2 text-sm'} left-2 bg-white px-1`}
      >
        {label}
      </label>
      <select
        id={label}
        className="h-12 rounded-md border border-black px-2 py-1 text-black focus:border-black-2 focus:outline-none"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChangeMarca}
        value={selectedMarca ? selectedMarca.marca : ''}
      >
        <option value="">Selecione a Marca</option>
        {marcasBrinquedos.map((marca, index) => (
          <option key={index} value={marca.marca}>{marca.marca}</option>
        ))}
      </select>
      {selectedMarca && (
        <select
          id="produtos"
          className="mt-4 h-12 rounded-md border border-black px-2 py-1 text-black focus:border-black-2 focus:outline-none"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChangeProduto}
          value={selectedProduto}
        >
          <option value="">Selecione o Produto</option>
          {selectedMarca.produtos.map((produto, index) => (
            <option key={index} value={produto}>{produto}</option>
          ))}
        </select>
      )}
    </div>
  );
};

export default CustomBrinquedos;
