import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonRedirect from '../../components/ButtonRedirect/ButtonRedirect';
import Logo from '../../components/Logo/Logo';
import { Notify } from '../../components/Notification/Notification';
import { auth } from '../../config/firebase';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handlerRegister = async () => {
    if (!email || !password) {
      Notify({
        message: 'Por favor, completa todos los campos.',
        type: 'error',
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      Notify({
        message: 'Registro exitoso. Redirigiendo al login...',
        type: 'success',
      });
      setEmail('');
      setPassword('');
      navigate('/login');
    } catch (error) {
      const errorMessage = mapFirebaseError((error as Error).message);
      Notify({ message: errorMessage, type: 'error' });
    }
  };

  const mapFirebaseError = (errorMessage: string): string => {
    const errorCodeMatch = errorMessage.match(/\(([^)]+)\)/);
    const errorCode = errorCodeMatch ? errorCodeMatch[1] : 'unknown';

    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'El correo ya está en uso.';
      case 'auth/invalid-email':
        return 'El correo no es válido.';
      case 'auth/weak-password':
        return 'La contraseña debe tener al menos 6 caracteres.';
      default:
        return 'Ocurrió un error. Por favor, intenta de nuevo.';
    }
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex flex-col h-full items-center justify-center">
          <div className="flex justify-center">
            <Logo width="150px" height="150px" />
          </div>
          <div className="p-5">
            <form onSubmit={e => e.preventDefault()}>
              <label htmlFor="email" className="font-800 text-2xl">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="bg-[#D9D9D9] p-2 w-full"
              />
              <label htmlFor="password" className="font-800 text-2xl">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="bg-[#D9D9D9] p-2 w-full"
              />
            </form>
          </div>
        </div>
        <div className="mt-auto">
          <ButtonRedirect
            label="Registrarse"
            onClick={handlerRegister}
            colorType="type1"
          />
          <ButtonRedirect
            label="Login"
            onClick={() => navigate('/login')}
            colorType="type2"
          />
        </div>
      </div>
    </>
  );
};

export default Register;
