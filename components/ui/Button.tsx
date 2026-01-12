type Props = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
};

export default function Button({
  children,
  type = "button",
  onClick,
  className,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded text-white ${
        className || "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {children}
    </button>
  );
}
