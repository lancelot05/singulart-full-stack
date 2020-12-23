import React from 'react';
import { Button } from '../Button';
import './index.css';

const InfoSection = ({
  lightBg,
  id,
  imgStart,
  topLine,
  lightText,
  headline,
  darkText,
  description,
  img,
  alt,
  buttonLabel,
  dark,
  primary,
  dark2,
}) => {
  return (
    <div className={`InfoContainer ${lightBg ? 'LightBg' : ''}`}>
      <div className="InfoWrapper">
        <div className={`InfoRow ${imgStart ? 'ImgStart' : ''}`}>
          <div className="Column1">
            <div className="TextWrapper">
              <div className="TopLine">{topLine}</div>
              <h1 className={`Heading ${lightText ? 'LightText' : ''}`}>
                {headline}
              </h1>
              <p className={`Subtitle ${darkText ? 'DarkText' : ''}`}>
                {description}
              </p>
              <div className="BtnWrap">
                <Button
                  to="/"
                  primary={primary ? 1 : 0}
                  dark={dark ? 1 : 0}
                  dark2={dark2 ? 1 : 0}
                >
                  {buttonLabel}
                </Button>
              </div>
            </div>
          </div>
          <div className="Column2">
            <div className="ImgWrap">
              <img className="Img" src={img} alt={alt} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
