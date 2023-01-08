import React from 'react';

import { CardsLayout } from 'enums/CardsLayout';
import ComponentWithChildren from 'types/ComponentWithChildren';
import clsx from 'clsx';

import styles from './CardsWrapper.module.scss';

interface CardsWrapperProps extends ComponentWithChildren {
  cardsLayout: CardsLayout;
}

const CardsWrapper = ({ children, cardsLayout }: CardsWrapperProps) => {
  return (
    <div
      className={clsx(
        styles.mainWrapper,
        cardsLayout === CardsLayout.First ? styles.first : styles.second,
      )}
    >
      {children}
    </div>
  );
};

export default CardsWrapper;
