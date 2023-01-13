import Typography, { TypographyProps } from '@mui/material/Typography';
import React, { FC } from 'react';
import ComponentWithChildren from 'types/ComponentWithChildren';

const PageHeader: FC<ComponentWithChildren & TypographyProps> = ({ children, ...props }) => {
  return (
    <Typography
      sx={{
        background: 'linear-gradient(to right,#f2580e 0,#f2ca0f 50%,#f2580e 100%)',
        backgroundClip: 'text',
        webkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};

export default PageHeader;
