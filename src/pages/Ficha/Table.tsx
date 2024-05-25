import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import api from '../Authentication/scripts/api';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoMdAdd, IoMdSend } from 'react-icons/io';
import CustomInput from './CustomInput';
import { IoCloseSharp } from 'react-icons/io5';
import CustomPet from './CustomPet';

interface Cliente {
  id: number;
  nomeCliente: string;
  CPF: string;
  RG: string;
  Endereço: string;
  telefone: string;
  email: string;
}

interface Compra {
  id: number;
  Dia: string;
  Produto: string;
  Quantidade: string;
  Valor: string;
}

interface Pet {
  id: number;
  nomeCliente: string;
  nomePet: string;
  especie: string;
  raca: string;
  idade: number;
}

const Ficha: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [compras, setCompras] = useState<Compra[]>([]);
  const [showCadastro, setShowCadastro] = useState(false);
  const { register, handleSubmit, setValue, reset } = useForm<Pet>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clienteResponse, comprasResponse, petsResponse] = await Promise.all([
          api.get(`/clientes/${id}`),
          api.get(`/clientes/${id}/compras`),
          api.get(`/clientes/${id}/pets`)
        ]);

        if (clienteResponse.status === 200 && comprasResponse.status === 200 && petsResponse.status === 200) {
          setCliente(clienteResponse.data);
          setCompras(comprasResponse.data);
          setPets(petsResponse.data);
          setValue('nomeCliente', clienteResponse.data.nomeCliente); // Setar o nome do cliente
        } else {
          console.error('Erro ao buscar dados do cliente');
        }
      } catch (error) {
        console.error('Erro ao buscar dados do cliente:', error);
      }
    };

    fetchData();
  }, [id, setValue]);

  const handleChange = (name: keyof Pet, value: string) => {
    setValue(name, value);
  };

  const onSubmit: SubmitHandler<Pet> = async (data) => {
    try {
      const postResponse = await api.post(`/clientes/${data.nomeCliente}/pets`, data);
  
      if (postResponse.status === 200) {
        console.log('Pet adicionado com sucesso');
        setShowCadastro(false);
        reset(); // Resetar o formulário após o envio
      } else {
        console.error('Erro ao adicionar pet');
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  function formatarCPF(cpf: string): string {
    // Remover caracteres indesejados
    cpf = cpf.replace(/\D/g, '');
  
    // Adicionar os pontos e o traço no CPF
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
  
  function formatarRG(rg: string): string {
    // Ajustar o formato do RG conforme necessário
    // Por exemplo, para um RG no formato 00.000.000-0, você poderia fazer algo como:
    return rg.replace(/^(\d{2})(\d{3})(\d{3})(\d{1})$/, '$1.$2.$3-$4');
  }

  function formatarTelefone(telefone: string): string {
    // Remover caracteres indesejados
    telefone = telefone.replace(/\D/g, '');
  
    // Adicionar parênteses e o hífen no telefone
    return telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  }

  const fecharDiv = () => {
    setShowCadastro(false);
  };

  const handleNovoPet = () => {
    setShowCadastro(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Perfil do Cliente" />


      <div className="scrollable-content overflow-y-auto">
        <div className="mx-auto mt-10 p-6 rounded shadow-md bg-white">
          <h1 className="text-3xl font-semibold mb-4 text-black">Informações do Cliente</h1>
          <div className="grid grid-cols-2 gap-x-8">
            <div>
              <p className="font-bold text-black">Nome Completo:</p>
              <p >{cliente?.nomeCliente}</p>
            </div>
            <div>
              <p className="font-bold text-black">CPF:</p>
              <p>{formatarCPF(cliente?.CPF || '')}</p>
            </div>
            <div>
              <p className="font-bold text-black">RG:</p>
              <p>{formatarRG(cliente?.RG || '')}</p>
            </div>
            <div>
              <p className="font-bold text-black">Endereço:</p>
              <p>{cliente?.Endereço}</p>
              </div>
              <div>
                <p className="font-bold text-black">Telefone:</p>
                <p>{formatarTelefone(cliente?.telefone || '')}</p>
              </div>
              <div>
                <p className="font-bold text-black">Email:</p>
                <p>{cliente?.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-6 p-6 rounded shadow-md bg-white">
          <h1 className="text-3xl font-semibold mb-4 text-black">Compras</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className='bg-[#cdab7e]'>
                <tr>
                  <th className="py-2 px-4 border-b text-black">Dia</th>
                  <th className="py-2 px-4 border-b text-black">Produto</th>
                  <th className="py-2 px-4 border-b text-black">Quantidade</th>
                  <th className="py-2 px-4 border-b text-black">Valor</th>
                </tr>
              </thead>
              <tbody>
                {compras.map((compra) => (
                  <tr key={compra.id}>
                    <td className="py-2 px-4 border-b text-black text-center">{formatDate(compra.Dia)}</td>
                    <td className="py-2 px-4 border-b text-black text-center">{compra.Produto}</td>
                    <td className="py-2 px-4 border-b text-black text-center">{compra.Quantidade}</td>
                    <td className="py-2 px-4 border-b text-black text-center">R$ {compra.Valor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>        
        </div>

        <div className="mx-auto mt-6 p-6 rounded shadow-md bg-white">
          <h1 className="text-3xl font-semibold mb-4 text-black">Pets</h1>
          <div className="grid grid-cols-3 gap-4">
            {pets.map((pet) => (
              <div key={pet.id} className="p-4 border rounded-md w-75">
                <p className="font-bold text-black">Nome: </p>
                <p>{pet.nomePet}</p>
                <p className="font-bold text-black">Raça: </p>
                <p>{pet.raca}</p>
                <p className="font-bold text-black">Idade: </p>
                <p>{pet.idade}</p>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleNovoPet}
            className="mt-5 flex w-40 font-bold items-center justify-center rounded-md bg-[#cdab7e] py-2 pr-4 text-center font-medium text-black transition hover:bg-[#d5b99a]"
          >
            <span className="font-bold">Novo Pet</span>
            <IoMdAdd className="ml-1" />
          </button>
        </div>

        {showCadastro && (
          <div className="fixed top-0 right-0 h-full overflow-y-auto bg-white w-[400px] shadow-lg">
            <div className="border h-20 border-black bg-[#cccccc] relative">
              <h1 className="text-center w-full text-[20px] font-bold text-zinc-700 mt-7">Adicionar Novo Pet</h1>
              <span className="absolute top-0 right-0 mr-2 mt-2 cursor-pointer text-black font-bold h-30" onClick={fecharDiv}>
                <IoCloseSharp />
              </span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto p-8 rounded-lg mt-10">
              <div className="flex justify-center items-center">
                <hr className="my-8 border-t-1 border-black w-full" />
                <div className="mx-4 text-[20px] font-bold text-zinc-700">Informações</div>
                <hr className="my-8 border-t-1 border-black w-full" />
              </div>
              <div className="text-black-border-border-black">
                <div className="flex flex-wrap mt-5">
                  <div className="flex flex-wrap">
                    <div className="w-full pr-4">
                      <CustomPet
                        label="Nome do Pet"
                        {...register('nomePet')}
                        id="Nome do Pet"
                        placeholder=""
                        onChange={(value) => handleChange('nomePet', value)}
                      />
                      <CustomPet
                        label="Raça do Pet"
                        {...register('raca')}
                        id="Raça do Pet"
                        placeholder=""
                        onChange={(value) => handleChange('raca', value)}
                      />
                      <CustomPet
                        label="Idade"
                        {...register('idade')}
                        id="Idade"
                        placeholder=""
                        onChange={(value) => handleChange('idade', value)}
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="absolute bottom-4 left-4 mt-10 w-45 bg-black text-white font-bold py-2 rounded-md flex justify-center items-center hover:bg-[#cdab7e] hover:text-black"
                >
                  Registrar
                  <IoMdSend className="ml-2" />
                </button>
              </div>
            </form>
          </div>
        )}

</DefaultLayout>
);
};

export default Ficha;


