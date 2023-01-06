import styled from '@emotion/styled';
import { CardMedia, ImageList } from '@mui/material';
import React, { useEffect, useState } from 'react';

const Thumbnail = styled('img')<
  { isCurrent: boolean } & React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
>(({ isCurrent }) => ({
  display: 'block',
  cursor: 'pointer',
  width: '100%',
  flex: '1 1 auto',
  transition: '.25s all ease-in-out',
  border: isCurrent ? '4px solid rgb(255, 166, 0)' : '2px solid transparent',
  '&:hover': {
    ...(!isCurrent ? { border: '4px solid rgba(255, 166, 0, 0.6)' } : {}),
  },
}));

const GalleryWrapper = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: '1fr 4fr',
  width: '70%',
  columnGap: '1rem',
}));

interface IGalleryProps {
  images: string[];
  thumbnail: string;
}

const ProductGallery = ({ images, thumbnail }: IGalleryProps) => {
  const [image, setImage] = useState<string>(thumbnail);
  useEffect(() => {
    setImage(thumbnail);
  }, [thumbnail]);

  return (
    <GalleryWrapper>
      <ImageList
        cols={1}
        gap={16}
        sx={{
          '&::-webkit-scrollbar': {
            width: 0,
          },
          maxHeight: '400px',
        }}
      >
        {images.map((el, i) => {
          return (
            <Thumbnail key={i} isCurrent={el === image} src={el} onClick={() => setImage(el)} />
          );
        })}
      </ImageList>
      <CardMedia image={image} sx={{ backgroundSize: 'contain' }} />
    </GalleryWrapper>
  );
};

export default ProductGallery;
