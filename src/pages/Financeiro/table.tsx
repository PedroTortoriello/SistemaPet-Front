import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { IoMdAdd, IoMdSend } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useForm } from 'react-hook-form';
import CustomInput from '../Table/CustomInput'
import CustomSelect from './CustomSelect';
import CustomPeso from './CustomPeso';
import CustomAlim from './CustomEstoque';
import CustomCuidado from './CustomProducts2';
import CustomBrinquedos from './CustomProducts3';
import CustomDate from './CustomDate';
import Checkbox from './CustomCheck';
import CardDataStats from './CardDataStats';
import { MdOutlineAttachMoney, MdOutlineMoneyOffCsred } from 'react-icons/md';

const Financeiro: React.FC = () => {
    const { register, handleSubmit } = useForm();
    const [showCadastro, setShowCadastro] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const [selectedWeight, setSelectedWeight] = useState('');
    const [showOtherWeightInput, setShowOtherWeightInput] = useState(false);
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(event.target.value);
        setSelectedMarca(event.target.value);
        onChange(event.target.value);
      };
    
      const handleBlur = () => {
        if (!value) {
          setFocused(false);
        }
      };

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

    const fecharDiv = () => {
        setShowCadastro(false);
    };

    const handleTipoChange = (tipo: string) => {
        setSelectedType(tipo);
    };

    const handlePesoChange = (peso: string) => {
        if (peso === 'OUTROS') {
            setShowOtherWeightInput(true);
            setSelectedWeight('');
        } else {
            setShowOtherWeightInput(false);
            setSelectedWeight(peso);
        }
    };

    const handleMarcaChange = (marca: string) => {
        setSelectedMarca(marca);
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Contas a Pagar" />

            <div className="mt-30 w-50 md:flex md:space-x-4">
                <CardDataStats title="Valor a Pagar" total="R$200,00">
                    <MdOutlineMoneyOffCsred color="red" size="22" />
                </CardDataStats>
                <CardDataStats title="Valor Pago" total="R$800,00">
                    <MdOutlineAttachMoney color="green" size="22" />
                </CardDataStats>
            </div>

            <div className="mt-10">
                <div className="w-[900px] p-[15px] border border-black" style={{ border: '1px solid rgba(0, 0, 0, 0.3)', padding: '4px', borderRadius: '4px', direction: 'ltr' }}>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="p-2 border-b border-gray-300 text-black text-center">Dia</th>
                                <th className="p-2 border-b border-gray-300 text-black text-center">Tipo</th>
                                <th className="p-2 border-b border-gray-300 text-black text-center">Quantidade</th>
                                <th className="p-2 border-b border-gray-300 text-black text-center">Valor</th>
                                <th className="p-2 border-b border-gray-300 text-black text-center">Peso</th>
                                <th className="p-2 border-b border-gray-300 text-black text-center">Pago</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            <tr className="border-t ">
                                <td className="px-10 py-2 text-black">16/05/2024</td>
                                <td className="px-10 py-2 text-black">Ração para Cães</td>
                                <td className="px-10 py-2 text-black">10</td>
                                <td className="px-10 py-2 text-black">R$500,00</td>
                                <td className="px-10 py-2 text-black">1 kg</td>
                                <td className="px-10 py-2 text-black"><Checkbox color="green" /></td>
                                
                            </tr>
                            <tr className="border-t">
                                <td className="px-10 py-2 text-black">16/05/2024</td>
                                <td className="px-10 py-2 text-black">Shampoo para Cães</td> 
                                <td className="px-10 py-2 text-black">20</td>
                                <td className="px-10 py-2 text-black">R$300</td>
                                <td className="px-10 py-2 text-black">250 ml</td>
                                <td className="px-10 py-2 text-black">
                                    <Checkbox color ="green"/>
                                </td>
                            </tr>
                            <tr className="border-t">
                                <td className="px-10 py-2 text-black">16/05/2024</td>
                                <td className="px-10 py-2 text-black">Bola para Cães</td>
                                <td className="px-10 py-2 text-black">50</td>
                                <td className="px-10 py-2 text-black">R$200</td>
                                <td className="px-10 py-2 text-black">Grande</td>
                                <td className="px-10 py-2 text-black">
                                    <Checkbox color ="green"/>
                                </td>               
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            

            <div className="absolute bottom-4 left-4">
                <button type="button" onClick={handleNovoClienteClick} className="flex w-40 font-bold items-center justify-center rounded-md bg-[#cdab7e] py-2 pr-4 text-center font-medium text-black transition hover:bg-[#d5b99a]">
                    <span className="font-bold">Adicionar</span>
                    <IoMdAdd className="ml-1" />
                </button>
            </div>

            {showCadastro && (
                <div className="fixed top-0 right-0 h-full overflow-y-auto bg-white w-[400px] shadow-lg ">
                    <div className="border h-20 border-black bg-[#cccccc] relative">
                        <h1 className="text-center w-full text-[20px] font-bold text-zinc-700 mt-7 ">Encomendas</h1>
                        <span className="absolute top-0 right-0 mr-2 mt-2 cursor-pointer text-black font-bold h-30" onClick={fecharDiv}><IoCloseSharp /></span>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto p-8 rounded-lg mt-10">
                        <div className="flex justify-center items-center">
                            <hr className="my-8 border-t-1 border-black w-full" />
                            <div className="mx-4 text-[20px] font-bold text-zinc-700">Registro de Encomenda</div>
                            <hr className="my-8 border-t-1 border-black w-full" />
                        </div>
                        <div className="text-black-border-border-black">
                            <div className="flex flex-wrap mt-5">
                                <div className="w-full pr-4 relative mb-4">
                                    <CustomDate 
                                        label="Data da Encomenda"
                                        register={register('date')}
                                        id="date"
                                        placeholder=""
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap">
                                  <div className="w-full pr-4">
                                    <CustomSelect label="Tipo" options={["Alimentação", "Higiene e Cuidado", "Brinquedos"]} onChange={handleTipoChange} />
                                </div>
                                {selectedType === 'Alimentação' && (
                                    <div className="w-full pr-4">
                                        <CustomAlim label="Marca de Alimentação" onChange={handleMarcaChange} />
                                        <CustomPeso label="Peso" onChange={handlePesoChange} />
                                    </div>
                                )}

                                {showOtherWeightInput && (
                                    <div className="w-full pr-4">
                                        <CustomInput label="Peso" register={register('peso')} id="peso" placeholder="Digite o peso" />
                                    </div>
                                )}
                                {selectedType === 'Higiene e Cuidado' && (
                                    <div className="w-full pr-4">
                                        <CustomCuidado label="Higiene e Cuidados"/>
                                    </div>
                                )}

                                {selectedType === 'Brinquedos' && (
                                    <div className="w-full pr-4">
                                        <CustomBrinquedos label="Brinquedos"/>
                                    </div>
                                )}
                            </div>
    
                            <button type="submit" className="absolute bottom-4 left-4 mt-10 w-45 text-white font-bold py-2 rounded-md flex justify-center items-center bg-[#cdab7e] hover:text-black">
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

export default Financeiro;
