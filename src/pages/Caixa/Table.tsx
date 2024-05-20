import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { IoMdAdd, IoMdArrowBack, IoMdArrowForward, IoMdSend } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useForm } from 'react-hook-form';
import CustomInput from '../Table/CustomInput'
import Calendar from '../Agendamento/Calendar';
import CustomSelect from '../Agendamento/CustomSelect';
import CustomPayment from './CustomPayment';
import InputProduto from './InputProduct';

interface AgendaItem {
  time: string;
  clientName: string;
  Pet: string
  area: string;
}

const caixaData: AgendaItem[] = [
  { time: "08:30", clientName: "Rafaela da Cunha", Pet:'Mel', area: "Banho e Tosa"},
  { time: "09:00", clientName: "Pedro Tortoriello", Pet:'Dog', area: "Banho" }, // Preencher com outros dados
  // Adicione mais itens de agenda conforme necessário
];

const Caixa: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { register, handleSubmit } = useForm();
  const [showCadastro, setShowCadastro] = useState(false);
  const [showCadastro2, setShowCadastro2] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isWhatsApp, setIsWhatsApp] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false); 
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  
  const toggleCalendar = () => setShowCalendar(!showCalendar);

  const handleNovoClienteClick = () => {
    setShowCadastro(true);
  };

  const onSubmit = async (data: any) => {
    try {
      setShowCadastro(false);
      setShowCadastro2(true);
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

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    if (option === 'sim') {
      setIsWhatsApp(true);
    } else {
      setIsWhatsApp(false);
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
    setSelectedDay(day); // Atualize o dia selecionado
    setCurrentDate(day); // Atualize a data atual para o dia selecionado
  };
  
  
  
  

  const renderHorarios = () => {
    const horarios = [];
    for (let i = 8; i <= 17; i++) {
      const time1 = `${i < 10 ? `0${i}` : i}:00`;
      const time2 = `${i < 10 ? `0${i}` : i}:30`;
      const appointment1 = caixaData.find(appointment => appointment.time === time1);
      const appointment2 = caixaData.find(appointment => appointment.time === time2);
      horarios.push(
        <tr key={time1}>
          <td className="p-2 border-t border-b border-gray-300 text-black">{time1}</td>
          <td className="p-3 border-t border-b border-gray-300 text-black">{appointment1 ? appointment1.clientName : ''}</td>
          <td className="p-3 border-t border-b border-gray-300 text-black">{appointment1 ? appointment1.Pet : ''}</td>
          <td className="p-3 border-t border-b border-gray-300 text-black">{appointment1 ? appointment1.area : ''}</td>
        </tr>
      );
      horarios.push(
        <tr key={time2}>
          <td className="p-2 border-t border-b border-gray-300 text-black">{time2}</td>
          <td className="p-2 mr-4 border-t border-b border-gray-300 text-black">{appointment2 ? appointment2.clientName : ''}</td>
          <td className="p-2 mr-4 border-t border-b border-gray-300 text-black">{appointment2 ? appointment2.Pet : ''}</td>
          <td className="p-2 mr-4 border-t border-b border-gray-300 text-black">{appointment2 ? appointment2.area : ''}</td>
        </tr>
      );
    }
    return horarios;
  };

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
          <thead>
            <tr>
              <th className="px-4 py-2">Usuário</th>
              <th className="px-4 py-2">Dia</th>
              <th className="px-4 py-2">Valor</th>
              <th className="px-4 py-2">Forma de Pagamento</th>
              <th className="px-4 py-2">Produto</th>
              <th className="px-4 py-2">Quantidade</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr className="border-t">
              <td className="px-4 py-2">PEDRO TORTORIELLO</td>
              <td className="px-4 py-2">16/05/24</td>
              <td className="px-4 py-2">R$50,00</td>
              <td className="px-4 py-2">Cartão</td>
              <td className="px-4 py-2">Ração</td>
              <td className="px-4 py-2">2</td>
            </tr>
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
        <div className="fixed top-0 right-0 h-full overflow-y-auto bg-white w-[400px] shadow-lg ">
          <div className="border h-20 border-black bg-[#cccccc] relative">
            <h1 className="text-center w-full text-[20px] font-bold text-zinc-700 mt-7 ">Caixas</h1>
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
                  <CustomInput
                    label="Usuário"
                    register={register('usuario')}
                    id="usuario" 
                    placeholder=""
                    onFocus={() => handleFocus('labelNomeCliente')}
                    onBlur={(e) => handleBlur('labelNomeCliente', e.target.value)}
                    onChange={(e) => handleChange(e, 'labelNomeCliente')}
                  />
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full  pr-4">
                  <CustomInput
                    label="Valor"
                    register={register('Valor')}
                    id="Valor"
                    placeholder=""
                    onFocus={() => handleFocus('labelValor')}
                    onBlur={(e) => handleBlur('labelValor', e.target.value)}
                    onChange={(e) => handleChange(e, 'labelValor')}
                  />
                </div>
                <div className="w-full pr-4">

                  <CustomPayment
                    label="Forma de Pagamento"
                    register={register('formaPagamento')} // Registro do formulário
                    id="formaPagamento"
                    onFocus={() => handleFocus('labelFormaPagamento')}
                    onBlur={(e) => handleBlur('labelFormaPagamento', e.target.value)}
                    onChange={(e) => handleChange(e, 'labelFormaPagamento')}  
                  />

                </div>
                <div className="w-full pr-4">

                  <InputProduto
                    label="Produto"
                    register={register('Product')} // Registro do formulário
                    id="Product"
                    onFocus={() => handleFocus('labelProduct')}
                    onBlur={(e) => handleBlur('labelProduct', e.target.value)}
                    onChange={(e) => handleChange(e, 'labelProduct')}  
                  />

                </div>
              </div>
            </div>
           
            <button type="submit" className="absolute bottom-4 left-4 mt-10 w-45 bg-black text-white font-bold py-2 rounded-md flex justify-center items-center hover:bg-[#cdab7e] hover:text-black">
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

