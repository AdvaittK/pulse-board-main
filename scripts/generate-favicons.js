const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Make sure we're in the project root
const projectRoot = path.resolve(__dirname, '..');
const faviconDir = path.join(projectRoot, 'public', 'favicon');

// Check if ImageMagick (convert command) is available
try {
  // Try to install sharp for Node.js image processing if needed
  console.log('Installing sharp package for image processing...');
  execSync('pnpm add -D sharp', { cwd: projectRoot, stdio: 'inherit' });
  
  console.log('Generating favicon files from SVG...');
  
  // Using Node.js to dynamically import and use sharp
  const generateFavicons = async () => {
    const sharp = require('sharp');
    
    // Read the SVG file
    const faviconSvgPath = path.join(faviconDir, 'favicon.svg');
    
    if (!fs.existsSync(faviconSvgPath)) {
      console.error('favicon.svg not found!');
      process.exit(1);
    }
    
    // Generate apple-touch-icon.png (180x180)
    await sharp(faviconSvgPath)
      .resize(180, 180)
      .png()
      .toFile(path.join(faviconDir, 'apple-touch-icon.png'));
    console.log('Generated apple-touch-icon.png');
    
    // Generate favicon.ico (multiple sizes: 16x16, 32x32, 48x48)
    // We'll create individual PNGs first, then combine them into ICO
    await sharp(faviconSvgPath)
      .resize(16, 16)
      .png()
      .toFile(path.join(faviconDir, 'favicon-16x16.png'));
    
    await sharp(faviconSvgPath)
      .resize(32, 32)
      .png()
      .toFile(path.join(faviconDir, 'favicon-32x32.png'));

    await sharp(faviconSvgPath)
      .resize(48, 48)
      .png()
      .toFile(path.join(faviconDir, 'favicon-48x48.png'));

    console.log('Generated PNG favicons of different sizes');
    
    // For typical Next.js project, we also need these sizes
    await sharp(faviconSvgPath)
      .resize(192, 192)
      .png()
      .toFile(path.join(faviconDir, 'android-chrome-192x192.png'));
    
    await sharp(faviconSvgPath)
      .resize(512, 512)
      .png()
      .toFile(path.join(faviconDir, 'android-chrome-512x512.png'));
    
    console.log('Generated Android Chrome icons');
    
    console.log('All favicon files have been generated!');
    console.log('Note: For the favicon.ico file, you might need to use an online converter to combine the PNGs');
  };
  
  generateFavicons().catch(err => {
    console.error('Error generating favicons:', err);
    process.exit(1);
  });
} catch (e) {
  console.error('Error:', e.message);
  console.log('You may need to install required dependencies manually');
}