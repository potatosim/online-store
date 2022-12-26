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
  borderBottom: isCurrent ? '2px solid blue' : '2px solid transparent',
  '&:hover': { ...(!isCurrent ? { borderBottom: '2px solid red', transform: 'scale(0.8)' } : {}) },
}));

//   '&:hover': { borderBottom: !isCurrent ? '2px solid red' : '' },

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

const Gallery = ({ images, thumbnail }: IGalleryProps) => {
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

export default Gallery;
