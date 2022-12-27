import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormNames } from 'enums/Validation';
import {
  cardInformationSchema,
  CardInformationValues,
} from 'pages/CartPage/BuyModal/validationSchemas';

import styles from './CardInformationForm.module.scss';
import { AmericanExpress, MasterCard, TemplateCard, Visa } from 'static';
import { getFormattedCardDate } from 'helpers/getFormattedCardDate';
import { getFormattedCardCode } from 'helpers/getFormattedCardCode';
import { getFormattedCardNumber } from 'helpers/getFormattedCardNumber';
import { useAppDispatch } from 'hooks/reduxHooks';
import { resetCartState } from 'handlers/cartSlice';
import { registerWithSetValue } from 'helpers/registerWithSetValue';

interface CardInformationProps {
  onSubmitClick: () => void;
}

const VISA_CHARS = {
  values: ['1', '4', '7'],
  component: <Visa />,
};
const MAST_CHARS = {
  values: ['2', '5', '8'],
  component: <MasterCard />,
};
const AMERICAN_EXPRESS_CHARS = {
  values: ['3', '6', '9'],
  component: <AmericanExpress />,
};

const getPaymentSystemComponent = (char: string) => {
  const system = [VISA_CHARS, MAST_CHARS, AMERICAN_EXPRESS_CHARS].find((item) =>
    item.values.includes(char),
  );
  return system?.component || <TemplateCard />;
};

const CardInformationForm: FC<CardInformationProps> = ({ onSubmitClick }) => {
  const [paymentSystem, setPaymentSystem] = useState<React.ReactNode>(<TemplateCard />);
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<CardInformationValues>({
    resolver: zodResolver(cardInformationSchema),
    mode: 'onTouched',
  });

  const onSubmit: SubmitHandler<CardInformationValues> = () => {
    dispatch(resetCartState());
    onSubmitClick();
  };

  return (
    <>
      <Typography sx={{ flex: '1 1 auto' }} variant="h4">
        Card details
      </Typography>
      <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          size="small"
          label="Card Number"
          error={!!errors?.cardNumber?.message}
          helperText={errors?.cardNumber?.message}
          InputProps={{
            endAdornment: paymentSystem,
          }}
          className={styles.cardNumber}
          {...registerWithSetValue({
            name: FormNames.CardNumber,
            register,
            setValue,
            formatterFunction: getFormattedCardNumber,
            callback: (value) => {
              setPaymentSystem(getPaymentSystemComponent(value[0]));
            },
          })}
        />
        <TextField
          size="small"
          label="Expiration Date"
          error={!!errors?.cardDate?.message}
          helperText={errors?.cardDate?.message}
          className={styles.cardDate}
          {...registerWithSetValue({
            name: FormNames.CardDate,
            register,
            setValue,
            formatterFunction: getFormattedCardDate,
          })}
        />
        <TextField
          size="small"
          label="CVV"
          error={!!errors?.cardCode?.message}
          helperText={errors?.cardCode?.message}
          className={styles.cardCode}
          {...registerWithSetValue({
            name: FormNames.CardCode,
            register,
            setValue,
            formatterFunction: getFormattedCardCode,
          })}
        />
        <Button className={styles.submitButton} type="submit" variant="outlined">
          Submit
        </Button>
      </form>
    </>
  );
};

export default CardInformationForm;
