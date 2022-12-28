import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField, Typography } from '@mui/material';
import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  personalInformationSchema,
  PersonalInformationValues,
} from 'pages/CartPage/BuyModal/validationSchemas';

import styles from './PersonalInformationForm.module.scss';
import { FormNames } from 'enums/Validation';

interface PersonalInformationProps {
  onNextClick: () => void;
}

const PersonalInformationForm: FC<PersonalInformationProps> = ({ onNextClick }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<PersonalInformationValues>({
    resolver: zodResolver(personalInformationSchema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<PersonalInformationValues> = () => {
    onNextClick();
  };

  return (
    <>
      <Typography variant="h4">Personal details</Typography>
      <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="First and last name"
          error={!!errors?.name?.message}
          helperText={errors?.name?.message}
          {...register(FormNames.Name)}
        />
        <TextField
          label="Phone Number"
          error={!!errors?.phoneNumber?.message}
          helperText={errors?.phoneNumber?.message}
          {...register(FormNames.Phone)}
        />
        <TextField
          label="Address"
          error={!!errors?.address?.message}
          helperText={errors?.address?.message}
          {...register(FormNames.Address)}
        />
        <TextField
          label="E-Mail"
          error={!!errors?.eMail?.message}
          helperText={errors?.eMail?.message}
          {...register(FormNames.Email)}
        />

        <Button
          type="submit"
          variant="outlined"
          className={styles.submitButton}
          disabled={!isValid}
        >
          Next
        </Button>
      </form>
    </>
  );
};

export default PersonalInformationForm;
