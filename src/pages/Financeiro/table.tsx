import React, { useEffect, useState } from 'react';
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
import CardDataStats from './CardDataStats';
import { MdOutlineAttachMoney, MdOutlineMoneyOffCsred } from 'react-icons/md';
import api from '../Authentication/scripts/api';
import Calendar from '../Estoque/Calendar';
import CustomCheck from './CustomCheck';

interface Contas {
    Dia: string;
    Tipo: string;
    Valor: string;
    Produto: string;
    Quantidade: string;
    Peso: string;
}


const Financeiro: React.FC = () => {
    const { register, handleSubmit } = useForm();
    const [showCadastro, setShowCadastro] = useState(false);
    const [selectedType,] = useState('');
    const [, setSelectedWeight] = useState('');    const [showOtherWeightInput, setShowOtherWeightInput] = useState(false);
    const [ContasData, setContasData] = useState<any[]>([]);
    const [selectedMonth, setSelectedMonth] = useState<Date | null>(null);
    const [currentDate, ] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false); 
    const toggleCalendar = () => setShowCalendar(!showCalendar);
    const [higiene, setHigiene] = useState<any[]>([]);
    const [brinquedos, setBrinquedos] = useState<any[]>([]);


    const handleChange = (_p0: string, _value: string) => {

    }

    const handleNovoClienteClick = () => {
        setShowCadastro(true);
    };

    const onSubmit = async (_data: any) => {
        try {
            setShowCadastro(false);
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    const fecharDiv = () => {
        setShowCadastro(false);
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

    const fetchContas = async () => {
        try {
          const date = selectedMonth || currentDate;
          // Para buscar dados do mês, envie apenas o mês e ano
          const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
          console.log('Data para buscar Contas:', dateString);
          
          const response = await api.get('/contas', { params: { data: dateString } });
      
          if (response.status === 200) {
            console.log('Dados do Contas recebidos:', response.data);
            const ContasDataFromAPI: Contas[] = response.data;
            setContasData(ContasDataFromAPI);
          } else {
            console.error('Erro ao buscar Contas');
          }
        } catch (error) {
          console.error('Erro ao buscar Contas:', error);
        }
    };
      
      // Call fetchCaixa when selectedMonth or currentDate changes
    useEffect(() => {
        fetchContas();
    }, [currentDate, selectedMonth]);

    const renderContas = () => {
        const contasDoMes = ContasData.filter((item) => {
          const itemData = new Date(item.Dia);
          const selectedDate = selectedMonth || currentDate;
          const itemYear = itemData.getFullYear();
          const itemMonth = itemData.getMonth() + 1;
          const selectedYear = selectedDate.getFullYear();
          const selectedMonthValue = selectedDate.getMonth() + 1;
      
          return itemYear === selectedYear && itemMonth === selectedMonthValue;
        });
      
        if (contasDoMes.length === 0) {
          return (
            <tr>
              <td className="p-2 border-t border-b border-gray-300 text-black text-center" colSpan={5}>
              </td>
            </tr>
          );
        }
      
        return contasDoMes.map((item, index) => {
          const formattedDate = new Date(item.Dia).toLocaleDateString('pt-BR');
          const formattedValue = `R$ ${parseFloat(item.Valor).toFixed(2).replace('.', ',')}`;
          return (
            <tr key={index}>
                <td className="p-2 border-t border-b border-gray-300 text-black text-center">{formattedDate}</td>
                <td className="p-2 border-t border-b border-gray-300 text-black text-center">{item.Tipo}</td>
                <td className="p-2 border-t border-b border-gray-300 text-black text-center">{item.Quantidade}</td>
                <td className="p-2 border-t border-b border-gray-300 text-black text-center">{formattedValue}</td>
                <td className="p-2 border-t border-b border-gray-300 text-black text-center">{item.Peso}</td>
                <td className="p-2 border-t border-b border-gray-300 text-black text-center"><CustomCheck color="green"/></td>
            </tr>
          );
        });
    };
    
      
      
      const onSelectMonth = (date: React.SetStateAction<Date | null>) => {
        setSelectedMonth(date);
        toggleCalendar();
      };
      
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Contas a Pagar" />

            <div className="mt-20 flex justify-center items-center">
                <div className="flex items-center">
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
                        currentDate={currentDate}
                        />
                    </div>
                    </div>
                </div>
            </div>

            <div className="mt-15 w-50 md:flex md:space-x-4">
                <CardDataStats title="Valor a Pagar" total="R$200,00">
                    <MdOutlineMoneyOffCsred color="red" size="22" />
                </CardDataStats>
                <CardDataStats title="Valor Pago" total="R$800,00">
                    <MdOutlineAttachMoney color="green" size="22" />
                </CardDataStats>
            </div>

            <div className="mt-15 border rounded-b-md">
                <div className="overflow-x-auto">
                    <table className="w-full text-black">
                        <thead className='bg-[#cdab7e]'>
                            <tr>
                                <th className="p-2 border-b border-gray-300 text-black text-center">Dia</th>
                                <th className="p-2 border-b border-gray-300 text-black text-center">Tipo</th>
                                <th className="p-2 border-b border-gray-300 text-black text-center">Quantidade</th>
                                <th className="p-2 border-b border-gray-300 text-black text-center">Valor</th>
                                <th className="p-2 border-b border-gray-300 text-black text-center">Peso</th>
                                <th className="p-2 border-b border-gray-300 text-black text-center">Pago</th>
                            </tr>
                        </thead>
                        <tbody className='p-2 border-b border-gray-300 text-black text-center'>
                            {renderContas()}
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
                                    label="Dia"
                                    {...register('Dia')}
                                    id="Dia"
                                    placeholder=""
                                    onChange={(event) => handleChange('Dia', event.target.value)} // Passando o valor extraído do evento
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap">
                                  <div className="w-full pr-4">
                                    <CustomSelect 
                                        label="Tipo" 
                                        options={["Alimentação", "Higiene e Cuidado", "Brinquedos"]}  
                                        {...register('Tipo')} 
                                        onChange={(value) => handleChange('Tipo', value)}
                                     />
                                </div>
                                {selectedType === 'Alimentação' && (
                                    <div className="w-full pr-4">
                                        <CustomAlim label="Marca de Alimentação" onChange={(value) => handleChange('Marca', value)} />
                                        <CustomPeso label="Peso" onChange={handlePesoChange} />
                                    </div>
                                )}

                                {showOtherWeightInput && (
                                    <div className="w-full pr-4">
                                        <CustomInput                     
                                            label="Peso"
                                            {...register('Peso')} // Certifique-se de que 'Peso' corresponde ao esperado pelo backend
                                            id="Peso"
                                            placeholder=""
                                            onChange={(value) => handleChange('Peso', value)}
                                        />
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

export default Financeiro;
