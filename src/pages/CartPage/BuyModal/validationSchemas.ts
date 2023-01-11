import { FormNames } from 'enums/Validation';
import checkWords from 'helpers/checkWords';
import * as z from 'zod';

enum ValidationMessages {
  Required = 'This field is required',
  Name = 'Name is incorrect',
  PhoneNumber = 'Phone number is incorrect',
  Address = 'Address is incorrect',
  Email = 'E-mail is incorrect',
  CardNumber = 'Invalid Card Number',
  CardDate = 'Incorrect expiration date',
  CardCode = 'Incorrect CVV code',
}
export const personalInformationSchema = z.object({
  [FormNames.Name]: z
    .string()
    .min(1, { message: ValidationMessages.Required })
    .refine((value) => checkWords(value, 2, 3), { message: ValidationMessages.Name }),
  [FormNames.Phone]: z
    .string()
    .min(1, { message: ValidationMessages.Required })
    .regex(/^\+\d{9,}$/, {
      message: ValidationMessages.PhoneNumber,
    }),
  [FormNames.Address]: z
    .string()
    .min(1, { message: ValidationMessages.Required })
    .refine((value) => checkWords(value, 3, 5), { message: ValidationMessages.Address }),
  [FormNames.Email]: z
    .string()
    .min(1, { message: ValidationMessages.Required })
    .email({ message: ValidationMessages.Email }),
});

export const cardInformationSchema = z.object({
  [FormNames.CardNumber]: z
    .string()
    .min(1, { message: ValidationMessages.Required })
    .regex(/^(\d{4} ){3}\d{4}$/i, { message: ValidationMessages.CardNumber }),
  [FormNames.CardDate]: z
    .string()
    .min(1, { message: ValidationMessages.Required })
    .regex(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, { message: ValidationMessages.CardDate }),
  [FormNames.CardCode]: z
    .string()
    .min(1, { message: ValidationMessages.Required })
    .regex(/\d{3}/, { message: ValidationMessages.CardCode }),
});

export type PersonalInformationValues = z.infer<typeof personalInformationSchema>;

export type CardInformationValues = z.infer<typeof cardInformationSchema>;
