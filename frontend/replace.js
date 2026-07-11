const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace hardcoded dark backgrounds with bg-background
  content = content.replace(/bg-\[\#0A0A0A\]/gi, 'bg-background');
  content = content.replace(/bg-\[\#09090B\]/gi, 'bg-background');
  content = content.replace(/bg-\[\#050505\]/gi, 'bg-background');
  content = content.replace(/bg-\[\#0d1117\]/gi, 'bg-background');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath);
    } else if (dirPath.endsWith('.tsx') || dirPath.endsWith('.css')) {
      replaceInFile(dirPath);
    }
  });
}

walkDir(path.join(__dirname, 'src', 'components'));
walkDir(path.join(__dirname, 'src', 'app'));
