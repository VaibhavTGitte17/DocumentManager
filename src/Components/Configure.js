import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Layout from './Layout';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
const { ipcRenderer } = window.require('electron');




function Configure() {
  const [folderPath, setFolderPath] = useState('');
  const [warning, setWarning] = useState('');
  const navigate = useNavigate();



  const handleFolderUpload = (event) => {
    const fileInput = event.target;

    if (fileInput.files.length > 0) {
      // Get the path of the first selected file
      const filePath = fileInput.files[0].path;

      // Extract the folder path by removing the file name
      const folderPath = filePath.substring(0, filePath.lastIndexOf('\\')); // for Windows paths
      setFolderPath(folderPath);
    }
  };



  const browseFolder = () => {
    document.getElementById('folderInput').click();
  };


  const handleAddFolderClick = () => {
    if (folderPath === '') {
      setWarning('Please upload a folder path first');
      setTimeout(() => {
        setWarning('');
      }, 3000);
    } else {
      // Send the folder path to the Electron main process
      ipcRenderer.send('folder-path', folderPath);
      navigate('/');
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          width: 500,
          maxWidth: '100%',
          my: 3,
          mx: 12,
          ml: 35
        }}
      >
      <Typography  sx={{
        fontWeight:"bold",
        textAlign:'center',
        marginBottom:2,
        fontSize:30
      }}>
      Configure Root Folder Here 
      </Typography>
        <input
          type="file"
          webkitdirectory="true"
          directory="true"
          id="folderInput"
          style={{ display: 'none' }}
          onChange={handleFolderUpload}
        />

        <Stack direction="row" spacing={2} sx={{ my: 2 }}>
          <Button
            variant="outlined"
            endIcon={<DriveFolderUploadIcon />}
            color="primary"
            onClick={browseFolder}
            sx={{
              width: "200px",
              '&:hover': {
                backgroundColor: 'primary.dark',
                color: 'white',
              }
            }}
          >
            Browse Folder
          </Button>
        </Stack>

        <TextField
          fullWidth
          label="Uploaded Folder Path"
          id="folderPath"
          value={folderPath}
          onChange={(event) => setFolderPath(event.target.value)}
          sx={{ mb: 3 }}
        />

        {warning && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            {warning}
          </Alert>
        )}

        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddFolderClick}
          sx={{
            my: 1,
            width: "500px"
          }}
          endIcon={<SendIcon />}
        >
          Configure Root Folder Path
        </Button>
      </Box>
    </Layout>
  );
}

export default Configure;