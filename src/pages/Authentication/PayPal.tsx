import React, { useEffect, useRef } from 'react';
import { loadScript } from '@paypal/paypal-js';

interface PayPalButtonProps {
  clientId: string;
  planId: string;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ clientId, planId }) => {
  const paypalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!paypalRef.current) return;

    loadScript({ clientId, vault: true, intent: 'subscription' })
      .then((paypal) => {
        if (!paypal || !paypal.Buttons) {
          console.error('PayPal SDK não carregado corretamente.');
          return;
        }

        const buttonsInstance = paypal.Buttons({
          style: {
            shape: 'pill',
            color: 'gold',
            layout: 'vertical',
            label: 'subscribe',
          },
          createSubscription: (_data, actions) => {
            return actions.subscription.create({
              plan_id: planId,
            });
          },
          onApprove: (data, _actions) => {
            alert(`Assinatura criada com sucesso: ${data.subscriptionID}`);
            return Promise.resolve(); // Retornar uma promessa resolvida para compatibilidade de tipo
          },
          onError: (err) => {
            console.error('Erro ao criar assinatura:', err);
          },
        });

        buttonsInstance.render(paypalRef.current!); // Usando o operador de verificação não-nula
      })
      .catch((error) => {
        console.error('Falha ao carregar o script do PayPal JS SDK', error);
      });
  }, [clientId, planId]);

  return <div ref={paypalRef} style={{ marginTop: '50px' }}></div>;
};

export default PayPalButton;
