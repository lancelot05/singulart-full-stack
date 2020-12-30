import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import ArtworkCard from '../ArtworkCard';
import './Favorite.css';

const Favorite = () => {
  const artwork = useSelector((state) => state.artwork.artwork);
  const isLoading = useSelector((state) => state.artwork.isLoading);
  const favorites = useSelector((state) => {
    if (state.auth.isAuthenticated) {
      return state.auth.user.favorites;
    } else {
      return [];
    }
  });

  const favIds = [];

  favorites.map((doc) => favIds.push(doc.artwork));

  return (
    <>
      <div className="GalleryContainer">
        {favIds.length === 0 && (
          <h1 className="FavoriteH1"> Nothing to See In Your Favorites</h1>
        )}
        <div className="GalleryWrapper">
          {isLoading || !favIds ? (
            <div className="SpinnerWrapper">
              <CircularProgress color="primary" />
            </div>
          ) : (
            <>
              {favIds &&
                favIds.map((doc) => <ArtworkCard key={doc._id} info={doc} />)}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Favorite;
