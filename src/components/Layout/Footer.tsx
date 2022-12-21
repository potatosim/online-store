import { Link } from '@mui/material';
import React from 'react';
// import rsLogo from 'static/assets/rsLogo.jpg';
import styles from './Footer.module.scss';
import { LogoRS } from 'static/index';
import styled from '@emotion/styled';

// const StyledRsLogo = styled(rsLogo)(() => {});

const TextWrapper = styled('div')`
  display: flex;
  flex-direction: column;
`;

const NamesWrapper = styled('div')`
  display: 'flex';
`;

const StyledLink = styled(Link)`
  color: orange;
  text-shadow: 1px 1px 1px black;
  text-decoration: none;
  font-size: 1.2rem;
`;

const Char = styled('span')`
  color: white;
  margin: 0 5px;
  font-weight: 500;
  font-size: 1.2rem;
`;

const Year = styled('span')`
  color: white;
  margin-left: 38%;
  font-weight: 500;
  font-size: 1.2rem;
`;

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link href="https://rs.school/js" target="_blank">
        <LogoRS />
      </Link>
      <TextWrapper>
        <NamesWrapper>
          <StyledLink href="https://github.com/leon-kn" target="_blank">
            Leontiy Knyazev
          </StyledLink>
          <Char>&</Char>
          <StyledLink href="https://github.com/potatosim" target="_blank">
            Hanna Yemelyanova
          </StyledLink>
        </NamesWrapper>
        <Year>2022</Year>
      </TextWrapper>
    </footer>
  );
};

export default Footer;
