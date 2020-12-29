import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import ArtworkCard from '../ArtworkCard';
import './index.css';

const Gallery = () => {
  const artwork = useSelector((state) => state.artwork.artwork);
  const isLoading = useSelector((state) => state.artwork.isLoading);

  return (
    <>
      <div className="GalleryContainer">
        <div className="GalleryWrapper">
          {isLoading || !artwork ? (
            <div className="SpinnerWrapper">
              <CircularProgress color="primary" />
            </div>
          ) : (
            <>
              {artwork &&
                artwork.map((doc) => <ArtworkCard key={doc._id} info={doc} />)}
              {artwork &&
                artwork.map((doc) => <ArtworkCard key={doc._id} info={doc} />)}
              {artwork &&
                artwork.map((doc) => <ArtworkCard key={doc._id} info={doc} />)}
              {artwork &&
                artwork.map((doc) => <ArtworkCard key={doc._id} info={doc} />)}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Gallery;
