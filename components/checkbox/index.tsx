const Checkbox = (props: {
  id?: string;
  extra?: string;
  color?:
    | "red"
    | "blue"
    | "green"
    | "yellow"
    | "orange"
    | "teal"
    | "navy"
    | "lime"
    | "cyan"
    | "pink"
    | "purple"
    | "amber"
    | "indigo"
    | "gray";
  [x: string]: any;
}) => {
  const { extra, color, id, ...rest } = props;
  return (
    <input
      id={id}
      type="checkbox"
      className={`defaultCheckbox relative flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] appearance-none items-center 
      justify-center rounded-md border border-gray-300 text-white/0 outline-none transition duration-[0.2s]
      checked:border-none checked:text-white hover:cursor-pointer dark:border-white/10 ${
        color === "red"
          ? "checked:border-none checked:bg-blue-500 dark:checked:bg-blue-400"
          : color === "blue"
          ? "checked:border-none checked:bg-blue-500 dark:checked:bg-blue-400"
          : color === "green"
          ? "checked:border-none checked:bg-blue-500 dark:checked:bg-blue-400"
          : color === "yellow"
          ? "checked:border-none checked:bg-blue-500 dark:checked:bg-blue-400"
          : color === "orange"
          ? "checked:border-none checked:bg-blue-500 dark:checked:bg-blue-400"
          : color === "teal"
          ? "checked:border-none checked:bg-blue-500 dark:checked:bg-blue-400"
          : color === "navy"
          ? "checked:border-none checked:bg-navy-500 dark:checked:bg-navy-400"
          : color === "lime"
          ? "checked:border-none checked:bg-blue-500 dark:checked:bg-blue-400"
          : color === "cyan"
          ? "checked:border-none checked:bg-blue-500 dark:checked:bg-blue-400"
          : color === "pink"
          ? "checked:border-none checked:bg-blue-500 dark:checked:bg-blue-400"
          : color === "purple"
          ? "checked:border-none checked:bg-blue-500 dark:checked:bg-blue-400"
          : color === "amber"
          ? "checked:border-none checked:bg-blue-500 dark:checked:bg-blue-400"
          : color === "indigo"
          ? "checked:border-none checked:bg-blue-500 dark:checked:bg-blue-400"
          : color === "gray"
          ? "checked:border-none checked:bg-gray-500 dark:checked:bg-gray-400"
          : "checked:bg-brand-500 dark:checked:bg-brand-400"
      } ${extra}`}
      name="weekly"
      {...rest}
    />
  );
};

export default Checkbox;