import React, { useState } from 'react';
import {MdOutlinePassword} from "react-icons/md";
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import api from '../Authentication/scripts/api';
import Button from '../Authentication/scripts/Button';
import Title from '../Authentication/scripts/Title';
import './StylePag.css';
import { useNavigate } from 'react-router-dom';
import * as z from "zod";
import { CiCalendarDate, CiCreditCard1 } from "react-icons/ci";
import { IoLogoUsd, IoPersonOutline } from 'react-icons/io5';

interface AuthUserFormData {
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCVV: string;
  Valor: string;
}

const Mensal: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const schema = z.object({
    cardNumber: z.string().min(16, "Número do cartão inválido").max(16, "Número do cartão inválido"),
    cardName: z.string().min(1, "Nome é obrigatório"),
    cardExpiry: z.string().min(5, "Validade inválida").max(5, "Validade inválida"),
    cardCvc: z.string().min(3, "CVV inválido").max(3, "CVV inválido"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<AuthUserFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<AuthUserFormData> = async (data) => {
    setLoading(true);
    try {
      const response = await api.post("/newUsers", data);
      console.log("Response from API:", response);

      if (response.data.success) {
        console.log("Pagamento realizado com sucesso!");
        navigate("/Inicial/Table", { state: { loggedInEmail: data.cardName } });
      } else {
        setError(response.data.error || "Erro ao processar pagamento.");
      }
    } catch (error: any) {
      setError("Erro de rede. Por favor, tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };
  // Função para obter a bandeira do cartão com base nos primeiros dígitos do número do cartão
  const getCardType = (cardNumber: string): string => {
    const visaRegex = /^4/;
    const mastercardRegex = /^5[1-5]/;
    const amexRegex = /^3[47]/;
    const discoverRegex = /^6(?:011|5)/;
  
    if (visaRegex.test(cardNumber)) {
      return "Visa";
    } else if (mastercardRegex.test(cardNumber)) {
      return "Mastercard";
    } else if (amexRegex.test(cardNumber)) {
      return "American Express";
    } else if (discoverRegex.test(cardNumber)) {
      return "Discover";
    } else {
      return "";
    }
  };
  
 
   return (
    <div className="login-page">
      <div className="flex justify-center items-center">
        <div className='boxLeft'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Title title="Sistema PET" subtitle="Pagamento" />

            <div className="input-box">
              
              <label htmlFor="cardNumber">Número Cartão<i>*</i></label>
              <CiCreditCard1  id="icon" className="material-icons" />
              <div className="card-number-input">
                <input
                  className={`input ${getCardType(cardNumber).toLowerCase()}`} // Aplica a classe com base no tipo de cartão
                  {...register("cardNumber")}
                  id="cardNumber"
                  type="text"
                  placeholder="Digite o número do cartão"
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              
              </div>
              {errors.cardNumber && <p className="error-message">{errors.cardNumber.message}</p>}
            </div>

            <div className="input-box">
              <label htmlFor="cardName">Nome no Cartão<i>*</i></label>
              <IoPersonOutline   id="icon" className="material-icons h-5" />
              <input
                className="input"
                {...register("cardName")}
                id="cardName"
                type="text"
                placeholder="Digite o nome no cartão"
              />
              {errors.cardName && <p className="error-message">{errors.cardName.message}</p>}
            </div>

            <div className="input-box">
              <label htmlFor="cardExpiry">Validade<i>*</i></label>
              <CiCalendarDate id="icon" className="material-icons" />
              <input
                className="input"
                {...register("cardExpiry")}
                id="cardExpiry"
                type="text"
                placeholder="MM/AA"
                maxLength={5}
              />
              {errors.cardExpiry && <p className="error-message">{errors.cardExpiry.message}</p>}
            </div>

            <div className="input-box">
              <label htmlFor="cardCvc">CVV<i>*</i></label>
              <MdOutlinePassword id="icon" className="material-icons" />
              <input
                className="input"
                {...register("cardCVV")}
                id="cardCvc"
                type="text"
                placeholder="Digite o CVV"
                maxLength={3}
              />
              {errors.cardCVV && <p className="error-message">{errors.cardCVV.message}</p>}
            </div>

            <div className="input-box">
              <label htmlFor="cardValor">Valor<i>*</i></label>
              <IoLogoUsd  id="icon" className="material-icons h-5" />
              <input
                className="input"
                {...register("Valor")}
                id="cardValor"
                type="text"
                value="R$200,00"
                maxLength={3}
              />
              {errors.cardCVV && <p className="error-message">{errors.cardCVV.message}</p>}
            </div>

            {error && <p className="error-message">{error}</p>}

            <Button
              name="button"
              id="button"
              type="submit"
              content={loading ? "Aguarde..." : "Contratar"}
              disabled={loading}
              link={''}
              target={''}
              p={''}
              span={''}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Mensal;
