import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { IoMdAdd, IoMdArrowBack, IoMdArrowForward, IoMdSend } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useForm } from 'react-hook-form';
import './agenda.css';
import CustomInput from '../Table/CustomInput'
import CustomSelect from './CustomSelect';
import Calendar from './Calendar';
import Checkbox from './CustomCheck';
import CustomDate from './CustomDate';

interface AgendaItem {
  time: string;
  clientName: string;
  Pet: string
  area: string;
  compareceu:  JSX.Element;
  naocompareceu:  JSX.Element;
}

const agendaData: AgendaItem[] = [
  { 
    time: "08:30", 
    clientName: "Pedro Tortoriello", 
    Pet: 'Tobby', 
    area: "Banho e Tosa", 
    compareceu: <Checkbox color="green" />,
    naocompareceu: <Checkbox color="red" />
  },
  { 
    time: "09:00", 
    clientName: "Pedro Tortoriello", 
    Pet: 'Dog', 
    area: "Banho", 
    compareceu: <Checkbox color="green" />,
    naocompareceu: <Checkbox color="red" />
  },
];

const Agenda: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { register, handleSubmit } = useForm();
  const [showCadastro, setShowCadastro] = useState(false);
  const [showCadastro2, setShowCadastro2] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [tableData] = useState<AgendaItem[]>([]);
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
    setSelectedDay(day); 
    setCurrentDate(day); 
  };
  

  const renderHorarios = () => {
    const horarios = [];
    for (let i = 8; i <= 17; i++) {
      const time1 = `${i < 10 ? `0${i}` : i}:00`;
      const time2 = `${i < 10 ? `0${i}` : i}:30`;
      const appointment1 = agendaData.find(appointment => appointment.time === time1);
      const appointment2 = agendaData.find(appointment => appointment.time === time2);
      horarios.push(
        <tr key={time1}>
          <td className="p-2 border-t border-b border-gray-300 text-black text-center">{time1}</td>
          <td className="p-2 border-t border-b border-gray-300 text-black text-center">{appointment1 ? appointment1.clientName : ''}</td>
          <td className="p-3 border-t border-b border-gray-300 text-black text-center">{appointment1 ? appointment1.Pet : ''}</td>
          <td className="p-3 border-t border-b border-gray-300 text-black text-center">{appointment1 ? appointment1.area : ''}</td>
          <td className="p-3 border-t border-b border-gray-300 text-black text-center">{appointment1 ? appointment1.compareceu : ''}</td>
          <td className="p-3 border-t border-b border-gray-300 text-black text-center">{appointment1 ? appointment1.naocompareceu : ''}</td>
        </tr>
      );
      horarios.push(
        <tr key={time2}>
          <td className="p-2 border-t border-b border-gray-300 text-black text-center">{time2}</td>
          <td className="p-2 border-t border-b border-gray-300 text-black text-center">{appointment2 ? appointment2.clientName : ''}</td>
          <td className="p-2 border-t border-b border-gray-300 text-black v">{appointment2 ? appointment2.Pet : ''}</td>
          <td className="p-2 border-t border-b border-gray-300 text-black text-center">{appointment2 ? appointment2.area : ''}</td>
          <td className="p-3 border-t border-b border-gray-300 text-black text-center">{appointment2 ? appointment2.compareceu : ''}</td>
          <td className="p-3 border-t border-b border-gray-300 text-black text-center">{appointment2 ? appointment2.naocompareceu : ''}</td>
        </tr>
      );
    }
    return horarios;
  };
  

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Agendamentos" />

      <div className="mt-20 flex justify-center items-center">
        <div className="w-full max-w-screen-md">
          < div className="flex items-center justify-center">
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
                  currentDate={currentDate}
                />

              </div>

            </div>
            <button className="ml-4 text-black" onClick={handleNextDay}>
              <IoMdArrowForward size={24} />
            </button>

          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-center">
        <div className="w-[750px] p-[15px] border border-black" style={{ border: '1px solid rgba(0, 0, 0, 0.3)', padding: '4px', borderRadius: '4px', direction: 'ltr' }}>
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-2 border-b border-gray-300 text-black text-center">Horário</th>
                <th className="p-2 border-b border-gray-300 text-black text-center">Cliente</th>
                <th className="p-2 border-b border-gray-300 text-black text-center">Pet</th>
                <th className="p-2 border-b border-gray-300 text-black text-center">Serviço</th>
                <th className="p-2 border-b border-gray-300 text-black text-center">Compareceu</th>
                <th className="p-2 border-b border-gray-300 text-black text-center">Não Compareceu</th>
              </tr>
            </thead>
            <tbody className='p-2 border-b border-gray-300'>
              {renderHorarios()}
            </tbody>
          </table>
        </div>
      </div>

      <div className="absolute bottom-4 left-4">
        <button type="button" onClick={handleNovoClienteClick} className="flex w-40 font-bold items-center justify-center rounded-md bg-[#cdab7e] py-2 pr-4 text-center font-medium text-black transition hover:bg-[#d5b99a]">
          <span className="font-bold">Agendar</span>
          <IoMdAdd className="ml-1" />
        </button>
      </div>

      {showCadastro && (
        <div className="fixed top-0 right-0 h-full overflow-y-auto bg-white w-[400px] shadow-lg ">
          <div className="border h-20 border-black bg-[#cccccc] relative">
            <h1 className="text-center w-full text-[20px] font-bold text-zinc-700 mt-7 ">Agendamento</h1>
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
                    label="Nome Completo"
                    register={register('nomeCliente')}
                    id="nomeCliente" 
                    placeholder=""
                    onFocus={() => handleFocus('labelNomeCliente')}
                    onBlur={(e) => handleBlur('labelNomeCliente', e.target.value)}
                    onChange={(e) => handleChange(e, 'labelNomeCliente')}
                  />
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full pr-4">
                  <CustomInput
                    label="PET"
                    register={register('PET')}
                    id="PET"
                    placeholder=""
                    onFocus={() => handleFocus('labelPET')}
                    onBlur={(e) => handleBlur('labelPET', e.target.value)}
                    onChange={(e) => handleChange(e, 'labelPET')}
                  />
                </div>
                <div className="md:flex md:space-x-4 w-full">
                  <div className="w-full pr-4">
                    <CustomDate label='Data'/>
                  </div>
                  <div className="w-full pr-4">
                    <CustomSelect label="Horário" onChange={handleChange} />
                  </div>
                </div>
                <div className=" w-full pr-4">
                  <CustomInput
                    label="Serviço"
                    register={register('Serviço')}
                    id="Serviço"
                    placeholder=""
                    onFocus={() => handleFocus('labelServiço')}
                    onBlur={(e) => handleBlur('labelServiço', e.target.value)}
                    onChange={(e) => handleChange(e, 'labelServiço')}
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
                  className={`mt-3 w-[130px] h-10 border text-black border-black rounded-r-md ${selectedOption === 'não' ? 'selected hover:bg-[#cdab7e]' : 'hover:bg-[#cdab7e]'}`}
                  onClick={() => handleOptionChange('não')}
                >
                  Não
                </button>
              </div>
            </div>
            <button type="submit" className="mt-10 w-full bg-black text-white font-bold py-2 rounded-md flex justify-center items-center hover:bg-[#cdab7e] hover:text-black">
              Agendar
              <IoMdSend className="ml-2" />
            </button>
          </form>
        </div>
      )}

    
    </DefaultLayout>
  );
};

export default Agenda;

function formatTelefone(value: string) {
  value = value.replace(/\D/g, '');
  if (value.length === 11) {
    value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else {
    value = value.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  return value;
}