// Simple test to verify color generation logic
const { generateShades, formatColorValues } = require('./src/utils/colorUtils.js');

console.log('🔍 Testing Color Generation Logic');
console.log('=================================');

// Test the problematic color #505c47
console.log('\n1. Testing problematic color #505c47:');
try {
  const shades505c47 = generateShades('#505c47');
  console.log('✅ Color generation successful');
  
  // Check base color (500 shade)
  if (shades505c47['500']) {
    console.log(`Base color (500): ${shades505c47['500'].hex}`);
    console.log(`Expected: #505c47`);
    console.log(`Match: ${shades505c47['500'].hex.toLowerCase() === '#505c47'}`);
  }
  
  // Check light shades maintain character
  console.log('\nLight shades:');
  ['50', '100', '200'].forEach(shade => {
    if (shades505c47[shade]) {
      const formatted = formatColorValues(shades505c47[shade]);
      console.log(`${shade}: ${formatted.hex} | HSL: ${formatted.hsl}`);
    }
  });
  
} catch (error) {
  console.log('❌ Error generating #505c47:', error.message);
}

// Test blue color #3b82f6
console.log('\n2. Testing blue color #3b82f6:');
try {
  const shadesBlue = generateShades('#3b82f6');
  console.log('✅ Blue color generation successful');
  console.log(`Base color (500): ${shadesBlue['500'].hex}`);
} catch (error) {
  console.log('❌ Error generating #3b82f6:', error.message);
}

// Test red color #ef4444
console.log('\n3. Testing red color #ef4444:');
try {
  const shadesRed = generateShades('#ef4444');
  console.log('✅ Red color generation successful');
  console.log(`Base color (500): ${shadesRed['500'].hex}`);
} catch (error) {
  console.log('❌ Error generating #ef4444:', error.message);
}

console.log('\n=================================');
console.log('Color generation logic test completed');