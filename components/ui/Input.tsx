type Props = {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
};

export default function Input({
  label,
  name,
  type = "text",
  defaultValue,
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        className="border p-2 rounded w-full"
      />
    </div>
  );
}
