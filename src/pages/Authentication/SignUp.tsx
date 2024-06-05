import React, { useState } from 'react';
import { MdMailOutline, MdPersonOutline } from "react-icons/md";
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import api from './scripts/api';
import Button from './scripts/Button';
import Title from './scripts/Title';
import './StyleLogin.css';
import { AuthUserFormSchema } from './scripts/schemas';
import PayPalButton from './PayPal';

interface AuthUserFormData {
  email: string;
  password: string;
  nome: string;
}

const SignUp: React.FC = () => {
  const [, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [userRegistered, setUserRegistered] = useState(false);
  const [, setEmail] = useState<string>("");
  const [, setNome] = useState<string>("");
  const [planId, setPlanId] = useState<string>("");

  const { register, handleSubmit } = useForm<AuthUserFormData>({
    resolver: zodResolver(AuthUserFormSchema),
  });

  const onSubmit: SubmitHandler<AuthUserFormData> = async (data) => {
    setLoading(true);
    setError("");
    setEmail(data.email);
    setNome(data.nome);
    try {
      const response = await api.post("/newUsers", data);
      console.log("Resposta da API:", response);

      if (response.data.success) {
        console.log("Usuário cadastrado com sucesso!");
        setUserRegistered(true);
        setPlanId(response.data.subscription.plan_id);
      } else {
        setError(response.data.error || "Erro ao cadastrar usuário.");
      }
    } catch (error: any) {
      setError("Erro de rede. Por favor, tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="login-page">
      <div className="flex justify-center items-center">
        <div className='boxLeft'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Title title="Sistema PET" subtitle="" />

            <div className="input-box">
              <label htmlFor="nome">Nome<i>*</i></label>
              <MdPersonOutline id="icon" className="material-icons" />
              <input
                className="input"
                {...register("nome")}
                id="nome"
                type="text"
                placeholder="Digite o nome do Usuário"
              />
            </div>
            <div className="input-box">
              <label htmlFor="email">Email<i>*</i></label>
              <MdMailOutline id="icon" className="material-icons" />
              <input
                className="input"
                {...register("email")}
                id="email"
                type="email"
                placeholder="Digite seu email"
              />
            </div>

            <div className="input-box">
              <label htmlFor="password">Senha<i>*</i></label>
              <MdPersonOutline id="icon" className="material-icons" />
              <input
                className="input"
                {...register("password")}
                id="password"
                type="password"
                placeholder="Digite sua Senha"
              />
            </div>

            {error && <p className="error-message">{error}</p>}
            <Button type="submit" name={''} id={''} link={''} target={''} p={''} span={''} >Cadastrar</Button>
          </form>

          {userRegistered && <PayPalButton clientId="ATdhPQKt5_bCp6aKm4He1TXWdZvugwh-QxH6Rd192AW40c1hEZmMWeWATNIr7Q4jw0v4ecGRPiA_tIJa" planId={planId} />}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
