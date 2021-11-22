import { useTheme } from "next-themes";

const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();

  const getNextTheme = (): string => {
    if (theme === "dark") return "light";
    if (theme === "light") return "dark";

    return "light";
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
          case "light":
            return <span className="text-xl">&#127765;</span>;
          default:
            return "light";
        }
      })()}
    </button>
  );
};

export default ToggleTheme;
