import styled from '@emotion/styled';

export const getSliderWrapper = (areaName: string) => styled('div')`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-area: ${areaName};
`;
