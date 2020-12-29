import React, { useEffect, useState } from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SendIcon from '@material-ui/icons/Send';
import ClearIcon from '@material-ui/icons/Clear';
import './index.css';
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  TextField,
  ThemeProvider,
} from '@material-ui/core';
import { theme } from '../../MaterialUiTheme';
import { useDispatch, useSelector } from 'react-redux';
import { postArtworks } from '../../actions/artworkActions';
import Alert from '@material-ui/lab/Alert';

const artworkTypes = [
  {
    value: 'Sketch',
    label: 'Sketch',
  },
  {
    value: 'Painting',
    label: 'Painting',
  },
  {
    value: 'Digital Artwork',
    label: 'Digital Artwork',
  },
];

const UploadForm = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState('');
  const [isFramed, setIsFramed] = useState(false);
  const [category, setCategory] = useState(artworkTypes[0].value);
  const [artworkImg, setArtworkImg] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  const error = useSelector((state) => state.error);
  const user = useSelector((state) => state.auth.user);
  const artwork = useSelector((state) => state.artwork.artwork);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (e) => {
    switch (e.target.id) {
      case 'title':
        return setTitle(e.target.value);
      case 'desc':
        return setDesc(e.target.value);
      case 'price':
        return setPrice(e.target.value);
      case 'isFramed':
        return setIsFramed(e.target.value);

      default:
        return null;
    }
  };

  const handleFile = (e) => {
    setArtworkImg(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', parseFloat(price));
    formData.append('desc', desc);
    formData.append('isFramed', isFramed);
    formData.append('category', category);
    formData.append('artworkImg', artworkImg);
    formData.append('artist', user.id || user._id);
    dispatch(postArtworks(formData));
  };

  useEffect(() => {
    const handleRegister = (error) => {
      if (error) {
        if (error.id === 'ARTWORKS_POST_FAIL') {
          setErrorMsg(error.msg.msg);
        } else {
          setErrorMsg(null);
        }
      }
    };
    handleRegister(error);
  }, [error]);

  return (
    <ThemeProvider theme={theme}>
      <div className="Container">
        <div className="Wrapper">
          <h1 className="H1">Upload your Artworks</h1>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CloudUploadIcon />}
            onClick={handleOpen}
          >
            Upload
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle>Upload your work</DialogTitle>
            <DialogContent>
              {errorMsg && (
                <Alert
                  style={{ marginTop: '18px' }}
                  variant="filled"
                  severity="error"
                >
                  {errorMsg}
                </Alert>
              )}
              <DialogContentText>
                Upload your lovely artworks at a reasonable price.
              </DialogContentText>
              <TextField
                autoFocus
                id="title"
                label="Title"
                margin="dense"
                type="text"
                fullWidth
                required
                value={title}
                onChange={handleChange}
              />
              <TextField
                id="desc"
                label="Description"
                margin="dense"
                multiline
                rows={3}
                type="text"
                fullWidth
                value={desc}
                onChange={handleChange}
              />
              <TextField
                id="price"
                label="Price"
                type="number"
                required
                value={price}
                onChange={handleChange}
                margin="dense"
              />
              <TextField
                margin="dense"
                id="category"
                label="Category"
                select
                fullWidth
                helperText="Please Select Type Of Your Artwork"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                {artworkTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <DialogContentText style={{ paddingTop: '18px' }}>
                Upload an JPEG or PNG Type File
              </DialogContentText>
              <input
                type="file"
                style={{ paddingTop: '4px' }}
                onChange={handleFile}
              />
              <FormControlLabel
                label="Check If Your Artwork Is Framed"
                control={
                  <Checkbox
                    color="primary"
                    checked={isFramed}
                    onChange={(e) => setIsFramed(e.target.checked)}
                  />
                }
              />
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<ClearIcon />}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default UploadForm;
