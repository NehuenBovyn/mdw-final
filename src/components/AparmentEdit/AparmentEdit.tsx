import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AparmentProps {
  id_apartment: string;
  building: string;
  m2: string;
  floor: string;
  cod: string;
  adress: string;
  description: string;
  phone: string;
  typeAction: string;
}

const AparmentEdit: React.FC<AparmentProps> = props => {
  const navigate = useNavigate();
  const {
    building,
    m2,
    floor,
    cod,
    adress,
    description,
    phone,
    typeAction,
    id_apartment,
  } = props;

  return (
    <div className="max-w-sm mx-auto border-4 border-primary rounded-lg shadow-lg overflow-hidden bg-secondary text-white">
      {/* Header */}
      <div className="bg-primary h-24 flex items-center justify-center">
        <h3 className="text-2xl font-bold">{building}</h3>
      </div>

      <div className="p-4  ">
        <p className="mb-2">
          <span className="font-semibold">Descripción:</span> {description}
        </p>
        <p className="mb-2 flex gap-2">
          <span className="font-semibold">m²:</span> {m2}
          <span className="font-semibold">Piso:</span> {floor}
          <span className="font-semibold">Cod:</span> {cod}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Ubicación:</span> {adress}
        </p>
      </div>

      <div className=" flex items-center justify-between">
        {typeAction === 'edit' ? (
          <button
            className="flex items-center gap-2 px-4 p-2  hover:bg-primary text-white rounded-md"
            onClick={() =>
              navigate('/edit-aparment', {
                state: { id_apartment: id_apartment },
              })
            }
          >
            <span className="material-icons">edit</span>
          </button>
        ) : (
          <button
            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
            onClick={() => window.open(`tel:${phone}`)}
          >
            <span className="material-icons">phone</span>
            Llamar
          </button>
        )}
      </div>
    </div>
  );
};

export default AparmentEdit;
