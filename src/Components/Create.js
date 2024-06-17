import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
const { ipcRenderer } = window.require('electron');


function Create() {
  const [folderName, setFolderName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()


  
  useEffect(() => {
    const timer = setTimeout(() => {
      setError('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);



  const handleInputChange = (event) => {
    setFolderName(event.target.value);
    if (event.target.value.trim() === '') {
      setError('Please enter the folder name.');
    } else {
      setError('');
    }
  };

  const handleCreateClick = () => {

    // Trim removes whitespace from both sides of a strings
    if (folderName.trim() !== '') {
      ipcRenderer.send('create-folder', folderName);
      navigate('/')
      console.log('Folder creation request sent:', folderName);
    } else {
      setError('Please enter the folder name.');
    }
  };



  return (
    <Layout>
      <Box
        sx={{
          width: 500,
          maxWidth: '100%',
          my: 4,
          mx: 12,
          ml: 35,
        }}
      >
  <Typography  sx={{
    fontWeight:"bold",
    textAlign:'center',
    marginBottom:2,
    fontSize:30
  }}>
  Create Folders Here 
  </Typography>

        <TextField
          fullWidth
          label="Enter The Folder Name"
          id="fullWidth"
          value={folderName}
          onChange={handleInputChange}
          error={!!error}
          helperText={error}
        />
        <Stack direction="row" spacing={2} sx={{ my: 4 }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleCreateClick}
            sx={{
              my: 1,
              width: "500px",
              height:'35px'
            }}
          >
            Create
          </Button>
        </Stack>
      </Box>
    </Layout>
  );
}

export default Create;
