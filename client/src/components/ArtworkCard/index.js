import React, { useEffect, useState } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../actions/artworkActions';
import Alert from '@material-ui/lab/Alert';
import './ArtworkCard.css';

const ArtworkCard = ({ info }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.error);
  const favorites = useSelector((state) => {
    if (state.auth.isAuthenticated) {
      return state.auth.user.favorites;
    } else {
      return [];
    }
  });

  const favIds = [];

  favorites.map((doc) => favIds.push(doc.artwork._id));

  const dispatch = useDispatch();

  const [err, setErr] = useState(null);

  const artId = info._id;

  const handleFavorite = (e) => {
    e.preventDefault();
    dispatch(addFavorite(artId));
  };

  const handleRemove = (e) => {
    e.preventDefault();
    dispatch(removeFavorite(artId));
  };

  useEffect(() => {
    const handleErrors = (error) => {
      if (error.id === 'ADD_FAVORITE_FAIL') {
        setErr(error.msg.msg);
      } else {
        setErr(null);
      }
    };
    handleErrors(error);
  }, [error]);

  return (
    <>
      <div className="card">
        <img
          className="card-img-top"
          style={{ height: '18rem' }}
          src={info.artworkImg}
          alt={info.title}
        />
        <div className="card-body">
          <h2 className="card-title">{info.title}</h2>
          <p className="card-text">
            Uploaded By :&nbsp;{info.artist.firstName}
          </p>
          <p className="card-text">Type :&nbsp;{info.category}</p>
          <button
            className={`btn ${!isAuthenticated ? 'disabled' : ''}`}
            // style={{ backgroundColor: '#01bf71', fontWeight: 'bold' }}
            style={
              !favIds.includes(info._id)
                ? { backgroundColor: '#01bf71' }
                : { backgroundColor: '#FC390E' }
            }
            onClick={favIds.includes(info._id) ? handleRemove : handleFavorite}
          >
            {!isAuthenticated ? (
              <>Login to add this item to favorites</>
            ) : favIds.includes(info._id) ? (
              <>Remove From Favorites</>
            ) : (
              <>
                <FavoriteIcon />
                &nbsp;&nbsp;Add To Favorites
              </>
            )}
          </button>
          {err && (
            <Alert
              style={{ marginTop: '18px' }}
              variant="filled"
              severity="error"
            >
              {err}
            </Alert>
          )}
        </div>
      </div>
    </>
  );
};

export default ArtworkCard;
