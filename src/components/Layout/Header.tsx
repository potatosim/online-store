import { Badge } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import currencyFormatter from 'helpers/currencyFormatter';
import logo from 'static/assets/logo.png';
import { useAppSelector } from 'hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';

const Header = () => {
  const navigate = useNavigate();
  const { totalPrice, totalCount } = useAppSelector((state) => state.cart);

  return (
    // TODO: refactor this code in future (add components instead of tags and use styled())
    <header className={styles.header}>
      <div className={styles.logo}>
        <img className={styles.logoImg} src={logo} />
        <h2 className={styles.logoText}>Online Store</h2>
      </div>
      <p className={styles.total}>
        <span className={styles.totalText}>Cart total: </span>
        <span className={styles.totalPrice}>{currencyFormatter.format(totalPrice)}</span>
      </p>
      <IconButton onClick={() => navigate('/cart')}>
        <Badge badgeContent={totalCount} color="warning" overlap="circular" showZero>
          <ShoppingCartIcon
            sx={{
              color: 'orange',
              width: 45,
              height: 45,
              cursor: 'pointer',
            }}
          />
        </Badge>
      </IconButton>
    </header>
  );
};

export default Header;
