import { Link, Paper } from '@mui/material';
import { LogoRS } from 'static/index';
import React from 'react';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';

const StyledFooter = styled(Paper)`
  padding: 10px 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > a > svg {
    height: 40px;
  }
`;

const TextWrapper = styled('div')`
  display: flex;
  flex-direction: column;
`;

const NamesWrapper = styled('div')`
  display: 'flex';
  font-weight: 600;
`;

const StyledLink = styled(Link)`
  font-family: 'Roboto';
  text-decoration: none;
  font-size: 1.2rem;
`;

const Footer = () => {
  return (
    <StyledFooter elevation={16}>
      <Link href="https://rs.school/js" target="_blank">
        <LogoRS />
      </Link>
      <TextWrapper>
        <NamesWrapper>
          <StyledLink href="https://github.com/leon-kn" target="_blank">
            Leontiy Knyazev
          </StyledLink>{' '}
          &{' '}
          <StyledLink href="https://github.com/potatosim" target="_blank">
            Hanna Yemelyanova
          </StyledLink>
        </NamesWrapper>
      </TextWrapper>
      <Typography fontWeight={600}>Created in 2022</Typography>
    </StyledFooter>
  );
};

export default Footer;
