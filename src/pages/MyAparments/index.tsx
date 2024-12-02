import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AparmentEdit from '../../components/AparmentEdit/AparmentEdit';
import ButtonRedirect from '../../components/ButtonRedirect/ButtonRedirect';
import { getAparmentByUser } from '../../services/aparment';
import './MyAparments.css';

interface AparmentData {
  id_apartment: string;
  firebase_id: string;
  adress: string;
  m2: number;
  floor: number;
  cod: string;
  description: string;
  building: string;
  phone: string;
  email: string;
  free: boolean;
}

const MyAparments = () => {
  const navigate = useNavigate();
  const [aparments, setAparments] = useState<AparmentData[]>([]);

  useEffect(() => {
    const fetchAparments = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        const aparmentsData = await getAparmentByUser(userId);
        setAparments(aparmentsData);
      }
    };

    fetchAparments();
  }, []);

  return (
    <div className="my-aparments-container">
      <div className="header">
        <ButtonRedirect
          label="Agregar un departamento"
          onClick={() => navigate('/add-aparment')}
          colorType="type1"
        />
      </div>
      <div className="aparments-list">
        {aparments.map(aparment => (
          <AparmentEdit
            key={aparment.id_apartment}
            id_apartment={aparment.id_apartment}
            building={aparment.building}
            m2={aparment.m2}
            floor={aparment.floor}
            cod={aparment.cod}
            adress={aparment.adress}
            description={aparment.description}
            phone={aparment.phone}
            email={aparment.email}
            free={aparment.free}
            typeAction="edit"
          />
        ))}
      </div>
    </div>
  );
};

export default MyAparments;
