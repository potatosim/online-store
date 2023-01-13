import { Badge } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper/Paper';
import React from 'react';
import { RoutePaths } from 'enums/RoutePaths';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import Typography from '@mui/material/Typography';
import currencyFormatter from 'helpers/currencyFormatter';
import styled from '@emotion/styled';
import { useAppSelector } from 'hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';

const StyledHeader = styled(Paper)`
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = () => {
  const navigate = useNavigate();
  const { totalPrice, totalCount } = useAppSelector((state) => state.cart);

  return (
    <StyledHeader elevation={16}>
      <IconButton size="large" onClick={() => navigate(RoutePaths.Index)}>
        <StoreMallDirectoryIcon fontSize="large" color="warning" />
      </IconButton>
      <Typography fontWeight={600} fontSize="1.5rem">
        Cart total: {currencyFormatter.format(totalPrice)}
      </Typography>
      <IconButton onClick={() => navigate(RoutePaths.CartPage)}>
        <Badge badgeContent={totalCount} color="warning" overlap="circular" showZero>
          <ShoppingCartIcon
            sx={{
              width: 45,
              height: 45,
            }}
            color="warning"
          />
        </Badge>
      </IconButton>
    </StyledHeader>
  );
};

export default Header;
