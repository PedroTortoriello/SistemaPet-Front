import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { IoMdAdd, IoMdSend } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useForm } from 'react-hook-form';
import CustomInput from './CustomInput';

interface TableItem {
  _id: number;
  RAT: string;
  codigo: string;
  nomePessoa: string;
  tipoPessoa: string;
  codigoCliente: string;
  nomeCliente: string;
  Data: string;
  desc: string;
  HorasT: number;
  ValorH: number;
  ValorAdc: number;
}

export default function TicketTable() {
  const { register, handleSubmit } = useForm();
  const [showCadastro, setShowCadastro] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [tableData] = useState<TableItem[]>([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleNovoClienteClick = () => {
    setShowCadastro(true);
  };

  const onSubmit = async (data: any) => {
    try {
      setShowCadastro(false);
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  const handleFocus = (labelId: string) => {
    const label = document.getElementById(labelId);
    label?.classList.add('-top-3', 'text-xs', 'font-bold');
  };

  const handleBlur = (labelId: string, value: string) => {
    const label = document.getElementById(labelId);
    if (!value) {
      label?.classList.remove('-top-3', 'text-xs', 'font-bold');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, labelId: string) => {
    const label = document.getElementById(labelId);
    if (event.target) {
      label?.classList.add('-top-3', 'text-xs', 'font-bold');
      event.target.value ? label?.classList.add('text-black') : label?.classList.remove('text-black');
    }
  };

  const handleCEPChange = (event: { target: { value: any; }; }) => {
    let cepInput = event.target.value;
    cepInput = cepInput.replace(/\D/g, '');
    cepInput = cepInput.substring(0, 8);
    if (cepInput.length > 5) {
      cepInput = cepInput.replace(/^(\d{5})(\d)/, '$1-$2');
    }
    event.target.value = cepInput;
  };

  const formatCPF = (cpf: string) => {
    cpf = cpf.replace(/\D/g, '');
    cpf = cpf.substring(0, 11);
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return cpf;
  };
  
  const formatTelefone = (telefone: string) => {
    telefone = telefone.replace(/\D/g, '');
    telefone = telefone.substring(0, 15);
    telefone = '+' + telefone;
    if (telefone.length > 3) {
      telefone = telefone.replace(/^(\+\d{2})(\d{2})(\d{5})(\d{4})/, '$1 $2 $3-$4');
    }
    return telefone;
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const fecharDiv = () => {
    setShowCadastro(false);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Clientes" />

      <div className="mt-20 relative w-full overflow-x-auto overscroll-y-auto border-1 shadow-md sm:rounded-xl" style={{ maxHeight: 'calc(-100px + 100vh)' }}>
        <table className="w-full py-5 text-xs">
          <thead className="sticky top-0 bg-[#cdab7e] text-xs">
            <tr>
              <th className="py-2 px-2 whitespace-nowrap ">
                <div className="flex flex-row ">
                  <span className="text-sm font-semibold text-black ml-20">Nome Cliente</span>
                </div>
              </th>
              <th className="py-4 px-2 whitespace-nowrap ">
                <div className="flex flex-row ">
                  <span className="text-sm font-semibold text-black mr-40">Celular</span>
                </div>
              </th>
              <th className="py-4 px-2 whitespace-nowrap">
                <div className="flex flex-row ">
                  <span className="text-sm font-semibold text-black mr-60">PET</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => {
              return (
                <tr key={index} className="bg-zinc-50 text-zinc-800 hover:text-blue-500 text-sm font-light hover:bg-blue-100 border-b border-sky-700">
                  <td className="cursor-pointer whitespace-nowrap text-center">
                    <div className="py-2">
                      <span className="px-1 py-1">{item.RAT}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
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
                    label="Nome Completo"
                    register={register('nomeCliente')}
                    id="nomeCliente" 
                    placeholder=""
                    onFocus={() => handleFocus('labelNomeCliente')}
                    onBlur={(e) => handleBlur('labelNomeCliente', e.target.value)}
                    onChange={(e) => handleChange(e, 'labelNomeCliente')}
                  />
                  <CustomInput
                    label="Nome do Pet"
                    register={register('nomePet')}
                    id="nomePet" 
                    placeholder=""
                    onFocus={() => handleFocus('labelnomePet')}
                    onBlur={(e) => handleBlur('labelnomePet', e.target.value)}
                    onChange={(e) => handleChange(e, 'labelnomePet')}
                  />
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 pr-4">
                  <CustomInput
                    label="CPF"
                    register={register('CPF', { onChange: (e) => e.target.value = formatCPF(e.target.value) })}
                    id="CPF"
                    placeholder="999.999.999-99"
                    onFocus={() => handleFocus('labelCpf')}
                    onBlur={(e) => handleBlur('labelCpf', e.target.value)}
                    onChange={(e) => handleChange(e, 'labelCpf')}
                  />
                </div>
                <div className="w-full md:w-1/2 pr-4">
                  <CustomInput
                    label="RG"
                    register={register('RG', { onChange: (e) => e.target.value = formatCPF(e.target.value) })}
                    id="RG"
                    placeholder="99.999.999-99"
                    onFocus={() => handleFocus('labelRg')}
                    onBlur={(e) => handleBlur('labelRg', e.target.value)}
                    onChange={(e) => handleChange(e, 'labelRg')}
                  />
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 pr-4">
                  <CustomInput
                    label="CEP"
                    register={register('cep')}
                    id="cep"
                    placeholder="99999-999"
                    onChange={handleCEPChange}
                    onFocus={() => handleFocus('labelCep')}
                    onBlur={(e) => handleBlur('labelCep', e.target.value)}
                    onChange={(e) => handleChange(e, 'labelCep')}
                  />
                </div>
                <div className="w-full  pr-4">
                  <CustomInput
                    label="Endereço"
                    register={register('Endereço')}
                    id="Endereço"
                    placeholder=""
                    onFocus={() => handleFocus('labelEndereco')}
                    onBlur={(e) => handleBlur('labelEndereco', e.target.value)}
                    onChange={(e) => handleChange(e, 'labelEndereco')}
                  />
                </div>
                <div className="w-full md:w-1/2 pr-4">
                  <CustomInput
                    label="Número"
                    register={register('Numero')}
                    id="Número"
                    placeholder=""
                    onFocus={() => handleFocus('labelNumero')}
                    onBlur={(e) => handleBlur('labelNumero', e.target.value)}
                    onChange={(e) => handleChange(e, 'labelNumero')}
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
                <div className="w-[200] pr-4">
                  <CustomInput
                    label="E-mail"
                    register={register('email', { onChange: (e) => e.target.value = formatTelefone(e.target.value) })}
                    id="telefone"
                    placeholder="Insira o e-mail"
                    onFocus={() => handleFocus('labelTelefone')}
                    onBlur={(e) => handleBlur('labelTelefone', e.target.value)}
                    onChange={(e) => handleChange(e, 'labelTelefone')}
                  />
                </div>
                <div className="w-[200] pr-4">
                  <CustomInput
                    label="Telefone"
                    register={register('telefone', { onChange: (e) => e.target.value = formatTelefone(e.target.value) })}
                    id="telefone"
                    placeholder="+99 (99) 99999-9999"
                    onFocus={() => handleFocus('labelTelefone')}
                    onBlur={(e) => handleBlur('labelTelefone', e.target.value)}
                    onChange={(e) => handleChange(e, 'labelTelefone')}
                  />
                </div>
              </div>
              <div className="mt-5">
                <h4 className='font-bold text-l text-black'>Esse número é WhatsApp?</h4>
                <button
                  type="button"
                  className={`mt-3 w-[130px] h-10 border text-black border-black rounded-l-md ${selectedOption === 'sim' ? 'selected hover:bg-[#cdab7e]' : 'hover:bg-[#cdab7e]'}`}
                  onClick={() => handleOptionChange('sim')}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={`w-[130px] h-10 border text-black border-black rounded-r-md ${selectedOption === 'nao' ? 'selected hover:bg-[#cdab7e]' : 'hover:bg-[#cdab7e]'}`}
                  onClick={() => handleOptionChange('nao')}
                >
                  Não
                </button>


              </div>
            </div>

            <div className="absolute bottom-4 left-4">
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


