interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ children, onClick, disabled, ...props }: ButtonProps) => {
  return (
    <button
      className="flex w-1/2 md:w-1/4 flex-row gap-4 items-center rounded-lg px-2 py-1 bg-gray-200 dark:bg-(--dark-bg-quaternary) cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-300 active:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-200"
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
