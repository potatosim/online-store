import { Chip, Paper } from '@mui/material';

import { FC } from 'react';
import PageHeader from 'components/PageHeader';
import percentageFormatter from 'helpers/percentageFormatter';
import { PromoCode } from 'types/PromoCode';

import styles from './AddedPromoCodes.module.scss';

interface AddedPromoCodesProps {
  promoCodes: PromoCode[];
  onDeleteClick: (promoCode: PromoCode) => void;
}

const AddedPromoCodes: FC<AddedPromoCodesProps> = ({ promoCodes, onDeleteClick }) => {
  if (!promoCodes.length) {
    return null;
  }

  return (
    <Paper className={styles.addedPromoWrapper}>
      <PageHeader variant="h6">Applied promo codes:</PageHeader>
      {promoCodes.map((item, index) => (
        <Chip
          key={index + 1}
          label={`${item.name.toUpperCase()} ${percentageFormatter.format(-item.discount)}`}
          variant="outlined"
          onDelete={() => onDeleteClick(item)}
        ></Chip>
      ))}
    </Paper>
  );
};

export default AddedPromoCodes;
