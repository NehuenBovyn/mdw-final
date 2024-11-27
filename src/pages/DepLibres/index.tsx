import AparmentView from '../../components/AparmentView/AparmentView';
import ButtonBack from '../../components/ButtonBack/ButtonBack';
import './deplibres.css';
const DepLibres = () => {
  return (
    <>
      <div className="page-dep-libres">
        <div className="header-dep-libres">
          <div className="button-back">
            <ButtonBack />
          </div>
          <h1 className="title-page">Departamentos disponibles</h1>
        </div>
        <div className="flex justify-center">
          <AparmentView
            img="https://imgar.zonapropcdn.com/avisos/resize/1/00/53/53/29/50/1200x1200/1908473299.jpg?"
            name="Departamento 1"
            phone="123456789"
          />
        </div>
      </div>
    </>
  );
};

export default DepLibres;
