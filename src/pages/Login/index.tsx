// import './login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ButtonRedirect from '../../components/ButtonRedirect/ButtonRedirect';
import Logo from '../../components/Logo/Logo';
import { Notify } from '../../components/Notification/Notification';
import { auth } from '../../config/firebase';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Notify({
        message: 'Bienvenido',
        type: 'success',
      });
      navigate('/home');
    } catch (error) {
      const errorMessage = mapFirebaseError((error as Error).message);
      Notify({ message: errorMessage, type: 'error' });
    }
  };

  const mapFirebaseError = (errorMessage: string): string => {
    const errorCodeMatch = errorMessage.match(/\(([^)]+)\)/);
    const errorCode = errorCodeMatch ? errorCodeMatch[1] : 'unknown';

    switch (errorCode) {
      case 'auth/user-not-found':
        return 'Usuario no encontrado.';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta.';
      case 'auth/invalid-email':
        return 'El correo no es válido.';
      default:
        return 'Ocurrió un error. Por favor, intenta de nuevo.';
    }
  };

  return (
    <>
      <div className="flex flex-col h-full ">
        <div className="flex flex-col h-full items-center justify-center">
          <div className="flex justify-center ">
            <Logo width="150px" height="150px" />
          </div>
          <div className="p-5">
            <form onSubmit={handleLogin}>
              <label htmlFor="email" className="font-800 text-2xl ">
                Email
              </label>
              <input
                id="email"
                type="text"
                onChange={e => setEmail(e.target.value)}
                className="bg-[#D9D9D9] p-2 w-full"
              />
              <label htmlFor="password" className="font-800 text-2xl">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                onChange={e => setPassword(e.target.value)}
                className="bg-[#D9D9D9] p-2 w-full "
              />
              <button type="submit" style={{ display: 'none' }}></button>
            </form>
            <div className="flex flex-col gap-2">
              <Link to="/reset-password">¿Olvidaste tu contraseña?</Link>
              <Link to="/register">Registrarse</Link>
            </div>
          </div>
        </div>
        <div className="mt-auto">
          <ButtonRedirect
            label="Iniciar Sesión"
            onClick={handleLogin}
            colorType="type1"
          />
          <ButtonRedirect
            label="Departamentos Libres"
            onClick={() => navigate('/dep-libres')}
            colorType="type2"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
