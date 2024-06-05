import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { IoMdAdd, IoMdArrowBack, IoMdArrowForward, IoMdSend } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { SubmitHandler, useForm } from 'react-hook-form';
import Calendar from '../Agendamento/Calendar';
import CustomClientesSelect from './CustomClientes';
import CustomPayment from './CustomPayment';
import InputProduto from './InputProduct';
import CustomDate from '../Agendamento/CustomDate';
import api from '../Authentication/scripts/api';
import CustomInput from '../Table/CustomInput';

interface Caixa {
  nomeCliente: string;
  Dia: string;
  Valor: string;
  Pagamento: string;
  Produto: string;
  Quantidade: string;
}

const Caixa: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { register, handleSubmit, setValue, reset } = useForm<Caixa>();
  const [showCadastro, setShowCadastro] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false); 
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [caixaData, setCaixaData] = useState<any[]>([]);
  const [clientes, setClientes] = useState<any[]>([]);
  const toggleCalendar = () => setShowCalendar(!showCalendar);

  const handleNovoClienteClick = () => {
    setShowCadastro(true);
  };

  const onSubmit: SubmitHandler<Caixa> = async (data) => {
    try {
        console.log('Dados do formulário:', data);

        const postResponse = await api.post(`/clientes/${data.nomeCliente}/compras`, data);
        const postResponse2 = await api.post(`/caixa`, data);

        if (postResponse.status === 200 && postResponse2.status === 201) {
            console.log('Compra adicionada com sucesso');
            fetchCaixa();
            setShowCadastro(false);
            reset(); // Resetar o formulário após o envio
        } else {
            console.error('Erro ao adicionar compra');
        }
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
    }
};

  
  const fecharDiv = () => {
    setShowCadastro(false);
  };

  const handlePrevDay = () => {
    console.log("Avançar para o dia anterior");
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 1);
    setCurrentDate(prevDate);
  };
  
  const handleNextDay = () => {
    console.log("Avançar para o próximo dia");
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
    setCurrentDate(nextDate);
  };
  
  const onSelectDay = (day: Date) => {
    setSelectedDay(day);
    setCurrentDate(day);
  };
  
  const handleChange = (name: keyof Caixa, value: string) => {
    setValue(name, value);
  };

  const fetchCaixa = async () => {
    try {
      const date = selectedDay || currentDate;
      console.log('Data para buscar Caixa:', date.toISOString().split('T')[0]);
      const response = await api.get('/caixa', { params: { data: date.toISOString().split('T')[0] } });
  
      if (response.status === 200) {
        console.log('Dados do caixa recebidos:', response.data);
        const caixaDataFromAPI: Caixa[] = response.data;
        setCaixaData(caixaDataFromAPI);
      } else {
        console.error('Erro ao buscar Caixa');
      }
    } catch (error) {
      console.error('Erro ao buscar Caixa:', error);
    }
  };

  useEffect(() => {
    fetchCaixa();
  }, [currentDate, selectedDay]);

  const rendercaixa = () => {
    const caixaDoDia = caixaData.filter((item: any) => {
      const itemData = new Date(item.Dia);
      const selectedDate = selectedDay || currentDate;
      return itemData.toDateString() === selectedDate.toDateString();
    });
  
    return caixaDoDia.map((item: any, index: number) => (
      <tr key={index}>
        <td className="p-2 border-t border-b border-gray-300 text-black text-center">{item.nomeCliente}</td>
        <td className="p-2 border-t border-b border-gray-300 text-black text-center">{item.Pagamento}</td>
        <td className="p-2 border-t border-b border-gray-300 text-black text-center">R$ {item.Valor}</td>
        <td className="p-2 border-t border-b border-gray-300 text-black text-center">{item.Produto}</td>
        <td className="p-2 border-t border-b border-gray-300 text-black text-center">{item.Quantidade}</td>
      </tr>
    ));
  };

  const fetchClientes = async () => {
    try {
      const response = await api.get('/clientes');
      if (response.status === 200) {
        console.log('Clientes recebidos:', response.data);
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

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Caixa" />

      <div className="mt-20 flex justify-center items-center">
        <div className="flex items-center">
          <button className="mr-4 text-black" onClick={handlePrevDay}>
            <IoMdArrowBack size={24} />
          </button>
          <div className="relative">
            <h2 className="text-xl font-bold text-black border bg-[#cdab7e] cursor-pointer" onClick={toggleCalendar}>
              {selectedDay ? selectedDay.toLocaleDateString() : currentDate.toLocaleDateString()}
            </h2>

            <div className="absolute left-[-50px] mt-0">
              <Calendar
                showCalendar={showCalendar}
                toggleCalendar={toggleCalendar}
                onSelectDay={onSelectDay}
                currentDate={currentDate} // Passa currentDate para o componente de calendário
              />
            </div>
          </div>
          <button className="ml-4 text-black" onClick={handleNextDay}>
            <IoMdArrowForward size={24} />
          </button>
        </div>
      </div>

      <div className="mt-10 border rounded-b-md">
        <div className="overflow-x-auto">
          <table className="w-full text-black">
            <thead className='bg-[#cdab7e]'>
              <tr>
                <th className="px-4 py-2">Usuário</th>
                <th className="px-4 py-2">Forma de Pagamento</th>
                <th className="px-4 py-2">Valor</th>
                <th className="px-4 py-2">Produto</th>
                <th className="px-4 py-2">Quantidade</th>
              </tr>
            </thead>
            <tbody className='p-2 border-b border-gray-300 text-black text-center'>
              {rendercaixa()}
            </tbody>
          </table>
        </div>
      </div>

      <div className="absolute bottom-4 left-4">
        <button type="button" onClick={handleNovoClienteClick} className="flex w-40 font-bold items-center justify-center rounded-md bg-[#cdab7e] py-2 pr-4 text-center font-medium text-black transition hover:bg-[#d5b99a]">
          <span className="font-bold">Registrar Caixa</span>
          <IoMdAdd className="ml-1" />
        </button>
      </div>

      {showCadastro && (
        <div className="fixed top-0 right-0 h-full overflow-y-auto bg-white w-[400px] shadow-lg">
          <div className="border h-20 border-black bg-[#cccccc] relative">
            <h1 className="text-center w-full text-[20px] font-bold text-zinc-700 mt-7">Caixas</h1>
            <span className="absolute top-0 right-0 mr-2 mt-2 cursor-pointer text-black font-bold h-30" onClick={fecharDiv}><IoCloseSharp /></span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto p-8 rounded-lg mt-10">
            <div className="flex justify-center items-center">
              <hr className="my-8 border-t-1 border-black w-full" />
              <div className="mx-4 text-[20px] font-bold text-zinc-700">Informações</div>
              <hr className="my-8 border-t-1 border-black w-full" />
            </div>
            <div className="text-black-border-border-black">
              <div className="flex flex-wrap mt-5">
                <div className="w-full  pr-4">
                  <CustomClientesSelect
                  label="Nome Cliente"
                  onChange={(value) => handleChange('nomeCliente', value)}
                  options={clientes.map(cliente => ({ value: cliente.nomeCliente, label: cliente.nomeCliente}))} 
                  />
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full  pr-4">
                  <CustomDate
                    label="Dia"
                    {...register('Dia')}
                    id="Dia"
                    placeholder=""
                    onChange={(value) => handleChange('Dia', value)}
                  />
                </div>
                <div className="w-full pr-4">
                  <CustomInput
                      label="Valor"
                      {...register('Valor')} 
                      id="Valor"
                      placeholder=""
                      onChange={(value) => handleChange('Valor', value)}
                  />
                  <CustomPayment
                    label="Pagamento"
                    {...register('Pagamento')}
                    id="Pagamento"
                    placeholder=""
                    onChange={(value) => handleChange('Pagamento', value)}
                  />
                </div>
                <div className="w-full pr-4">
                  <InputProduto
                    label="Produto"
                    {...register('Produto')}
                    id="Produto"
                    placeholder=""
                    onChange={(value) => handleChange('Produto', value)}
                  />
                  <CustomInput
                      label="Quantidade"
                      {...register('Quantidade')} 
                      id="Quantidade"
                      placeholder=""
                      onChange={(value) => handleChange('Quantidade', value)}
                  />
                </div>
              </div>
            </div>
           
            <button type="submit" className=" bottom-4 left-4 mt-10 w-45 text-white font-bold py-2 rounded-md flex justify-center items-center bg-[#cdab7e] hover:text-black">
              Registrar
              <IoMdSend className="ml-2" />
            </button>
          </form>
        </div>
      )}
    </DefaultLayout>
  );
};

export default Caixa;
