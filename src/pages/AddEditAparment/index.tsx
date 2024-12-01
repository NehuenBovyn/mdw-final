import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ButtonBack from '../../components/ButtonBack/ButtonBack';
import { Notify } from '../../components/Notification/Notification';
import {
  createAparment,
  deleteAparment,
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
          setm2(aparmentData.m2.toString());
          setFloor(aparmentData.floor.toString());
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteApartment = async () => {
    try {
      console.log('id_apartment:APARMEEEEENT', id_apartment);
      await deleteAparment(id_apartment);
      setIsModalOpen(false);
      Notify({
        message: 'Apartamento eliminado con éxito',
        type: 'success',
      });
      navigate('/my-aparments');
    } catch (error) {
      Notify({
        message: 'Error al eliminar el apartamento: ' + error,
        type: 'error',
      });
    }
  };

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
          m2: Number(m2),
          floor: Number(floor),
          cod: codAparment,
          description,
          building: nameBuilding,
          phone: '',
          email: '',
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
          m2: Number(m2),
          floor: Number(floor),
          cod: codAparment,
          description,
          building: nameBuilding,
          phone: '',
          email: '',
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
              type="number"
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
            className="mt-2 w-full flex items-center justify-center bg-primary text-white py-2 rounded-lg hover:bg-tertiary disabled:opacity-50"
          >
            <span className="material-icons">save</span>
            {loading ? 'Guardando...' : 'Guardar departamento'}
          </button>
          {typeAction === 'edit' && (
            <button
              className="flex items-center gap-2 px-4 p-2 justify-center bg-red-600 hover:bg-red-300 text-center text-white rounded-md"
              onClick={() => setIsModalOpen(true)}
            >
              <span className="material-icons">delete</span>
              Eliminar departamento
            </button>
          )}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 text-black max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Confirmar eliminación</h3>
            <p>¿Estás seguro de que deseas eliminar este apartamento?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={deleteApartment}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditAddAparment;
