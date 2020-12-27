import React from 'react';

const ArtworkCard = ({ info }) => {
  return (
    <>
      <div className="card" style={{ width: '368px', height: '100%' }}>
        <img
          className="card-img-top"
          style={{ height: '18rem' }}
          src={info.artworkImg}
          alt="Card image cap"
        />
        <div className="card-body">
          <h5 className="card-title">{info.title}</h5>
          <p className="card-text">
            Uploaded By :&nbsp;{info.artist.firstName}
          </p>
          <p className="card-text">₹&nbsp;{info.price}</p>
          <a
            href="#"
            className="btn "
            style={{ backgroundColor: '#01bf71', fontWeight: 'bold' }}
          >
            Add To Favorites
          </a>
        </div>
      </div>
    </>
  );
};

export default ArtworkCard;
