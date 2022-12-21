import React from 'react';
import styles from './Header.module.scss';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';
import logo from 'static/assets/logo.png';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img className={styles.logo__img} src={logo} />
        <h2 className={styles.logo__text}>Online Store</h2>
      </div>
      <p className={styles.total}>
        <span className={styles.total__text}>Cart total: </span>
        <span className={styles.total__price}>€{'0.00'}</span>
      </p>
      <IconButton onClick={() => navigate('/cart')}>
        <Badge badgeContent={0} color="warning" overlap="circular" showZero>
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
