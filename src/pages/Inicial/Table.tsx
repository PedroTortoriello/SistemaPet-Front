import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import logo from '../Authentication/Pet Shop Logo.png';

export default function Inicial() {
  const navigate = useNavigate(); // Use useNavigate hook

  return (
    <div className="bg-gradient-to-br from-[#cdab7e] to-[#9c8363] w-full h-screen flex flex-col justify-center items-center font-sans">
      <div className="flex flex-col items-center">
        <img src={logo} alt="Pet Shop Logo" className="mb-8 w-64 h-auto" />
        <div className="space-x-4">
          <button
            onClick={() => navigate('./Authentication/SignIn-Admin')}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out"
          >
            Admin
          </button>
          <button
            onClick={() => navigate('./Authentication/SignIn-User')}
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300 ease-in-out"
          >
            Usuário
          </button>
        </div>
      </div>
    </div>
  );
}
