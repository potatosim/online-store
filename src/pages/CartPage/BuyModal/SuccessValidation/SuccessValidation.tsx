import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { setIsBuyNow } from 'handlers/cartSlice';

import { useAppDispatch } from 'hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';

const SuccessValidation = () => {
  const [counter, setCounter] = useState<number>(5);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (counter === 0) {
      dispatch(setIsBuyNow(false));
      navigate('/asdasd');
    }
  }, [counter]);

  return (
    <Typography textAlign="center" variant="h4">
      Thank you for your order! You will be redirect to the store in {counter} s.
    </Typography>
  );
};

export default SuccessValidation;
