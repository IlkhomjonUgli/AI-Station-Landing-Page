# 🚀 Quick Start Guide - AI Station Platform

## Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd ai-station
npm install
```
This will install React, React Router, Framer Motion, and all other dependencies.

### Step 2: Start Development Server
```bash
npm run dev
```
Your site will automatically open at http://localhost:3000

### Step 3: Start Customizing!
- Edit content in `src/pages/` files
- Modify colors in `src/styles/main.css`
- Add new components in `src/components/`

## 🎨 What's Included

✅ 6 Complete Pages (Home, Programs, About, Blog, News, Contact)
✅ 10+ Reusable Components
✅ Dark Mode with Theme Toggle
✅ 3 Languages (EN, UZ, RU)
✅ Smooth Animations with Framer Motion
✅ Fully Responsive Design
✅ Contact Form with Validation
✅ AI Chatbot Widget
✅ FAQ Accordion
✅ Animated Stats Counter
✅ Newsletter Signup
✅ Cookie Consent Banner

## 📝 Quick Customization Tips

### Change Colors
File: `src/styles/main.css`
```css
:root {
  --primary-blue: #0052FF;  /* Your primary color */
  --primary-cyan: #00D9FF;  /* Your accent color */
}
```

### Update Contact Info
File: `src/pages/Contact.jsx`
Update phone, email, address in the contact cards.

### Add New Program
File: `src/pages/Home.jsx` or `src/pages/Programs.jsx`
Add to the `programs` array with your program details.

### Change Site Name
Files to update:
- `src/components/Navigation.jsx` (logo)
- `src/components/Footer.jsx` (branding)
- `index.html` (title and meta tags)

## 🔧 Build for Production

```bash
npm run build
```
Files will be in the `dist/` folder, ready to deploy!

## 📦 Deploy

Upload the `dist/` folder to:
- Netlify (drag & drop)
- Vercel (connect GitHub repo)
- Your own hosting

## 🆘 Troubleshooting

**Dependencies won't install?**
- Make sure you have Node.js 18+ installed
- Try: `npm install --legacy-peer-deps`

**Port 3000 in use?**
- Vite will automatically use next available port
- Or change port in `vite.config.js`

**Animations not smooth?**
- Enable hardware acceleration in your browser
- Check if Framer Motion installed: `npm list framer-motion`

## 💡 Pro Tips

1. **Development**: Use `npm run dev` for hot reload
2. **Production**: Always run `npm run build` before deploying
3. **Performance**: Images are lazy loaded automatically
4. **SEO**: Update meta tags in `index.html`
5. **Analytics**: Add your tracking code in `index.html`

## 📚 Learn More

- React: https://react.dev
- Vite: https://vitejs.dev
- Framer Motion: https://www.framer.com/motion
- React Router: https://reactrouter.com

---

Need help? Check the full README.md for detailed documentation!
