import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import api from '../Authentication/scripts/api';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoMdAdd, IoMdSend } from 'react-icons/io';
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
  nomeCliente: string;
  id: number;
  nomePet: string;
  raca: string;
  idade: number;
}

const Ficha: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [compras, setCompras] = useState<Compra[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [showCadastro, setShowCadastro] = useState(false);
  const { register, handleSubmit, setValue, reset } = useForm<Pet>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clienteResponse, comprasResponse, petsResponse] = await Promise.all([
          api.get(`/clientes/${id}`),
          api.get(`/clientes/${id}/compras`),
          api.get(`/clientes/${id}/pets`),
          
        ]);

        if (clienteResponse.status === 200) {
          setCliente(clienteResponse.data);
          setValue('nomePet', ''); // Resetar o campo nomePet do formulário
        } else {
          console.error('Erro ao buscar dados do cliente');
        }

        if (comprasResponse.status === 200) {
          setCompras(comprasResponse.data);
        } else {
          console.error('Erro ao buscar compras do cliente');
        }

        if (petsResponse.status === 200) {
          setPets(petsResponse.data);
        } else {
          console.error('Erro ao buscar pets do cliente');
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
      console.log('Dados do formulário:', data);
  
      // Adicione o ID do cliente aos dados do pet
      const petData = { ...data, clienteId: cliente?.id };
  
      const postResponse = await api.post(`/clientes/${id}/pets`, petData);
  
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
  

  // Funções de formatação omitidas para brevidade

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

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Perfil do Cliente" />

      <div className="scrollable-content overflow-y-auto">
        <div className="mx-auto mt-10 p-6 rounded shadow-md bg-white">
          <h1 className="text-3xl font-semibold mb-4 text-black">Informações do Cliente</h1>
          <div className="grid grid-cols-2 gap-x-8">
            <div>
              <p className="font-bold text-black">Nome Completo:</p>
              <p>{cliente?.nomeCliente}</p>
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
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className='bg-[#cdab7e]'>
                <tr>
                  <th className="py-2 px-4 border-b text-black">Nome</th>
                  <th className="py-2 px-4 border-b text-black">Raça</th>
                  <th className="py-2 px-4 border-b text-black">Idade</th>
                </tr>
              </thead>
              <tbody>
                {pets.map((pet) => (
                  <tr key={pet.id}>
                    <td className="py-2 px-4 border-b text-black text-center">{pet.nomePet}</td>
                    <td className="py-2 px-4 border-b text-black text-center">{pet.raca}</td>
                    <td className="py-2 px-4 border-b text-black text-center">{pet.idade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <button
              onClick={handleNovoPet}
              className="bg-[#cdab7e] text-white py-2 px-4 rounded flex items-center"
            >
              <IoMdAdd className="mr-2" /> Novo Pet
            </button>
          </div>

          {showCadastro && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded shadow-md">
                <button
                  onClick={fecharDiv}
                  className="text-black float-right"
                >
                  <IoCloseSharp />
                </button>
                <h1 className="text-2xl font-semibold mb-4 text-black">Cadastrar Pet</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <label className="block text-black mb-1">Nome do Cliente</label>
                      <input
                        {...register('nomeCliente', { required: true })}
                        defaultValue={cliente?.nomeCliente || ''}
                        className="w-full p-2 border border-gray-300 rounded"
                        readOnly // Para impedir que o usuário edite este campo
                      />
                  </div>
                  <div className="mb-4">
                    <label className="block text-black mb-1">Nome do Pet</label>
                    <input
                      {...register('nomePet', { required: true })}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-black mb-1">Raça</label>
                    <input
                      {...register('raca', { required: true })}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-black mb-1">Idade</label>
                    <input
                      {...register('idade', { required: true })}
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#cdab7e] text-white py-2 px-4 rounded flex items-center"
                  >
                    <IoMdSend className="mr-2" /> Enviar
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      
    </DefaultLayout>
  );
};

export default Ficha;
