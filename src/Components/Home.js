import React from 'react';
import Layout from './Layout';
import { Link , useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import one from './one.jpg';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import './Home.css';

function Home() {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/create')
  }

  const handleClickFile = () =>{
    navigate('/upload')
  }
  
  
  return (
    <Layout>    
      <Box sx={{ mt: 0, ml: 33, position: 'relative' }}> 
        <div>
          <h1>Welcome Home</h1>
          <div style={{ position: 'relative' }}>
            <img src={one} alt="frontend" style={{ width: '98%', height: '500px' }} />
            <div style={{
              position: 'absolute',
              top: '80%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'red',
              textAlign: 'center'
            }}>
              <Typography variant="h4">
                Configure root folder
              </Typography>
              <Button variant="contained"
               component={Link} color="primary"
                to="/configure" 
                style={{ marginTop: '20px' }}
                sx={{ 
                  marginTop: '20px',
                  backgroundColor: 'primary',
                  '&:hover': {
                    backgroundColor: 'success'
                  }
                }}
                >
                Go to Configure
              </Button>
            </div>
          </div>
        </div>

        <div className="card-container">
        <Card sx={{ maxWidth: 400, m: 2 }} onClick={handleClick}>
          <CardActionArea>
            <CardMedia
              className="card-media"
              component="img"
              height="250"
              image={one}
              alt="create folders"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" style={{textAlign:"center"}}>
                Create Folders
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, perferendis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium est id rem, minima temporibus quae facere quasi corporis sint iusto placeat dignissimos sed quibusdam ullam laudantium enim tenetur architecto? Nemo.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card sx={{ maxWidth: 400, m: 2 }} onClick={handleClickFile}>
          <CardActionArea>
            <CardMedia
              className="card-media"
              component="img"
              height="250"
              image={one}
              alt="upload files"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" style={{textAlign:"center"}}>
                Upload Files
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, perferendis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ut magnam, iusto pariatur architecto officiis. Iure fugit dignissimos nisi delectus quae suscipit quidem doloremque nesciunt molestias, reiciendis necessitatibus ipsum laudantium.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </Box>
     
    </Layout>
  );
}

export default Home;
