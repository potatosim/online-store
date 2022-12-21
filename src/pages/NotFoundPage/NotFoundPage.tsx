import React from 'react';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import SentimentVeryDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentVeryDissatisfiedOutlined';
import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';
import PageHeader from 'components/PageHeader';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.typographyWrapper}>
        <PageHeader fontWeight={500} fontSize="10rem" variant="h1">
          404
        </PageHeader>
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
