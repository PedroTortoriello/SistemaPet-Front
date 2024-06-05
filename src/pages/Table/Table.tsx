import { ReactNode, useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { IoMdAdd, IoMdSend } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useForm } from 'react-hook-form';
import CustomInput from './CustomInput';
import api from '../Authentication/scripts/api';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

interface Cliente {
  cliente: ReactNode;
  id: number;
  nomeCliente: string;
  CPF: string;
  RG: string;
  cep: string;
  Endereço: string;
  Numero: string;
  email: string;
  telefone: string;
}

export default function TicketTable() {
  const { register, handleSubmit, setValue } = useForm<Cliente>();
  const [showCadastro, setShowCadastro] = useState(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const navigate = useNavigate(); // Criar uma instância do useNavigate

  const handleNovoClienteClick = () => {
    setShowCadastro(true);
  };

  const handleChange = (name: keyof Cliente, value: string) => {
    setValue(name, value);
  };

  const fetchClientes = async () => {
    try {
      const response = await api.get('/clientes');
      console.log('Dados formatados recebidos da API:', response.data);
      if (response.status === 200) {
        setClientes(response.data);
      } else {
        console.error('Erro ao buscar clientes');
      }
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const fecharDiv = () => {
    setShowCadastro(false);
  };

  const onSubmit = async (data: Cliente) => {
    try {
      const response = await api.post('/clientes', data);
      if (response.status === 200) {
        console.log('Cliente cadastrado com sucesso!');
        fetchClientes();
        setShowCadastro(false);
      } else {
        console.error('Erro ao cadastrar cliente');
      }
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
    }
  };

  const handleRowClick = (nomeCliente: string) => {
    navigate(`/Ficha/Table/${encodeURIComponent(nomeCliente)}`);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Clientes" />

      <div className="mt-20 relative w-full overflow-x-auto overscroll-y-auto border-1 shadow-md sm:rounded-xl" style={{ maxHeight: 'calc(-100px + 100vh)' }}>
        <table className="w-full py-5 text-xs">
          <thead className="sticky top-0 bg-[#cdab7e] text-xs">
            <tr>
              <th className="py-3 px-2 whitespace-nowrap">
                <div className="flex flex-row justify-center">
                  <span className="text-sm font-semibold text-black">Nome Cliente</span>
                </div>
              </th>
              <th className="py-3 px-2 whitespace-nowrap">
                <div className="flex flex-row justify-center">
                  <span className="text-sm font-semibold text-black">E-mail</span>
                </div>
              </th>
              <th className="py-3 px-2 whitespace-nowrap">
                <div className="flex flex-row justify-center">
                  <span className="text-sm font-semibold text-black">Celular</span>
                </div>
              </th>
              <th className="py-3 px-2 whitespace-nowrap">
                <div className="flex flex-row justify-center">
                  <span className="text-sm font-semibold text-black"></span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td className="py-3 px-2 text-m whitespace-nowrap text-black text-center">{cliente.nomeCliente}</td>
                <td className="py-3 px-2 text-m whitespace-nowrap text-black text-center">{cliente.email}</td>
                <td className="py-3 px-2 text-m whitespace-nowrap text-black text-center">{cliente.telefone}</td>
                <td className="py-3 px-2 text-m whitespace-nowrap text-black font-bold" onClick={() => handleRowClick(cliente.id.toString())} style={{cursor: 'pointer', userSelect: 'none'}}>Ver Perfil</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="absolute bottom-4 left-4">
        <button type="button" onClick={handleNovoClienteClick} className="flex w-45 font-bold items-center justify-center rounded-md bg-[#cdab7e] py-2 pr-4 text-center font-medium text-black transition hover:bg-[#d5b99a]">
          <span className="font-bold">Novo Cliente</span>
          <IoMdAdd className="ml-1" />
        </button>
      </div>
      {showCadastro && (
        <div  className="fixed top-0 right-0 h-full overflow-y-auto bg-white w-[400px] shadow-lg ">
          <div className="border h-20 border-black bg-[#cccccc] relative">
            <h1 className="text-center w-full text-[20px] font-bold text-zinc-700 mt-7 ">Cadastro de Cliente</h1>
            <span className="absolute top-0 right-0 mr-2 mt-2 cursor-pointer text-black font-bold h-30" onClick={fecharDiv}><IoCloseSharp /></span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto p-8 rounded-lg mt-10">
            <div className="flex justify-center items-center">
              <hr className="my-8 border-t-1 border-black w-full" />
              <div className="mx-4 text-[20px] font-bold text-zinc-700">Informações Pessoais</div>
              <hr className="my-8 border-t-1 border-black w-full" />
            </div>
            <div className="text-black-border-border-black">
              <div className="flex flex-wrap mt-5">
                <div className="w-full pr-4">
                  <CustomInput
                    label="Cliente"
                    {...register('nomeCliente')}
                    id="cliente"
                    placeholder=""
                    onChange={(value) => handleChange('nomeCliente', value)}
                  />
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 pr-4">
                  <CustomInput
                    label="CPF"
                    {...register('CPF')}
                    id="CPF"
                    placeholder=""
                    onChange={(value) => handleChange('CPF', value)}
                  />
                </div>
                <div className="w-full md:w-1/2 pr-4">
                  <CustomInput
                    label="RG"
                    {...register('RG')}
                    id="RG"
                    placeholder=""
                    onChange={(value) => handleChange('RG', value)}
                  />
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 pr-4">
                  <CustomInput
                    label="CEP"
                    {...register('cep')}
                    id="CEP"
                    placeholder=""
                    onChange={(value) => handleChange('cep', value)}
                  />
                </div>
                <div className="w-full pr-4">
                  <CustomInput
                    label="Endereço"
                    {...register('Endereço')}
                    id="endereço"
                    placeholder=""
                    onChange={(value) => handleChange('Endereço', value)}
                  />
                </div>
                <div className="w-full md:w-1/2 pr-4">
                  <CustomInput
                    label="Numero"
                    {...register('Numero')}
                    id="Numero"
                    placeholder=""
                    onChange={(value) => handleChange('Numero', value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <hr className="my-8 border-t-1 border-black w-full" />
              <div className="mx-4 text-[20px] font-bold text-zinc-700">Contato</div>
              <hr className="my-8 border-t-1 border-black w-full" />
            </div>

            <div className="flex flex-wrap">
              <div className="flex flex-wrap">
                <div className="w-full pr-4">
                  <CustomInput
                    label="Email"
                    {...register('email')}
                    id="Email"
                    placeholder=""
                    onChange={(value) => handleChange('email', value)}
                  />
                </div>
                <div className="w-full pr-4">
                  <CustomInput
                    label="Telefone"
                    {...register('telefone')}
                    id="Telefone"
                    placeholder=""
                    onChange={(value) => handleChange('telefone', value)}
                  />
                </div>
              </div>
            </div>

            <div className=" bottom-4 left-4">
              <button type="submit" className="flex w-45 font-bold items-center justify-center rounded-md bg-[#cdab7e] py-2 pr-4 text-center font-medium text-black transition hover:bg-[#d5b99a]">
                <span className="font-bold">Cadastrar</span>
                <IoMdSend className="ml-3" />
              </button>
            </div>
          </form>
        </div>
      )}

    </DefaultLayout>
  );
}
