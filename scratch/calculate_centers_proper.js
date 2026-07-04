import fs from 'fs';

const data = JSON.parse(fs.readFileSync('/Users/deepak/.gemini/antigravity-ide/brain/0f4b9d88-da09-45b6-86dd-ee2066271705/scratch/extracted_india_map.json', 'utf-8'));

function getAbsoluteBBoxAndCentroid(pathStr) {
  const regex = /([a-df-z])([^a-df-z]*)/ig;
  let match;
  
  let currX = 0, currY = 0;
  let startX = 0, startY = 0;
  
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;
  
  let sumX = 0, sumY = 0;
  let count = 0;
  
  while ((match = regex.exec(pathStr)) !== null) {
    const cmd = match[1];
    const argsStr = match[2].trim();
    const args = argsStr ? argsStr.split(/[\s,]+/).map(parseFloat).filter(n => !isNaN(n)) : [];
    
    switch (cmd) {
      case 'M':
        for (let i = 0; i < args.length; i += 2) {
          currX = args[i];
          currY = args[i+1];
          if (i === 0) { startX = currX; startY = currY; }
          addPoint(currX, currY);
        }
        break;
      case 'm':
        for (let i = 0; i < args.length; i += 2) {
          currX += args[i];
          currY += args[i+1];
          if (i === 0) { startX = currX; startY = currY; }
          addPoint(currX, currY);
        }
        break;
      case 'L':
        for (let i = 0; i < args.length; i += 2) {
          currX = args[i];
          currY = args[i+1];
          addPoint(currX, currY);
        }
        break;
      case 'l':
        for (let i = 0; i < args.length; i += 2) {
          currX += args[i];
          currY += args[i+1];
          addPoint(currX, currY);
        }
        break;
      case 'H':
        for (let i = 0; i < args.length; i++) {
          currX = args[i];
          addPoint(currX, currY);
        }
        break;
      case 'h':
        for (let i = 0; i < args.length; i++) {
          currX += args[i];
          addPoint(currX, currY);
        }
        break;
      case 'V':
        for (let i = 0; i < args.length; i++) {
          currY = args[i];
          addPoint(currX, currY);
        }
        break;
      case 'v':
        for (let i = 0; i < args.length; i++) {
          currY += args[i];
          addPoint(currX, currY);
        }
        break;
      case 'C':
        for (let i = 0; i < args.length; i += 6) {
          currX = args[i+4];
          currY = args[i+5];
          addPoint(currX, currY);
        }
        break;
      case 'c':
        for (let i = 0; i < args.length; i += 6) {
          currX += args[i+4];
          currY += args[i+5];
          addPoint(currX, currY);
        }
        break;
      case 'S':
        for (let i = 0; i < args.length; i += 4) {
          currX = args[i+2];
          currY = args[i+3];
          addPoint(currX, currY);
        }
        break;
      case 's':
        for (let i = 0; i < args.length; i += 4) {
          currX += args[i+2];
          currY += args[i+3];
          addPoint(currX, currY);
        }
        break;
      case 'z':
      case 'Z':
        currX = startX;
        currY = startY;
        break;
    }
  }
  
  function addPoint(x, y) {
    if (!isNaN(x) && !isNaN(y)) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
      sumX += x;
      sumY += y;
      count++;
    }
  }
  
  return {
    minX, maxX, minY, maxY,
    centerX: count > 0 ? sumX / count : 0,
    centerY: count > 0 ? sumY / count : 0
  };
}

const statesOfInterest = ['mh', 'dl', 'ka', 'up', 'mp'];
statesOfInterest.forEach(id => {
  const state = data.states.find(s => s.id === id);
  if (state) {
    const bbox = getAbsoluteBBoxAndCentroid(state.path);
    console.log(`State: ${state.name} (${id})`);
    console.log(`  BBox: MinX: ${bbox.minX.toFixed(2)}, MaxX: ${bbox.maxX.toFixed(2)}, MinY: ${bbox.minY.toFixed(2)}, MaxY: ${bbox.maxY.toFixed(2)}`);
    console.log(`  Center: X: ${bbox.centerX.toFixed(2)}, Y: ${bbox.centerY.toFixed(2)}`);
  }
});
