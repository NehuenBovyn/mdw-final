import { AparmentData } from '../../services/aparment';
import './AparmentView.css';

interface AparmentViewProps {
  name: string;
  phone: string;
  img: string;
  aparment: AparmentData;
}

const AparmentView = ({ img, name, phone }: AparmentViewProps) => {
  return (
    <>
      <div className="content-aparment">
        <h3 className="name-deparment">{name}</h3>
        <button
          className="button-phone"
          onClick={() => window.open(`tel:${phone}`)}
        >
          <span className="material-icons">phone</span>
        </button>
      </div>
    </>
  );
};

export default AparmentView;
