const CardIcon = () => {
  return (
    <svg
      height={55}
      viewBox="0 0 512 512"
      width={55}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        fill="none"
        height={320}
        rx={56}
        ry={56}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        width={416}
        x={48}
        y={96}
      />
      <path
        d="M48 192h416M128 300h48v20h-48z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth={60}
      />
    </svg>
  );
};

export default CardIcon;
