import { IconButton, Paper, Typography } from '@mui/material';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { FC } from 'react';
import percentageFormatter from 'helpers/percentageFormatter';
import { PromoCode } from 'types/PromoCode';

import styles from './AddPromoCode.module.scss';

interface AddPromoCodeProps {
  promoCode: PromoCode;
  onAddClick: () => void;
}

const AddPromoCode: FC<AddPromoCodeProps> = ({ onAddClick, promoCode }) => {
  return (
    <Paper className={styles.promoWrapper}>
      <Typography textTransform="uppercase">{promoCode.name}</Typography>
      <Typography textTransform="uppercase">
        {percentageFormatter.format(-promoCode.discount)}
      </Typography>
      <IconButton onClick={onAddClick}>
        <AddCircleOutlineIcon />
      </IconButton>
    </Paper>
  );
};

export default AddPromoCode;
