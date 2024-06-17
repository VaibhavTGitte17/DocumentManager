import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import Layout from './Layout';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
const { ipcRenderer } = window.require('electron');




function Upload() {
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    console.log('Setting up ipcRenderer listener for folders-selected');
    ipcRenderer.on('folders-selected', (event, folderNames) => {
      console.log('Received folders-selected event with data:', folderNames);
      setFolders(folderNames);
    });

    return () => {
      ipcRenderer.removeAllListeners('folders-selected');
    };
  }, []);



  const handleFileUpload = (event) => {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      const uploadedFiles = Array.from(fileInput.files).map(file => ({
        name: file.name,
        path: file.path
      }));
      setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
    }
  };



  const browseFile = () => {
    document.getElementById('fileInput').click();
  };



  const handleAddFilesClick = () => {
    if (files.length > 0) {
      const filePaths = files.map(file => file.path);
      const data = { filePaths, selectedFolder };
      ipcRenderer.send('upload-files', data);
      navigate('/');
    }
  };

  
  const handleSelectFolderClick = () => {
    console.log('Select Folder button clicked');
    ipcRenderer.send('select-folder');
  };

  const handleFolderChange = (event) => {
    setSelectedFolder(event.target.value);
  };

  return (
    <Layout>
      <Box
        sx={{
         
          maxWidth: 660,
          my: 1,
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
     Select the Folder Name And Upload file 
      </Typography>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          id="fileInput"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
          multiple
        />
        <Stack direction="column" spacing={2} sx={{ my: 4 }}>
          <Button
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            color="secondary"
            onClick={browseFile}
            sx={{
              width: "200px",
              '&:hover': {
                backgroundColor: 'secondary.main',
                color: 'white',
              }
            }}
          >
            Upload Files
          </Button>

          {files.map((file, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label={`Uploaded File ${index + 1}`}
                value={file.name}
                InputProps={{
                  readOnly: true,
                }}
              />
              <Box
                sx={{
                  mt: 1,
                  fontStyle: 'italic',
                  color: 'gray',
                }}
              >
                Full path: {file.path}
              </Box>
            </Box>
          ))}

          <Button
            variant="outlined"
            color="secondary"
            onClick={handleSelectFolderClick}
            sx={{
              width: "200px",
              '&:hover': {
                backgroundColor: 'secondary.main',
                color: 'white',
              }
            }}
          >
            Select Folder
          </Button>

          {folders.length > 0 && (
            <Select
              value={selectedFolder}
              onChange={handleFolderChange}
              displayEmpty
              fullWidth
              sx={{ my: 2 }}
            >
              <MenuItem value="" disabled>Select a folder</MenuItem>
              {folders.map((folder, index) => (
                <MenuItem key={index} value={folder}>{folder}</MenuItem>
              ))}
            </Select>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddFilesClick}
          >
            Add Files
          </Button>
        </Stack>
      </Box>
    </Layout>
  );
}

export default Upload;
