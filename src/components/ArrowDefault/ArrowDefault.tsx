interface ArrowDefaultProps {
  width?: string;
  height?: string;
  color?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const ArrowDefault = ({
  width,
  height,
  color,
  position,
}: ArrowDefaultProps) => {
  return (
    <svg
      width={width || '44'}
      height={height || '49'}
      viewBox="0 0 44 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform:
          position === 'top'
            ? 'rotate(-90deg)'
            : position === 'bottom'
            ? 'rotate(90deg)'
            : position === 'left'
            ? 'rotate(180deg)'
            : 'none',
      }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="m.84 0 21.805 24.113L0 49h21.226L44 24.113 21.806 0H.84Z"
        fill={color || '#3E4144'}
      />
    </svg>
  );
};

export default ArrowDefault;
