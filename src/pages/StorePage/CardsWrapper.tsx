import React, { useState } from 'react';

import { Button } from '@mui/material';
import { CardsLayout } from 'enums/CardsLayout';
import ComponentWithChildren from 'types/ComponentWithChildren';
import clsx from 'clsx';

import styles from './CardsWrapper.module.scss';

const CardsWrapper = ({ children }: ComponentWithChildren) => {
  const [cardsLayout, setCardsLayout] = useState<CardsLayout>(CardsLayout.First);

  return (
    <>
      <Button onClick={() => setCardsLayout(CardsLayout.First)}>First</Button>
      <Button onClick={() => setCardsLayout(CardsLayout.Second)}>Second</Button>
      <div
        className={clsx(
          styles.mainWrapper,
          cardsLayout === CardsLayout.First ? styles.first : styles.second,
        )}
      >
        {children}
      </div>
    </>
  );
};

export default CardsWrapper;
