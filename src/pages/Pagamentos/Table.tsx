import React, { useState } from 'react';
import {MdOutlinePassword} from "react-icons/md";
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";

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

const Pagamento: React.FC = () => {
  const [loading, ] = useState(false);
  const [error, ] = useState<string>("");
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

  {/*const onSubmit: SubmitHandler<AuthUserFormData> = async (data) => {
    setLoading(true);
    try {
      const response = await api.post("/", data);
      console.log("Response from API:", response);

      if (response.data.success) {
        console.log("Pagamento realizado com sucesso!");
        navigate("/Mensalidade", { state: { loggedInEmail: data.cardName } });
      } else {
        setError(response.data.error || "Erro ao processar pagamento.");
      }
    } catch (error: any) {
      setError("Erro de rede. Por favor, tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };*/ }

  const onSubmit: SubmitHandler<AuthUserFormData> = async (data) => {
    navigate("/Mensalidade", { state: { loggedInEmail: data.cardName } });
  
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
  
  const CardCVV = (CardCVV: string) => {
    // Remove tudo que não é número
    CardCVV = CardCVV.replace(/\D/g, '');
  
    // Limita o tamanho máximo do CardCVV para 4 caracteres
    CardCVV = CardCVV.substring(0, 4);
 
   return CardCVV ;
  };

  const formatExpirationDate = (expirationDate: string): string => {
    // Remove todos os espaços em branco
    expirationDate = expirationDate.replace(/\s/g, '');
  
    // Adiciona a barra se não estiver presente
    if (!expirationDate.includes('/')) {
      expirationDate = expirationDate.slice(0, 2) + '/' + expirationDate.slice(2);
    }
  
    // Separa o mês e o ano
    const [month, year] = expirationDate.split('/');
    
    // Formata o mês para ter sempre dois dígitos
    const formattedMonth = month.padStart(2, '0');
    
    // Pega os últimos dois dígitos do ano
    const formattedYear = year.slice(-2);
    
    // Combina o mês e o ano formatados
    const formattedExpirationDate = `${formattedMonth}/${formattedYear}`;
    
    // Retorna a data de validade formatada
    return formattedExpirationDate;
  };

    // Função para formatar o número do cartão
    const formatCardNumber = (number: string) => {
      // Remove espaços e pontos existentes
      number = number.replace(/\s/g, '').replace(/\./g, '');
  
      // Limita a 16 dígitos
      number = number.slice(0, 16);
  
      // Adiciona um ponto a cada 4 dígitos
      return number.replace(/(\d{4})(?=\d)/g, '$1.');
    };
  
    const handleCardNumberChange = (e: { target: { value: string; }; }) => {
      const formattedNumber = formatCardNumber(e.target.value);
      setCardNumber(formattedNumber);
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
          {...register("cardNumber", { 
            required: "O número do cartão é obrigatório",
            minLength: { value: 19, message: "O número do cartão deve ter 16 dígitos" }, // 19 porque 16 dígitos + 3 pontos
            maxLength: { value: 19, message: "O número do cartão deve ter 16 dígitos" },
            onChange: handleCardNumberChange
          })}
          id="cardNumber"
          type="text"
          placeholder="Digite o número do cartão"
          value={cardNumber}
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
                {...register("cardExpiry", { onChange: (e) => e.target.value = formatExpirationDate(e.target.value) })}
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
                {...register("cardCVV", { onChange: (e) => e.target.value = CardCVV(e.target.value) })}
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
                value="R$2.000,00"
                maxLength={3}
              />
              {errors.cardCVV && <p className="error-message">{errors.cardCVV.message}</p>}
            </div>

            {error && <p className="error-message">{error}</p>}

            <Button
              name="button"
              id="button"
              type="submit"
              content={loading ? "Aguarde..." : "Pagar"}
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

export default Pagamento;
