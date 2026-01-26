
const fs = require('fs');
const path = require('path');

function getDimensions(filePath) {
  const fd = fs.openSync(filePath, 'r');
  const buffer = Buffer.alloc(24);
  fs.readSync(fd, buffer, 0, 24, 0);
  fs.closeSync(fd);
  
  if (buffer.toString('hex', 0, 8) !== '89504e470d0a1a0a') {
      return 'Not a PNG';
  }
  
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  
  return { width, height };
}

const p1 = path.join(process.cwd(), 'web/public/clear slogan.png');
console.log('clear slogan.png:', getDimensions(p1));
