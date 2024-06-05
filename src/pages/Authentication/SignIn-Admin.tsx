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
import { Link, useNavigate } from 'react-router-dom';

type AuthUserFormData = z.infer<typeof AuthUserFormSchema>;

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<AuthUserFormData>({
    resolver: zodResolver(AuthUserFormSchema),
  });

  const onSubmit = async (data: AuthUserFormData) => {
    setLoading(true);
    console.log("Submitting data:", data); // Log de depuração

    try {
      const response = await api.post("/autenticacao", data);
      console.log("Response from API:", response);

      if (response.data.authenticate) {
        console.log("Autenticação bem-sucedida!");
        // Armazenar o token no localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('loggedInEmail', data.email);
        // Altere esta linha no arquivo SignIn.js
        navigate("/Table/Table", { state: { loggedInEmail: data.email } });

      } else {
        setError("Usuário ou senha incorreta!");
      }
    } catch (error: any) {
      console.error("Network error:", error);  // Log de depuração
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
            <Title title="Sistema PET" subtitle="Página de Administrador" />

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
              {errors.email && <p className="error-message">{errors.email.message}</p>}
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
              {errors.password && <p className="error-message">{errors.password.message}</p>}
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="button-container">
              <Button
                name='button'
                id='button'
                type='submit'
                content={loading ? "Aguarde..." : "Login"}
                disabled={loading} link={''} target={''} p={''} span={''}              />
            </div>
            <p className="signup-link mt-3 text-white">
              Ainda não tem uma conta?{" "}
              <Link to="/Cadastro" className="signup-text font-bold text-[#ffc124]">Cadastre-se</Link>
            </p>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
