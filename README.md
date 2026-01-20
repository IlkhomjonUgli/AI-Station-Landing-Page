# AI Station - Complete Education Platform

A modern, professional AI education platform built with React, featuring responsive design, smooth animations, and comprehensive functionality.

## 🚀 Features

### Design & UX
- **Distinctive Design**: Custom color scheme with blue-to-cyan gradients
- **Unique Typography**: Outfit for headings, DM Sans for body, JetBrains Mono for code
- **Smooth Animations**: Framer Motion powered transitions and scroll animations
- **Dark Mode**: Toggle between light and dark themes with smooth transitions
- **Fully Responsive**: Mobile-first design that works on all devices

### Functionality
- **Multi-page Application**: Home, Programs, About, Blog, News, Contact
- **Internationalization**: Support for English, Uzbek, and Russian
- **Interactive Components**:
  - Animated statistics counter
  - FAQ accordion
  - Contact form with validation
  - AI chatbot widget
  - Newsletter signup
  - Cookie consent banner

### Pages Included
1. **Home** - Hero, stats, about, programs, instructors, testimonials, process, FAQ, contact
2. **Programs** - Detailed course catalog with filtering
3. **About** - Team, mission, vision, timeline
4. **Blog** - Article listing with categories
5. **News** - Latest updates and announcements
6. **Contact** - Contact form, info, map, FAQ

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Quick Start

1. **Install Dependencies**
   ```bash
   cd ai-station
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   The site will open at `http://localhost:3000`

3. **Build for Production**
   ```bash
   npm run build
   ```
   Production files will be in the `dist` folder

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## 🎨 Design System

### Colors
- Primary: `#0052FF` (Blue), `#00D9FF` (Cyan)
- Secondary: `#6366F1` (Indigo), `#10B981` (Emerald), `#F59E0B` (Amber)
- Neutrals: `#0A0E27`, `#1F2937`, `#F3F4F6`, `#9CA3AF`

### Typography
- **Display Font**: Outfit (headings)
- **Body Font**: DM Sans (paragraphs)
- **Mono Font**: JetBrains Mono (code, numbers)

### Spacing
Based on 8px unit: 8, 16, 24, 32, 48, 64, 96px

## 📁 Project Structure

```
ai-station/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx
│   │   ├── Hero.jsx
│   │   ├── StatsCounter.jsx
│   │   ├── ProgramCard.jsx
│   │   ├── Footer.jsx
│   │   ├── ContactForm.jsx
│   │   ├── FAQ.jsx
│   │   └── Chatbot.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Programs.jsx
│   │   ├── About.jsx
│   │   ├── BlogNews.jsx
│   │   └── Contact.jsx
│   ├── utils/
│   │   ├── contexts.jsx (Theme & Language)
│   │   └── helpers.js (Animations & utilities)
│   ├── styles/
│   │   └── main.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Key Components

### Navigation
- Sticky header with smooth scroll
- Mobile hamburger menu
- Language switcher (EN/UZ/RU)
- Dark mode toggle

### Hero Section
- Animated text reveal
- Gradient background
- Floating cards
- CTAs with hover effects

### Stats Counter
- Animated number counters
- Scroll-triggered animations
- Progress bars

### Program Cards
- Hover lift effects
- Feature lists
- Pricing display
- Enrollment CTAs

### Contact Form
- Client-side validation
- Loading states
- Success/error feedback

### Chatbot Widget
- Floating chat button
- Quick replies
- Animated messages
- Responsive design

## 🌐 Multilingual Support

The platform supports three languages:
- English (EN)
- Uzbek (UZ)
- Russian (RU)

Language preference is saved in localStorage and persists across sessions.

## 🎨 Dark Mode

Toggle between light and dark themes. Preference is saved in localStorage.

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔧 Customization

### Update Colors
Edit CSS variables in `src/styles/main.css`:
```css
:root {
  --primary-blue: #0052FF;
  --primary-cyan: #00D9FF;
  /* etc. */
}
```

### Add New Pages
1. Create component in `src/pages/`
2. Import in `App.jsx`
3. Add route in `<Routes>` section

### Modify Content
All content is defined directly in components for easy editing.

## 📄 License

This project is created for AI Station educational platform.

## 🤝 Support

For questions or support:
- Email: info@aistation.uz
- Phone: +998 90 123 45 67
- Location: Tashkent, Uzbekistan

---

Built with ❤️ using React, Vite, and Framer Motion
