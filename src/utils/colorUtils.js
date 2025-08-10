// Color utility functions for format conversion and shade generation

// Convert HEX to RGB
export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Convert RGB to HEX
export function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Convert RGB to HSL
export function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

// Convert HSL to RGB
export function hslToRgb(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;

  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };

  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

// Convert RGB to OKLCH (simplified approximation)
export function rgbToOklch(r, g, b) {
  // Convert to linear RGB
  const linearize = (c) => {
    c = c / 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };

  const rLin = linearize(r);
  const gLin = linearize(g);
  const bLin = linearize(b);

  // Convert to OKL*a*b* (simplified)
  const l = Math.cbrt(0.4122214708 * rLin + 0.5363325363 * gLin + 0.0514459929 * bLin);
  const a = 0.2104542553 * rLin + 0.7936177850 * gLin - 0.0040720468 * bLin;
  const B = 1.9779984951 * rLin - 2.4285922050 * gLin + 0.4505937099 * bLin;

  // Convert to LCH
  const c = Math.sqrt(a * a + B * B);
  const h = Math.atan2(B, a) * 180 / Math.PI;

  return {
    l: Math.round(l * 100) / 100,
    c: Math.round(c * 100) / 100,
    h: Math.round(h < 0 ? h + 360 : h)
  };
}

// Generate color shades based on a base color - IMPROVED ALGORITHM
export function generateShades(hexColor) {
  const rgb = hexToRgb(hexColor);
  if (!rgb) return {};

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  // Improved shade generation that maintains color character
  // Keep hue consistent and maintain reasonable saturation in light shades
  const shades = {
    50: { 
      l: 96, 
      s: Math.max(hsl.s * 0.4, 8), // Maintain some saturation even in light shades
      h: hsl.h 
    },
    100: { 
      l: 92, 
      s: Math.max(hsl.s * 0.5, 10),
      h: hsl.h 
    },
    200: { 
      l: 84, 
      s: Math.max(hsl.s * 0.6, 12),
      h: hsl.h 
    },
    300: { 
      l: 76, 
      s: Math.max(hsl.s * 0.7, 14),
      h: hsl.h 
    },
    400: { 
      l: 64, 
      s: Math.max(hsl.s * 0.85, 16),
      h: hsl.h 
    },
    500: { 
      l: hsl.l, 
      s: hsl.s, 
      h: hsl.h 
    }, // base color - exact match
    600: { 
      l: Math.max(hsl.l - 8, 12), 
      s: Math.min(hsl.s * 1.1, 100),
      h: hsl.h 
    },
    700: { 
      l: Math.max(hsl.l - 16, 10), 
      s: Math.min(hsl.s * 1.2, 100),
      h: hsl.h 
    },
    800: { 
      l: Math.max(hsl.l - 24, 8), 
      s: Math.min(hsl.s * 1.3, 100),
      h: hsl.h 
    },
    900: { 
      l: Math.max(hsl.l - 30, 6), 
      s: Math.min(hsl.s * 1.4, 100),
      h: hsl.h 
    },
    950: { 
      l: Math.max(hsl.l - 36, 4), 
      s: Math.min(hsl.s * 1.5, 100),
      h: hsl.h 
    }
  };

  const result = {};
  
  Object.entries(shades).forEach(([shade, { l, s, h }]) => {
    const adjustedRgb = hslToRgb(h, Math.min(s, 100), Math.min(l, 100));
    const hex = rgbToHex(adjustedRgb.r, adjustedRgb.g, adjustedRgb.b);
    const hslValues = rgbToHsl(adjustedRgb.r, adjustedRgb.g, adjustedRgb.b);
    const oklch = rgbToOklch(adjustedRgb.r, adjustedRgb.g, adjustedRgb.b);
    
    result[shade] = {
      hex,
      rgb: adjustedRgb,
      hsl: hslValues,
      oklch
    };
  });

  return result;
}

// Format color values for display
export function formatColorValues(colorData) {
  return {
    hex: colorData.hex.toUpperCase(),
    rgb: `rgb(${colorData.rgb.r}, ${colorData.rgb.g}, ${colorData.rgb.b})`,
    hsl: `hsl(${colorData.hsl.h}, ${colorData.hsl.s}%, ${colorData.hsl.l}%)`,
    oklch: `oklch(${colorData.oklch.l} ${colorData.oklch.c} ${colorData.oklch.h})`
  };
}

// Get contrast ratio between two colors
export function getContrastRatio(color1, color2) {
  const getLuminance = (r, g, b) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return 1;

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

// Check if color is light or dark
export function isLightColor(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return false;
  
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 128;
}