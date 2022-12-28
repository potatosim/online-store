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
    mode: 'onBlur',
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
          {...register(FormNames.CardNumber, {
            onChange(e: React.ChangeEvent<HTMLInputElement>) {
              const cardNumber = getFormattedCardNumber(e.target.value);
              setValue(FormNames.CardNumber, cardNumber);
              setPaymentSystem(getPaymentSystemComponent(cardNumber[0]));
            },
          })}
        />
        <TextField
          size="small"
          label="Expiration Date"
          error={!!errors?.cardDate?.message}
          helperText={errors?.cardDate?.message}
          className={styles.cardDate}
          {...register(FormNames.CardDate, {
            onChange(e: React.ChangeEvent<HTMLInputElement>) {
              setValue(FormNames.CardDate, getFormattedCardDate(e.target.value));
            },
          })}
        />
        <TextField
          size="small"
          label="CVV"
          error={!!errors?.cardCode?.message}
          helperText={errors?.cardCode?.message}
          className={styles.cardCode}
          {...register(FormNames.CardCode, {
            onChange(e: React.ChangeEvent<HTMLInputElement>) {
              setValue(FormNames.CardCode, getFormattedCardCode(e.target.value));
            },
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
