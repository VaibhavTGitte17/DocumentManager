const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');



const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    
    },
  });

  //mainWindow.loadFile(path.join(__dirname, "build", "index.html"));
  mainWindow.loadURL('http://localhost:3000/');
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


ipcMain.handle('select-folder', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  });
  return result.filePaths[0];
});



// Configure folder path channel
ipcMain.on('folder-path', (event, folderPath) => {
  console.log('Received folder path:', folderPath);

  // Spawn a Python process to create configure.pkl
  const pythonProcess = spawn('python', ['./scripts/configure.py', folderPath]);

  pythonProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python process exited with code ${code}`);
  });
});




// Add another IPC listener for receiving the folder name
ipcMain.on('create-folder', (event, folderName) => {
  console.log('Received folder name:', folderName);

  // Spawn a Python process to create the folder
  const pythonProcess = spawn('python', ['./scripts/create_folder.py', folderName]);

  pythonProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python process exited with code ${code}`);
  });
});





ipcMain.on('upload-files', (event, data) => {
  const { filePaths, selectedFolder } = data;
  console.log('Received file paths:', filePaths);
  console.log('Received selected folder:', selectedFolder);

  // Spawn a Python process to handle the file copying
  filePaths.forEach(filePath => {
    const args = ['./scripts/upload_file.py', filePath];
    if (selectedFolder) {
      args.push(selectedFolder);
    }
    const pythonProcess = spawn('python', args);

    pythonProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      console.log(`Python process exited with code ${code}`);
    });
  });
});





ipcMain.on('select-folder', (event) => {
  console.log('Received select-folder event');
  const pythonProcess = spawn('python', [path.join(__dirname, './scripts/get_folder.py')]);

  pythonProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    if (code === 0) {
      const selectFolderPath = path.join(__dirname, 'select_folder.json');
      fs.readFile(selectFolderPath, 'utf8', (err, data) => {
        if (err) {
          console.error(`Error reading select_folder.json: ${err}`);
          event.sender.send('folders-selected', []);
          return;
        }
        try {
          const folderNames = JSON.parse(data);
          console.log('Successfully read select_folder.json with data:', folderNames);
          event.sender.send('folders-selected', folderNames);
        } catch (parseError) {
          console.error('Error parsing select_folder.json:', parseError);
          event.sender.send('folders-selected', []);
        }
      });
    } else {
      console.error('Python script did not exit cleanly.');
      event.sender.send('folders-selected', []);
    }
  });
});