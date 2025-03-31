# HEXES Band Website

A modern, minimalistic website for the metal band HEXES, featuring sophisticated animations and interactive elements.

## Project Overview

This website is designed with a clean, minimal aesthetic while incorporating engaging visual effects. The site features:

- Animated hexagonal elements with parallax effects
- Interactive Oracle card section
- Gallery with lightbox functionality
- Band member information
- Social media integration

## File Structure

```
hexes-website/
├── assets/
│   ├── images/
│   │   ├── gallery/
│   │   │   └── [gallery images].jpg
│   │   └── [band member images].jpg
│   ├── fonts/
│   └── icons/
├── css/
│   ├── main.css
│   ├── animations.css
│   └── components/
│       ├── navbar.css
│       ├── hexagon.css
│       ├── oracle.css
│       ├── band.css
│       └── gallery.css
├── js/
│   ├── main.js
│   ├── animations.js
│   ├── parallax.js
│   └── components/
│       ├── hexAnimation.js
│       ├── oracle.js
│       └── gallery.js
├── pages/
│   ├── band.html
│   ├── gallery.html
│   └── oracle.html
└── index.html
```

## Key Features

### 1. Hexagon Animation

The centerpiece of the site is an animated set of concentric hexagons that rotate at different speeds and in different directions. The hexagons are built with CSS clip-path and feature:

- Independent rotation of each layer
- Parallax effects on mouse movement
- Subtle hover interactions

### 2. Oracle Card

An interactive feature where visitors can:
- Click to flip a card
- Receive a random inspirational message
- Generate new messages with a button

### 3. Responsive Gallery

A clean, minimal gallery that:
- Uses CSS grid for responsive layout
- Features hexagonal hover effects
- Includes a lightbox for full-screen viewing
- Supports keyboard navigation

### 4. Animations and Transitions

The site incorporates subtle animations throughout:
- Page transitions
- Scroll-based reveal animations
- Staggered content loading
- Parallax effects

## Setup and Deployment

1. Clone this repository
2. Add your band images to the assets/images folder
3. Customize content in HTML files
4. Update social media links in the footer sections

## Customization

### Colors

The color scheme is defined in CSS variables in `main.css`. To change the color palette, modify the following variables:

```css
:root {
    --gold-dark: rgba(184, 134, 11, 0.9);
    --gold-medium: rgba(218, 165, 32, 0.8);
    --gold-light: rgba(250, 214, 137, 0.7);
    --gold-lightest: rgba(255, 236, 179, 0.4);
    --text-color: #333;
    --bg-color: #fff;
}
```

### Oracle Messages

To customize the Oracle card messages, edit the `messages` array in `js/components/oracle.js`.

### Gallery Images

Replace the placeholder images in `assets/images/gallery/` with your own band photos, maintaining the same file names or updating the references in `gallery.html`.

## Browser Compatibility

This website is designed to work on modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Credits

- Fonts: [Google Fonts - Rajdhani](https://fonts.google.com/specimen/Rajdhani)
- Smooth scrolling and animations based on IntersectionObserver API