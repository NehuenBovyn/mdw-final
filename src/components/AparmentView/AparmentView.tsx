import './AparmentView.css';

interface AparmentViewProps {
  name: string;
  phone: string;
  img: string;
}

const AparmentView = ({ img, name, phone }: AparmentViewProps) => {
  return (
    <>
      <div className="content-aparment">
        <div className="img-aparment">
          <img src={img} alt="aparment" />
        </div>
        <div className="info-aparment">
          <h3 className="name-deparment">{name}</h3>
          <button
            className="button-phone"
            onClick={() => window.open(`tel:${phone}`)}
          >
            <span className="material-icons">phone</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default AparmentView;
