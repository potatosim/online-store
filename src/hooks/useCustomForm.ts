import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

export const useCustomForm = <S extends z.ZodSchema>(schema: S) => {
  const {
    register,
    formState: { errors, isValid, touchedFields },
    handleSubmit,
    trigger,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const customRegister = (fieldName: string) => {
    // @ts-ignore
    return register(fieldName, {
      onChange() {
        // @ts-ignore
        if (touchedFields[fieldName]) {
          // @ts-ignore
          trigger(fieldName);
        }
      },
    });
  };

  return {
    errors,
    isValid,
    handleSubmit,
    customRegister,
  };
};
