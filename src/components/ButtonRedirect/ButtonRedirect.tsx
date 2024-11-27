import ArrowDefault from '../ArrowDefault/ArrowDefault';
import './ButtonRedirect.css';

interface ButtonRedirectProps {
  label: string;
  onClick: () => void;
  colorType: 'type1' | 'type2';
}

const ButtonRedirect = ({ label, onClick, colorType }: ButtonRedirectProps) => {
  const colorBg = colorType === 'type1' ? 'bg-[#CD9619]' : 'bg-[#3E4144]';
  const colorArrow = colorType === 'type1' ? '#3E4144' : '#CD9619';

  return (
    <>
      <div className={`btn-container  ${colorBg}`}>
        <button className="button  text-white" onClick={onClick}>
          {label}
        </button>
        <ArrowDefault position="right" color={colorArrow} />
      </div>
    </>
  );
};

export default ButtonRedirect;
