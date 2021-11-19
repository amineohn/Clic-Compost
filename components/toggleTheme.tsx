import { useTheme } from "next-themes";

const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();

  const getNextTheme = (): string => {
    if (theme === "dark") return "light";
    if (theme === "light") return "system";
    return "dark";
  };

  return (
    <button
      type="button"
      className="w-10 h-10"
      onClick={() => setTheme(getNextTheme())}
    >
      {(() => {
        switch (theme) {
          case "dark":
            return <span className="text-xl">&#127762;</span>;
          default:
            return "dark";
        }
      })()}
    </button>
  );
};

export default ToggleTheme;
