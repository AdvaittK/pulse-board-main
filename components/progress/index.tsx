const Progress = (props: {
  value: number;
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
  width?: string;
}) => {
  const { value, color, width } = props;
  return (
    <div
      className={`h-2 ${
        width ? width : "w-full"
      } rounded-full bg-gray-200 dark:bg-navy-700`}
    >
      <div
        className={`flex h-full items-center justify-center rounded-full ${
          color === "red"
            ? "bg-blue-500 dark:bg-blue-400"
            : color === "blue"
            ? "bg-blue-500 dark:bg-blue-400"
            : color === "green"
            ? "bg-blue-500 dark:bg-blue-400"
            : color === "yellow"
            ? "bg-blue-500 dark:bg-blue-400"
            : color === "orange"
            ? "bg-blue-500 dark:bg-blue-400"
            : color === "teal"
            ? "bg-blue-500 dark:bg-blue-400"
            : color === "navy"
            ? "bg-navy-500 dark:bg-navy-400"
            : color === "lime"
            ? "bg-blue-500 dark:bg-blue-400"
            : color === "cyan"
            ? "bg-blue-500 dark:bg-blue-400"
            : color === "pink"
            ? "bg-blue-500 dark:bg-blue-400"
            : color === "purple"
            ? "bg-blue-500 dark:bg-blue-400"
            : color === "amber"
            ? "bg-blue-500 dark:bg-blue-400"
            : color === "indigo"
            ? "bg-blue-500 dark:bg-blue-400"
            : color === "gray"
            ? "bg-gray-500 dark:bg-gray-400"
            : "bg-brand-500 dark:bg-brand-400"
        }`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export default Progress;