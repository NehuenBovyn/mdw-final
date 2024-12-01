import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ButtonBack from '../../components/ButtonBack/ButtonBack';
import { Notify } from '../../components/Notification/Notification';
import {
  createAparment,
  getAparmentById,
  updateAparment,
} from '../../services/aparment';

interface EditAddAparmentProps {
  typeAction: string;
}

const EditAddAparment: React.FC<EditAddAparmentProps> = ({ typeAction }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id_apartment } = location.state || {};
  console.log('id_aparment: ADDEDITAPARMENT', id_apartment);

  const [nameBuilding, setnameBuilding] = useState('');
  const [m2, setm2] = useState('');
  const [floor, setFloor] = useState('');
  const [codAparment, setCodAparment] = useState('');
  const [adress, setAdress] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const firebaseId = getAuth().currentUser?.uid || '';

  useEffect(() => {
    if (typeAction === 'edit') {
      const fetchAparment = async () => {
        try {
          const aparmentData = await getAparmentById(id_apartment);
          setnameBuilding(aparmentData.building);
          setm2(aparmentData.m2);
          setFloor(aparmentData.floor);
          setCodAparment(aparmentData.cod);
          setAdress(aparmentData.adress);
          setDescription(aparmentData.description);
        } catch (error: any) {
          Notify({
            message: `Error al obtener el departamento: ${error.message}`,
            type: 'error',
          });
        }
      };
      fetchAparment();
    }
  }, [typeAction]);

  const handleAddEditAparment = async () => {
    if (!nameBuilding || !m2 || !floor || !codAparment || !adress) {
      Notify({
        message: 'Por favor, completa todos los campos requeridos.',
        type: 'error',
      });
      return;
    }
    setLoading(true);
    try {
      if (typeAction === 'add') {
        await createAparment({
          id_apartment: '',
          firebase_id: firebaseId,
          adress,
          m2,
          floor,
          cod: codAparment,
          description,
          building: nameBuilding,
        });
        Notify({
          message: 'Departamento agregado correctamente.',
          type: 'success',
        });
        navigate('/my-aparments');
      } else {
        await updateAparment({
          id_apartment: '',
          firebase_id: firebaseId,
          adress,
          m2,
          floor,
          cod: codAparment,
          description,
          building: nameBuilding,
        });
        Notify({
          message: 'Departamento editado correctamente.',
          type: 'success',
        });
        navigate('/my-aparments');
      }
    } catch (error: any) {
      Notify({
        message: `Error al guardar el departamento: ${error.message}`,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ButtonBack />
      <div className="max-w-lg mx-auto mt-10 p-">
        <div className="mb-4 gap-2 flex flex-col">
          <div>
            <label className="block text-secondary">
              Nombre de edificio: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={nameBuilding}
              onChange={e => setnameBuilding(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-secondary">
              Direccion: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={adress}
              onChange={e => setAdress(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex  items-center  gap-2">
            <label className="block text-gray-700">m2:</label>
            <span className="text-red-500">*</span>
            <input
              type="number"
              value={m2}
              onChange={e => setm2(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <label className="block text-gray-700">Piso:</label>
            <span className="text-red-500">*</span>
            <input
              type="text"
              value={floor}
              onChange={e => setFloor(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <label className="block text-gray-700">Código:</label>
            <span className="text-red-500">*</span>
            <input
              type="text"
              value={codAparment}
              onChange={e => setCodAparment(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-gray-700">Descripción:</label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            onClick={handleAddEditAparment}
            disabled={loading}
            className="mt-2 w-full bg-primary text-white py-2 rounded-lg hover:bg-tertiary disabled:opacity-50"
          >
            {loading ? 'Guardando...' : 'Guardar departamento'}
          </button>
        </div>
      </div>
    </>
  );
};

export default EditAddAparment;
