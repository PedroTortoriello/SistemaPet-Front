import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn-Admin';
import TicketTable from './pages/Table/Table';
import Caixa from './pages/Caixa/Table';
import RatTable from './pages/Agendamento/table';
import Estoque from './pages/Estoque/table';
import Encomendas from './pages/Encomendas/table';
import Financeiro from './pages/Financeiro/table';
import Ficha from './pages/Ficha/Table';
import SignUp from './pages/Authentication/SignUp';
import Inicial from './pages/Inicial/Table';
import SignInUser from './pages/Authentication/SignIn-User';
import Pagamento from './pages/Pagamentos/Table';
import Mensal from './pages/Pagamentos/TableMensal';

function App() {
  const { pathname } = useLocation();
  const [, setUserEmail] = useState<string>("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // Recuperar o e-mail do usuário do localStorage após o login bem-sucedido
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  return (
    <Routes>
      <Route
        index
        element={
          <>
            <PageTitle title="Pet System" />          
            <Inicial />
          </>
        }
      />

      <Route
        path="/Cadastro"
        element={
          <>
          <PageTitle title="Pet System" />
          <SignUp/>
          </> 
        }
      />

      <Route
        path="/Authentication/SignIn-Admin"
        element={
          <>
          <PageTitle title="Pet System" />
          <SignIn/>
          </> 
        }
      />

      <Route
        path="/Authentication/SignIn-User"
        element={
          <>
          <PageTitle title="Pet System" />
          <SignInUser/>
          </> 
        }
      />


      <Route
        path="/Caixa/Table"
        element={
          <>
          <PageTitle title="Pet System" />
          <Caixa/>
          </> 
        }
      />
      <Route
        path="/Ficha/Table/:id"
        element={
          <>
            <PageTitle title="Pet System" />
            <Ficha/>
          </>
        }
      />

      <Route
        path="/Financeiro/table"
        element={
          <>
          <PageTitle title="Pet System" />
          <Financeiro/>
          </> 
        }
      />

      <Route
        path="/Agendamento/Table"
        element={
          <>
          <PageTitle title="Pet System" />
          <RatTable/>
          </> 
        }
      />
      <Route
        path="/Encomendas/table"
        element={
          <>
          <PageTitle title="Pet System" />
          <Encomendas/>
          </> 
        }
      />

      <Route
        path="/Estoque/Table"
        element={
          <>
          <PageTitle title="Pet System" />
          <Estoque/>
          </> 
        }
      />
      
      <Route
        path="/Table/Table"
        element={
          <>
            <PageTitle title="Pet System" />
            <TicketTable  />
          </>
        }
      />
      <Route
        path="/Pagamento"
        element={
          <>
            <PageTitle title="Pet System" />
            <Pagamento  />
          </>
        }
      />
      <Route
        path="/Mensalidade"
        element={
          <>
            <PageTitle title="Pet System" />
            <Mensal  />
          </>
        }
      />

      <Route
        path="/login"
        element={
          <>
            <PageTitle title="Pet System" />
            <SignIn />
          </>
        }
      />

    </Routes>
  );
}

export default App;
