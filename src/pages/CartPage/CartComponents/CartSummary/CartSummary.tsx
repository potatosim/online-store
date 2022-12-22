import { Button, Card, CardContent, IconButton, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import AddPromoCode from './AddPromoCode/AddPromoCode';
import AddedPromoCodes from './AddedPromoCodes/AddedPromoCodes';
import ClearIcon from '@mui/icons-material/Clear';
import PageHeader from 'components/PageHeader';
import { PromoCode } from 'types/PromoCode';
import currencyFormatter from 'helpers/currencyFormatter';
import { useAppSelector } from 'hooks/reduxHooks';

import styles from './CartSummary.module.scss';

const promoCodes: PromoCode[] = [
  { name: 'hanna', discount: 0.1 },
  { name: 'leon', discount: 0.1 },
];

const CartSummary = () => {
  const { totalPrice, totalCount } = useAppSelector((state) => state.cart);
  const [promo, setPromo] = useState('');
  const [matchedPromo, setMatchedPromo] = useState<PromoCode | null>(null);
  const [addedPromoCodes, setAddedPromoCodes] = useState<PromoCode[]>([]);
  const [error, setError] = useState<string>('');
  const [discountPrice, setDiscountPrice] = useState<number | null>(null);

  useEffect(() => {
    if (addedPromoCodes.length) {
      setDiscountPrice(
        totalPrice * (1 - addedPromoCodes.reduce((acc, cur) => acc + cur.discount, 0)),
      );
    } else {
      setDiscountPrice(null);
    }
  }, [addedPromoCodes, totalPrice]);

  useEffect(() => {
    const matched = promoCodes.filter((item) => item.name === promo.toLowerCase());
    const isAddedPromo = addedPromoCodes.some((addedPromo) => addedPromo.name === promo);
    if (matched.length && !isAddedPromo) {
      setMatchedPromo(matched[0]);
    } else {
      setMatchedPromo(null);
    }
    if (isAddedPromo) {
      setError(`Promo - ${promo.toUpperCase()} is already applied`);
    } else {
      setError('');
    }
  }, [promo]);

  const handleChangePromoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromo(e.target.value);
  };

  const handleAddPromoCode = () => {
    if (matchedPromo) {
      setAddedPromoCodes([...addedPromoCodes, matchedPromo]);
      setPromo('');
      setMatchedPromo(null);
    }
  };

  const handleDeletePromoCode = (promoCode: PromoCode) => {
    setAddedPromoCodes(
      addedPromoCodes.filter((addedPromoCode) => promoCode.name !== addedPromoCode.name),
    );
  };

  return (
    <Card elevation={8} className={styles.summaryWrapper}>
      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', rowGap: '1rem', alignItems: 'center' }}
      >
        <PageHeader variant="h2">Summary</PageHeader>
        <Typography variant="h4">Products:{totalCount}</Typography>
        <Typography
          sx={{
            textDecoration: discountPrice ? 'line-through' : 'unset',
          }}
          variant="h4"
        >
          Total:{currencyFormatter.format(totalPrice)}
        </Typography>
        {discountPrice && (
          <Typography variant="h4">{currencyFormatter.format(discountPrice)}</Typography>
        )}
        <AddedPromoCodes promoCodes={addedPromoCodes} onDeleteClick={handleDeletePromoCode} />
        <TextField
          color="warning"
          label="Enter promo code"
          helperText={error}
          value={promo}
          onChange={handleChangePromoInput}
          error={!!error}
          InputProps={{
            endAdornment: promo.length ? (
              <IconButton onClick={() => setPromo('')}>
                <ClearIcon />
              </IconButton>
            ) : null,
          }}
        />
        {matchedPromo && <AddPromoCode promoCode={matchedPromo} onAddClick={handleAddPromoCode} />}
        <Button color="warning">Buy now</Button>
      </CardContent>
    </Card>
  );
};

export default CartSummary;
