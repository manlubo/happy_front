import { UseFormRegisterReturn } from "react-hook-form";

type RadioOption<T extends string> = {
  label: string;
  value: T;
};

type RadioProps<TValue extends string> = {
  value?: TValue;
  options: RadioOption<TValue>[];
  register: UseFormRegisterReturn;
};

// 공용 라디오 컴포넌트
export default function Radio<TValue extends string>({
  value,
  options,
  register,
}: RadioProps<TValue>) {
  return (
    <div className="flex rounded-md border border-gray-300 overflow-hidden">
      {options.map((option) => {
        const checked = value === option.value;

        return (
          <label
            key={option.value}
            className={`
              flex-1 py-3 text-center cursor-pointer
              font-medium transition-colors rounded
              ${
                checked
                  ? "bg-blue-400 text-white"
                  : "bg-white text-gray-500 hover:bg-gray-100"
              }
            `}
          >
            <input
              type="radio"
              value={option.value}
              className="hidden"
              {...register}
            />
            {option.label}
          </label>
        );
      })}
    </div>
  );
}
