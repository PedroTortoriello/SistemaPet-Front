import React, { useState } from 'react';
import { MdMailOutline, MdPersonOutline } from "react-icons/md";
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { AuthUserFormSchema } from './scripts/schemas';
import { zodResolver } from "@hookform/resolvers/zod";
import api from './scripts/api';
import Button from './scripts/Button';
import Title from './scripts/Title';
import './StyleLogin.css';
import { useNavigate } from 'react-router-dom';

interface Registro {
  nome: string;
  petshop: string;
  codpet: string;
  email: string;
  password: string;

}
type AuthUserFormData = z.infer<typeof AuthUserFormSchema>;

const SignUp: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<AuthUserFormData>({
    resolver: zodResolver(AuthUserFormSchema),
  });

  const onSubmit = async (data: AuthUserFormData) => {
    setLoading(true);
    try {
      const response = await api.post("/autenticacao", data);
      console.log("Response from API:", response);

      if (response.data.authenticate) {
        console.log("Autenticação bem-sucedida!");
        //navigate("/Table/Table", { state: { loggedInEmail: data.email } });
      } else {
        setError("Usuário ou senha incorreta!");
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
        <div className='boxLeft '>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Title title="Sistema PET" subtitle="" />

            <div className="input-box ">
              <label htmlFor="PetShop">PetShop<i>*</i></label>
              <MdMailOutline id="icon" className="material-icons" />
              <input
                className="input"
                {...register("petshop")}
                id="petshop"
                type="petshop"
                placeholder="Digite o nome do PetShop"
              />
            </div>
            <div className="input-box ">
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

            <Button
              name="button"
              id="button"
              type="submit"
              content={loading ? "Aguarde..." : "Login"}
              disabled={loading} link={''} target={''} p={''} span={''}            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
