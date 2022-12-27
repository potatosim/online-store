import {
  FieldPath,
  FieldPathValue,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

export const registerWithSetValue = <V extends FieldValues, N extends FieldPath<V>>({
  name,
  register,
  setValue,
  formatterFunction,
  options,
  callback,
}: {
  name: N;
  register: UseFormRegister<V>;
  setValue: UseFormSetValue<V>;
  formatterFunction: (value: string) => FieldPathValue<V, N>;
  options?: RegisterOptions<V, N>;
  callback?: (value: string) => void;
}) => {
  return register(name, {
    ...options,
    onChange(e: React.ChangeEvent<HTMLInputElement>) {
      const formattedValue = formatterFunction(e.target.value);
      setValue(name, formattedValue);
      callback?.(formattedValue);
    },
  });
};
