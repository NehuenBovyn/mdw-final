import ArrowDefault from '../ArrowDefault/ArrowDefault';
import './ButtonBack.css';

const routeBack = () => {
  window.history.back();
};

const ButtonBack = () => {
  return (
    <>
      <button className=" btn-container-back  text-white" onClick={routeBack}>
        <ArrowDefault position="left" color={'#ffff'} width="20" height="35" />
        Atrás
      </button>
    </>
  );
};

export default ButtonBack;
