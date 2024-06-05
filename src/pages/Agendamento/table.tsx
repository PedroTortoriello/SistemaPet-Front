import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import CustomInput from '../Table/CustomInput';
import CustomDate from './CustomDate';
import CustomSelect from './CustomSelect';
import api from '../Authentication/scripts/api';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { IoMdArrowBack, IoMdArrowForward, IoMdAdd } from 'react-icons/io';
import { IoCloseSharp } from 'react-icons/io5';
import Calendar from './Calendar';
import CustomCheck from './CustomCheck';
import CustomService from './CustomService';
import CustomClientesSelect from './CustomClientes';

interface FormData {
  cliente: string;
  animal: string;
  servico: string;
  data: string;
  hora: string;
  email: string;
  telefone: string;
}

const Agenda: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const [showCadastro, setShowCadastro] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [agendaData, setAgendaData] = useState<any[]>([]);
  const [clientes, setClientes] = useState<any[]>([]);
  const toggleCalendar = () => setShowCalendar(!showCalendar);

  const handleNovoClienteClick = () => {
    setShowCadastro(true);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      console.log('Dados do formulário:', data);

      if (!data.cliente || !data.servico || !data.data || !data.hora) {
        console.error('Por favor, preencha todos os campos obrigatórios.');
        return;
      }

      const dataHora = `${data.data}T${data.hora}:00.000Z`;

      const agendamentoData = {
        ...data,
        data: dataHora,
      };

      const response = await api.post('/agendamentos', agendamentoData);

      if (response.status === 200) {
        console.log('Item da agenda criado com sucesso');
        fetchAgenda();
        setShowCadastro(false);
      } else {
        console.error('Erro ao criar item da agenda');
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  useEffect(() => {
    console.log("Agenda Data:", agendaData);
    fetchAgenda();
  }, [selectedDay, currentDate]);
  

  
  

  const handleChange = (name: keyof FormData, value: string) => {
    setValue(name, value);
  };

  const handlePrevDay = () => {
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 1);
    setCurrentDate(prevDate);
    setSelectedDay(prevDate);
  };

  const handleNextDay = () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
    setCurrentDate(nextDate);
    setSelectedDay(nextDate);
  };

  const onSelectCalendarDay = (day: Date) => {
    setSelectedDay(day);
    setCurrentDate(day);
  };

  useEffect(() => {
    fetchAgenda();
  }, [currentDate, selectedDay]);
  
  const fetchAgenda = async () => {
    const date = selectedDay || currentDate;
    console.log('Data para buscar agendamentos:', date.toISOString().split('T')[0]);
    try {
      const response = await api.get('/agendamentos', { params: { data: date.toISOString().split('T')[0] } });
      if (response.status === 200) {
        console.log('Dados da agenda recebidos:', response.data);
        setAgendaData(response.data);
      } else {
        console.error('Erro ao buscar agendamentos');
      }
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
    }
  };

  const renderHorarios = () => {
    const horarios = [];
    const date = selectedDay || currentDate;
    const selectedDate = date.toISOString().split('T')[0];
  
    for (let i = 8; i < 18; i++) {
      for (let j = 0; j < 2; j++) {
        const hora = i < 10 ? `0${i}` : `${i}`;
        const minuto = j === 0 ? '00' : '30';
  
        const horarioSelecionado = new Date(date);
        horarioSelecionado.setHours(i, parseInt(minuto), 0, 0);
  
        const agendamentosHorarioSelecionado = agendaData.filter((item: any) => {
          const itemHora = item.hora.split(':');
          const itemHour = parseInt(itemHora[0]);
          const itemMinute = parseInt(itemHora[1]);
          return itemHour === i && itemMinute === parseInt(minuto) && item.data.split('T')[0] === selectedDate;
        });
  
        horarios.push(
          <tr key={`${hora}:${minuto}`}>
            <td className="p-2 border-t border-b border-gray-300 text-black text-center">{`${hora}:${minuto}`}</td>
            <td className="p-2 border-t border-b border-gray-300 text-black text-center">
              {agendamentosHorarioSelecionado.map(item => {
                // Separar o nome completo em partes
                const nomeParts = item.cliente.split(' ');
                // Retornar o primeiro e o último nome
                return `${nomeParts[0]} ${nomeParts[nomeParts.length - 1]}`;
              }).join(', ')}
            </td>
            <td className="p-2 border-t border-b border-gray-300 text-black text-center">{agendamentosHorarioSelecionado.map(item => item.animal).join(', ')}</td>
            <td className="p-2 border-t border-b border-gray-300 text-black text-center">{agendamentosHorarioSelecionado.map(item => item.servico).join(', ')}</td>
            <td className="p-2 border-t border-b border-gray-300 text-black text-center"><CustomCheck color="green"/></td>
            <td className="p-2 border-t border-b border-gray-300 text-black text-center"><CustomCheck color="red"/></td>
          </tr>
        );
      }
    }
  
    return horarios;
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
      <Breadcrumb pageName="Agendamentos" />

      <div className="mt-20 flex justify-center items-center">
        <div className="w-full max-w-screen-md">
          <div className="flex items-center justify-center">
            <button className="mr-4 text-black" onClick={handlePrevDay}>
              <IoMdArrowBack size={24} />
            </button>

            <div className="relative">
              <h2 className="text-xl font-bold text-black border bg-[#cdab7e] cursor-pointer" onClick={toggleCalendar}>
                {selectedDay ? selectedDay.toLocaleDateString() : currentDate.toLocaleDateString()}
              </h2>
              {showCalendar && (
                <div className="absolute left-[-50px] mt-0">
                  <Calendar
                    showCalendar={showCalendar}
                    toggleCalendar={toggleCalendar}
                    onSelectDay={onSelectCalendarDay}
                    currentDate={currentDate}
                  />
                </div>
              )}
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
            <tbody className='p-2 border-b border-gray-300 text-black text-center'>
              {renderHorarios()}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex mt-5">
        <button type="button" onClick={handleNovoClienteClick} className="flex w-43 font-bold items-center justify-center rounded-md bg-[#cdab7e] py-2 pr-4 text-center font-medium text-black transition hover:bg-[#d5b99a]">
          <span className="font-bold ml-1">Agendar Cliente</span>
          <IoMdAdd className="ml-1" />
        </button>
      </div>


      {showCadastro && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <form onSubmit={handleSubmit(onSubmit)} className="relative w-1/3 bg-white p-8 rounded-md">
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowCadastro(false)}
            >
              <IoCloseSharp size={24} />
            </button>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-zinc-700">Novo Agendamento</h2>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full pr-4">
              <CustomClientesSelect
                  label="Nome Cliente"
                  onChange={(value) => handleChange('cliente', value)}
                  onClientSelect={(client) => {
                    // Atualize os campos de e-mail e telefone com os detalhes do cliente selecionado
                    setValue('email', client.email);
                    setValue('telefone', client.telefone);
                  }}
                  options={clientes.map(cliente => ({ value: cliente.nomeCliente, label: cliente.nomeCliente, email: cliente.email, telefone: cliente.telefone }))} 
                />

              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full pr-4">
                <CustomClientesSelect
                  label="PET"
                  {...register('animal')}
                  id="PET"
                  placeholder="Digite o nome do PET"
                  onChange={(value) => handleChange('cliente', value)}
                  options={clientes.map(cliente => ({ value: cliente.nomePet, label: cliente.nomePet }))} // Passa as opções de clientes
                />
              </div>
              <div className="md:flex md:space-x-4 w-full">
                <div className="w-full pr-4">
                  <CustomService
                    label="Serviço"
                    {...register('servico')}
                    id="servico"
                    placeholder=""
                    onChange={(value) => handleChange('servico', value)}
                  />
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-1/2 pr-4">
                  <CustomDate
                    label="Data"
                    {...register('data')}
                    id="data"
                    placeholder=""
                    onChange={(value) => handleChange('data', value)}
                  />
                </div>
                <div className="w-1/2 pr-4">
                  <CustomSelect
                    label="Horário"
                    {...register('hora')}
                    id="horario"
                    placeholder=""
                    onChange={(value) => handleChange('hora', value)}
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
              <div className="w-full pr-4">
                <CustomInput
                  label="E-mail"
                  {...register('email')}
                  id="email"
                  placeholder=""
                  onChange={(value) => handleChange('email', value)}
                />
              </div>
              <div className="w-full pr-4">
                <CustomInput
                  label="Telefone"
                  {...register('telefone')}
                  id="telefone"
                  placeholder=""
                  onChange={(value) => handleChange('telefone', value)}
                />
              </div>
            </div>

            <div className="w-full px-4 mt-7">
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-[#cdab7e] py-2 px-4 text-sm font-medium text-black hover:bg-[#d5b99a] focus:outline-none focus:ring-2 focus:ring-[#d5b99a] focus:ring-offset-2"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      )}
    </DefaultLayout>
  );
};

export default Agenda;
