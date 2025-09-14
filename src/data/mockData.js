// --- IMPORTANT: IMAGE SETUP ---
// This file contains all the image paths used in your final HomePage.jsx.
// Make sure all these files are in your 'public' folder.

// --- Data for ProductsPage (and other pages) ---
// export const MOCK_PRODUCTS = [
//     { id: 1, name: 'Anarc Zenith Smartwatch', price: 4999, image: '/anarc-watch-black1.png', category: 'Watches', description: 'The pinnacle of smart technology and timeless design.' },
//     { id: 2, name: 'Obsidian Mobile Skin', price: 799, image: '/chaotic-mobile.png', category: 'Skins', description: 'Crafted from premium 3M vinyl for a sleek, matte black finish.' },
//     { id: 3, name: 'Carbon Fiber Laptop Skin', price: 1499, image: '/laptop-skin-carbon.png', category: 'Skins', description: 'A modern, high-tech look with authentic carbon fiber texture.' },
//     { id: 4, name: 'Cobalt Blue Strap', price: 999, image: '/anarc-watch-close-up-4.png', category: 'Accessories', description: 'Durable, comfortable silicone for your Anarc watch.' },
//     // You can add more products here
// ];
// mockData.js - Enhanced with UI-specific watch color options and streamlined data

export const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Anarc Zenith Smartwatch',
    price: 4999,
    image: '/anarc-watch-black1.png',
    category: 'Watches',
    description: 'The pinnacle of smart technology and timeless design.',
    images: [
      '/anarc-watch-black1.png',
      '/anarc-watch-close-up-1.png',
      '/anarc-watch-exploded.png',
      '/anarc-watch-close-up-3.png',
      '/anarc-watch-close-up-4.png',
    ],
    colorOptions: [
      { name: 'Midnight Black', color: '#1C1C1C', image: '/anarc-watch-black1.png' },
      { name: 'Silver Mist', color: '#C0C0C0', image: '/product-frost-blaze.png ' }
    ],
    highlights: [
      'AMOLED Always-On Display',
      'Up to 14 Days Battery Life',
      'Customizable Watch Faces',
      'Heart Rate & SpO2 Monitoring'
    ]
  },
  {
    id: 2,
    name: 'Obsidian Mobile Skin',
    price: 799,
    image: '/chaotic-mobile.png',
    category: 'Skins',
    description: 'Crafted from premium 3M vinyl for a sleek, matte black finish.',
    images: [
      '/chaotic-mobile.png',
      '/chaotic-mobile-close1.png',
      '/chaotic-mobile-close2.png',
      '/chaotic-mobile-close3.png',
      '/chaotic-mobile-close4.png',
    ]
  },
  {
    id: 3,
    name: 'Carbon Fiber Laptop Skin',
    price: 1499,
    image: '/laptop-skin-carbon.png',
    category: 'Skins',
    description: 'A modern, high-tech look with authentic carbon fiber texture.',
    images: [
      '/laptop-skin-carbon.png',
      '/laptop-skin-carbon-close1.png',
      '/laptop-skin-carbon-close2.png',
      '/laptop-skin-carbon-close3.webp',
      '/laptop-skin-carbon-close4.webp',
    ]
  },
  {
    id: 4,
    name: 'Cobalt Blue Strap',
    price: 999,
    image: '/anarc-watch-close-up-4.png',
    category: 'Accessories',
    description: 'Durable, comfortable silicone for your Anarc watch.',
    images: [
      '/anarc-watch-close-up-4.png',
      '/strap-lifestyle-1.png',
      '/strap-lifestyle-2.png'
    ],
    highlights: [
      'Sweat & Water Resistant',
      'Quick-Release Pin Design',
      'Ultra Comfort Silicone Material'
    ]
  }
];
// --- Images for HomePage Sections ---

// Section 1: Hero
export const HERO_IMAGES = {
    background: "/anarc-watch-black.png",
    mainWatch: "/anarc-watch-black1.png",
    logo: "/layers-logo.png"
};

export const ABOUT_CTA_IMAGE = "/anarc-watch-black.png"; // Or any other image you prefer

// Section 2: Cinematic Showcase
export const CINEMATIC_IMAGE = "/anarc-watch-lifestyle.png";

// Section 3: Interactive Sticky Scroll
export const SCROLL_IMAGES = [
    "/anarc-watch-health1.png",
    "/anarc-watch-gps1.png",
    "/anarc-watch-battery.png"
];

// Section 4: "A Closer Look" Gallery
export const GALLERY_IMAGES = [
    "/anarc-watch-close-up-3.png",
    "/anarc-watch-close-up-1.png",
    "/anarc-watch-close-up-4.png"
];

// Section 5: Interactive Exploded View
export const EXPLODED_VIEW_IMAGE = "/anarc-watch-exploded.png";

// Section 6: Video Banner
export const VIDEO_SRC = "/anarc-watch-video.mp4";

// Section 7: Bento Grid
export const BENTO_GRID_IMAGE = "/chaotic-mobile.png";

// Section 8: Founders Section
export const FOUNDER_IMAGE = "/founder-main.png";

// Section 9: "From the Community" Carousel
export const CAROUSEL_IMAGES = [
    "/founder-carousel-1.png",
    "/founder-carousel-2.png",
    "/founder-carousel-3.png",
    "/founder-carousel-4.png",
    "/founder-carousel-5.png",
    "/founder-carousel-6.png",
    "/founder-carousel-7.png"
];

// Section 10: Final CTA
export const CTA_IMAGES = {
    darkBrilliance: "/product-dark-brilliance.png",
    frostBlaze: "/product-frost-blaze.png",
    mobileSkin: "/chaotic-mobile.png",
    strap: "/chaotic-strap.png"
};

// --- Data for AboutPage ---
export const TIMELINE_EVENTS = [
    { year: 2018, title: 'TechBurner Begins', description: 'Shlok Srivastava starts the TechBurner YouTube channel, driven by a passion for technology.' },
    { year: 2020, title: '5 Million Strong', description: 'The channel reaches a massive milestone, building a huge community of tech enthusiasts.' },
    { year: 2022, title: 'Layers is Born', description: 'Identifying a need for quality personalization, Layers is launched to bring style to tech.' },
    { year: 2024, title: 'Anarc Launch', description: 'Layers enters the hardware space with the launch of the Anarc smartwatch, combining style and tech.' },
];
