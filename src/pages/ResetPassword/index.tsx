import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonRedirect from '../../components/ButtonRedirect/ButtonRedirect';
import Logo from '../../components/Logo/Logo';
import { Notify } from '../../components/Notification/Notification';
import { auth } from '../../config/firebase';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleResetPassword = async (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    if (!email.trim()) {
      Notify({
        message: 'Por favor, ingresa un correo electrónico válido.',
        type: 'error',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await sendPasswordResetEmail(auth, email);
      Notify({
        message:
          'Correo enviado. Revisa tu bandeja para restablecer tu contraseña.',
        type: 'success',
      });
      setEmail('');
    } catch (error) {
      const errorMessage = mapFirebaseError((error as Error).message);
      Notify({ message: errorMessage, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const mapFirebaseError = (errorMessage: string): string => {
    const errorCodeMatch = errorMessage.match(/\(([^)]+)\)/);
    const errorCode = errorCodeMatch ? errorCodeMatch[1] : 'unknown';

    switch (errorCode) {
      case 'auth/user-not-found':
        return 'Usuario no encontrado.';
      case 'auth/invalid-email':
        return 'El correo no es válido.';
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
            <form onSubmit={handleResetPassword}>
              <label htmlFor="email" className="font-800 text-2xl">
                Ingresa tu correo electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="bg-[#D9D9D9] p-2 w-full"
              />
              <button
                type="submit"
                className={`mt-4 p-2 w-full ${
                  isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                } text-white rounded`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Restablecer Contraseña'}
              </button>
            </form>
          </div>
        </div>
        <div className="mt-auto ">
          <ButtonRedirect
            label="Iniciar Sesión"
            onClick={() => navigate('/login')}
            colorType="type1"
          />
          <ButtonRedirect
            label="Registrarse"
            onClick={() => navigate('/register')}
            colorType="type2"
          />
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
