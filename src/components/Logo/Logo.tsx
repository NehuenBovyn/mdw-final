interface LogoProps {
  width?: string;
  height?: string;
}

const Logo = ({ width = '150px', height = 'auto' }: LogoProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M491.375 0 243.319 295.118 500.928 599.71H259.464L.397 295.118 252.865 0h238.51Z"
        fill="#CD9619"
      />
      <path
        d="m356.342 303.723 74.131-90.342 169.527.862-157.794 187.573-85.864-98.093Z"
        fill="#CD9619"
      />
      <path
        d="m243.922 295 257.609 304.593H260.067L1 295h242.922Z"
        fill="#3E4144"
      />
    </svg>
  );
};

export default Logo;
