import { useEffect, useState } from 'react';
import AparmentEdit from '../../components/AparmentEdit/AparmentEdit';
import ButtonBack from '../../components/ButtonBack/ButtonBack';
import { AparmentData, getAllAparments } from '../../services/aparment';
import './deplibres.css';
const DepLibres = () => {
  const [aparments, setAparments] = useState<AparmentData[]>([]);

  useEffect(() => {
    const fetchAparments = async () => {
      try {
        const aparments = await getAllAparments();
        setAparments(aparments);
      } catch (error) {
        console.error('Error fetching aparments:', error);
      }
    };
    fetchAparments();
  }, []);

  return (
    <>
      <div className="page-dep-libres">
        <div className="button-back">
          <ButtonBack />
        </div>
        <div className="header-dep-libres">
          <h1 className="title-page">Departamentos disponibles</h1>
        </div>

        <div className="container-dep-libres">
          {aparments.map(aparment => (
            <AparmentEdit
              key={aparment.id_apartment}
              typeAction="view"
              id_apartment={aparment.id_apartment}
              building={aparment.building}
              cod={aparment.cod}
              adress={aparment.adress}
              description={aparment.description}
              phone={aparment.phone}
              m2={aparment.m2}
              email={aparment.email}
              floor={aparment.floor}
              free={aparment.free}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DepLibres;
