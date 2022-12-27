import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';

import CardInformationForm from './CardInformationForm/CardInformationForm';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import PersonalInformationForm from './PersonalInformationForm/PersonalInformationForm';
import SuccessValidation from './SuccessValidation/SuccessValidation';
import { setIsBuyNow } from 'handlers/cartSlice';

import styles from './BuyModal.module.scss';

enum BuyModalStep {
  PersonalInformation = 'personalInformation',
  CardInformation = 'cardInformation',
  SuccessValidationStep = 'successValidation',
}

const BuyModal = () => {
  const [buyModalStep, setBuyModalStep] = useState<BuyModalStep>(BuyModalStep.PersonalInformation);
  const { isBuyNow } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setIsBuyNow(false));
    setBuyModalStep(BuyModalStep.PersonalInformation);
  };

  const getFormComponent = () => {
    switch (buyModalStep) {
      case BuyModalStep.PersonalInformation:
        return (
          <PersonalInformationForm
            onNextClick={() => setBuyModalStep(BuyModalStep.CardInformation)}
          />
        );
      case BuyModalStep.CardInformation:
        return (
          <CardInformationForm
            onSubmitClick={() => setBuyModalStep(BuyModalStep.SuccessValidationStep)}
          />
        );
      default:
        return <SuccessValidation />;
    }
  };

  if (!isBuyNow) {
    return null;
  }

  return (
    <Modal open={isBuyNow} onClose={handleClose} className={styles.modalWrapper}>
      <Paper className={styles.paper}>{getFormComponent()}</Paper>
    </Modal>
  );
};

export default BuyModal;
