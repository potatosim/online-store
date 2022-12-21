import React from 'react';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import SentimentVeryDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentVeryDissatisfiedOutlined';
import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.typographyWrapper}>
        <Typography
          fontWeight={500}
          fontSize="10rem"
          variant="h1"
          sx={{
            background: 'linear-gradient(to right,#f2580e 0,#f2ca0f 50%,#f2580e 100%)',
            backgroundClip: 'text',
            webkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          404
        </Typography>
        <Typography
          variant="h2"
          fontSize="5rem"
          fontWeight={500}
          sx={{
            color: 'white',
          }}
        >
          Page n
          <SentimentVeryDissatisfiedOutlinedIcon style={{ minWidth: '3rem', minHeight: '3rem' }} />t
          found
        </Typography>
      </div>
      <Button
        onClick={() => navigate('/')}
        variant="text"
        color="warning"
        size="large"
        sx={{
          fontSize: '1.5rem',
          ':hover': {
            backgroundColor: 'rgb(242, 88, 14, 0.2)',
          },
        }}
      >
        Back to the store
      </Button>
    </div>
  );
};

export default NotFoundPage;
