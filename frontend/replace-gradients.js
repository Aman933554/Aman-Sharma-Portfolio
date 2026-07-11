const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace from and via gradients
  content = content.replace(/from-\[\#09090B\]/gi, 'from-background');
  content = content.replace(/via-\[\#09090B\]/gi, 'via-background');
  content = content.replace(/to-\[\#09090B\]/gi, 'to-background');
  
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
