import { IoSettingsOutline } from "react-icons/io5";

interface HeaderProps {
  setGoalsOpen: (value: boolean) => void;
}

const Header = ({ setGoalsOpen }: HeaderProps) => {
  return (
    <section className="flex justify-between align-center w-full bg-(--bg-secondary) rounded-2xl py-4 px-6 shadow-md text-shadow-sm">
      <h1 className="text-2xl font-bold">Ceres</h1>

      <div className="flex flex-row gap-6">
        <IoSettingsOutline
          size={24}
          className="hover:cursor-pointer"
          onClick={() => setGoalsOpen(true)}
        />
        <h2>Theme</h2>
      </div>
    </section>
  );
};

export default Header;
