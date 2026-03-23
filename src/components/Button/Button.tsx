interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({ children, onClick, disabled }: ButtonProps) => {
  return (
    <button
      className="flex w-1/2 md:w-1/4 flex-row gap-4 items-center rounded-lg px-2 py-1 bg-gray-200 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-300 active:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-200"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
