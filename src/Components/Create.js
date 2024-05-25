import React from 'react'
import Layout from './Layout'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';

function Create() {
  return (
    <Layout>
    <Box
    sx={{
      width: 500,
      maxWidth: '100%',
      my :4,
      mx:12
    }}
  >
    <TextField fullWidth label="Enter The Folder Name" id="fullWidth" />
    <Stack direction="row" spacing={2} sx={{
      my:4
    }}>
      <Button variant="outlined" startIcon={<AddIcon />}
      
      >
        Create
      </Button>
      </Stack>
  </Box>
    </Layout>
  )
}

export default Create
