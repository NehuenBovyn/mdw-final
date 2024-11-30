import { getAuth, updateEmail, updatePassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Notify } from '../../components/Notification/Notification';
import { getUserID, updateUser } from '../../services/user';

const Profile = () => {
  const auth = getAuth();
  const userFirebase = auth.currentUser;

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (userFirebase) {
        const userData = await getUserID(userFirebase.uid);
        setEmail(userData.email);
        setName(userData.name);
        setPhone(userData.phone);
      }
    };

    fetchUser();
  }, [userFirebase]);

  const handleUpdateProfile = async () => {
    if (!name || !email || !phone) {
      Notify({
        message: 'Por favor, completa todos los campos.',
        type: 'error',
      });
      return;
    }
    setLoading(true);
    try {
      if (!userFirebase) {
        throw new Error('User is not authenticated');
      }
      const dataUser = { name, email, phone, firebase_id: userFirebase.uid };

      if (userFirebase) {
        await updateEmail(userFirebase, email);
      } else {
        throw new Error('User is not authenticated');
      }
      await updateUser(dataUser);
      Notify({
        message: 'Perfil actualizado correctamente.',
        type: 'success',
      });
    } catch (error: any) {
      Notify({
        message: `Error al actualizar el perfil: ${error.message}`,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!newPassword) return;
    setLoading(true);
    try {
      if (userFirebase) {
        await updatePassword(userFirebase, newPassword);
      } else {
        throw new Error('User is not authenticated');
      }
      Notify({
        message: 'Contraseña actualizada correctamente.',
        type: 'success',
      });
    } catch (error: any) {
      Notify({
        message: `Error al actualizar la contraseña: ${error.message}`,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-">
      <h2 className="text-2xl font-bold mb-6">Editar Perfil</h2>
      <div className="mb-4">
        <label className="block text-secondary">Nombre:</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <label className="block text-gray-700">Correo Electrónico:</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <label className="block text-gray-700">Telefono:</label>
        <input
          type="text"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={handleUpdateProfile}
          disabled={loading}
          className="mt-2 w-full bg-primary text-white py-2 rounded-lg hover:bg-tertiary disabled:opacity-50"
        >
          {loading ? 'Guardando...' : 'Actualizar Perfil'}
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Nueva Contraseña:</label>
        <input
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={handleUpdatePassword}
          disabled={loading}
          className="mt-2 w-full bg-primary text-white py-2 rounded-lg hover:bg-tertiary disabled:opacity-50"
        >
          {loading ? 'Guardando...' : 'Actualizar Contraseña'}
        </button>
      </div>
    </div>
  );
};

export default Profile;
