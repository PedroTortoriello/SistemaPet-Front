import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { IoMdAdd, IoMdArrowBack, IoMdArrowForward, IoMdSend } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useForm } from 'react-hook-form';
import CustomSelect from './CustomSelect';
import CustomPeso from './CustomPeso';
import CustomAlim from './CustomEstoque';
import CustomCuidado from './CustomProducts2';
import CustomBrinquedos from './CustomProducts3';
import CustomDate from './CustomDate';
import Calendar from './Calendar';
import api from '../Authentication/scripts/api';
import CustomInput from './CustomInput';

interface Encomenda {
    Dia: string;
    Valor: string;
    Produto: string;
    Quantidade: string;
    Peso: string;
}

const Encomendas: React.FC = () => {
    const { register, handleSubmit } = useForm();
    const [showCadastro, setShowCadastro] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const [, setSelectedWeight] = useState('');
    const [, setShowOtherWeightInput] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false); 
    const [encomendaData, setEncomendaData] = useState<Encomenda[]>([]);
    const [selectedMonth, setSelectedMonth] = useState<Date | null>(null);
    const [, setSelectedMarca] = useState<any[]>([]);
    const [higiene, setHigiene] = useState<any[]>([]);
    const [brinquedos, setBrinquedos] = useState<any[]>([]);
    
    const handleNovoClienteClick = () => {
        setShowCadastro(true);
    };

    const handleMarcaChange = (marca: string) => {
        setSelectedMarca([...marca]);;
    };

    const handleHigieneChange = (value: string) => {
        // Faça o que for necessário com o valor recebido, por exemplo:
        console.log("Novo valor de higiene:", value);
        // Ou atualize algum estado
        setHigiene([...higiene, value]);

    };

      const handleBrinquedosChange = (value: string) => {
        // Faça o que for necessário com o valor recebido, por exemplo:
        console.log("Novo valor de Brinquedos:", value);
        // Ou atualize algum estado
        setBrinquedos([...brinquedos, value]);
    };

    const onSubmit = async () => {
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
    const handleValorChange = (valor: string) => {
        console.log("Valor changed:", valor);
      };

    const toggleCalendar = () => setShowCalendar(!showCalendar);

    const fetchEncomenda = async () => {
        try {
            const response = await api.get('/encomendas');
    
            if (response.status === 200) {
                console.log('Dados do Encomenda recebidos:', response.data);
                setEncomendaData(response.data);
            } else {
                console.error('Erro ao buscar Encomenda');
            }
        } catch (error) {
            console.error('Erro ao buscar Encomenda:', error);
        }
    };
      
    useEffect(() => {
        fetchEncomenda();
    }, []);
      
    const renderEncomenda = () => {
        if (encomendaData.length === 0) {
            return (
                <tr>
                    <td className="p-2 border-t border-b border-gray-300 text-black text-center" colSpan={7}>
                        Nenhum dado encontrado.
                    </td>
                </tr>
            );
        }

        return encomendaData.map((item, index) => {
            const formattedDate = new Date(item.Dia).toLocaleDateString('pt-BR');
      
            return (
                <tr key={index}>
                    <td className="p-2 border-t border-b border-gray-300 text-black text-center">{formattedDate}</td>
                    <td className="p-2 border-t border-b border-gray-300 text-black text-center">{item.Produto}</td>
                    <td className="p-2 border-t border-b border-gray-300 text-black text-center">{item.Quantidade}</td>
                    <td className="p-2 border-t border-b border-gray-300 text-black text-center">{item.Peso}</td>
                    <td className="p-2 border-t border-b border-gray-300 text-black text-center">R$ {item.Valor}</td>
                </tr>
            );
        });
    };
           
    const onSelectMonth = (date: Date | null) => {
        setSelectedMonth(date);
        toggleCalendar();
    };

    const handlePrevMonth = () => {
        console.log("Avançar para o mês anterior");
        const prevDate = new Date(currentDate);
        prevDate.setMonth(prevDate.getMonth() - 1);
        setCurrentDate(prevDate);
    };
    
    const handleNextMonth = () => {
        console.log("Avançar para o próximo mês");
        const nextDate = new Date(currentDate);
        nextDate.setMonth(nextDate.getMonth() + 1);
        setCurrentDate(nextDate);
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Encomendas" />
            <div className="mt-20 flex justify-center items-center">
                <div className="flex items-center">
                    <button className="mr-4 text-black" onClick={handlePrevMonth}>
                        <IoMdArrowBack size={24} />
                    </button>
                    <div className="relative">
                        <h2 
                            className="text-xl font-bold text-black border bg-[#cdab7e] cursor-pointer" 
                            onClick={toggleCalendar}
                        >
                            {selectedMonth ? 
                            `${selectedMonth.toLocaleString('default', { month: 'long' }).charAt(0).toUpperCase() + selectedMonth.toLocaleString('default', { month: 'long' }).slice(1)} ${selectedMonth.getFullYear()}` 
                            : 
                            `${currentDate.toLocaleString('default', { month: 'long' }).charAt(0).toUpperCase() + currentDate.toLocaleString('default', { month: 'long' }).slice(1)} ${currentDate.getFullYear()}`
                            }
                        </h2>

                        <div className="absolute left-[-50px] mt-0">
                            <Calendar
                                showCalendar={showCalendar}
                                toggleCalendar={toggleCalendar}
                                onSelectMonth={onSelectMonth}
                                onSelectDay={() => {}}
                                currentDate={currentDate}
                            />
                        </div>
                    </div>
                    <button className="ml-4 text-black" onClick={handleNextMonth}>
                        <IoMdArrowForward size={24} /> 
                    </button>
                </div>
            </div>
            <div className="mt-15 border rounded-b-md">
                <div className="overflow-x-auto">
                    <table className="w-full text-black">
                        <thead className='bg-[#cdab7e]'>
                            <tr>
                                <th className="px-4 py-2">Dia</th>
                                <th className="px-4 py-2">Produto</th>
                                <th className="px-4 py-2">Quantidade</th>
                                <th className="px-4 py-2">Peso</th>
                                <th className="px-4 py-2">Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderEncomenda()}
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
                                        {...register('date')}
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
                                        <CustomPeso label="Peso" onChange={handlePesoChange}/>
                                        <CustomInput label="Valor" onChange={handleValorChange} id={''} placeholder={''} />
                                    </div>
                                )}

                                {selectedType === 'Higiene e Cuidado' && (
                                    <div className="w-full pr-4">
                                        <CustomCuidado label="Higiene e Cuidados" {...register('higiene')} onChange={handleHigieneChange}/>
                                    </div>
                                )}

                                {selectedType === 'Brinquedos' && (
                                    <div className="w-full pr-4">
                                        <CustomBrinquedos label="Brinquedos" {...register('brinquedos')} onChange={handleBrinquedosChange}/>
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

export default Encomendas;


