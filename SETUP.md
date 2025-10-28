# NewsHub - News Feed App Setup Guide

## 🚀 Quick Start

### 1. Get Your Free API Key

Get a free API key from [GNews.io](https://gnews.io):
1. Visit https://gnews.io
2. Click "Sign Up" and create a free account
3. Copy your API key from the dashboard
4. The free tier includes 100 requests per day

### 2. Add Your API Key

Open `src/lib/api.ts` and replace `YOUR_API_KEY_HERE` with your actual API key:

```typescript
const API_KEY = "your_actual_gnews_api_key_here";
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:8080`

## 📦 Build for Production

```bash
npm run build
```

## 🚀 Deploy

### Option 1: Deploy to Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com) and sign in
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy"

### Option 2: Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and sign in
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite settings
6. Click "Deploy"

### Option 3: Deploy via Lovable

Simply click the "Publish" button in Lovable to deploy instantly!

## ✨ Features Implemented

✅ **Core Requirements:**
- Fetch and display news articles with title, image, and description
- Search bar to search articles by keyword
- React functional components with hooks (useState, useEffect)
- Loading states with beautiful skeleton screens
- Error handling with retry functionality
- Tailwind CSS styling with modern design

✅ **Bonus Features:**
- Category filters (Technology, Sports, Business, Health, Entertainment, Science)
- Dark/Light theme toggle with persistence
- Smooth animations and transitions
- Responsive design for all screen sizes
- SEO optimized with proper meta tags

## 🎨 Tech Stack

- **Frontend:** React.js 18 (functional components)
- **Styling:** Tailwind CSS with custom design system
- **API:** GNews.io
- **State Management:** React Query (@tanstack/react-query)
- **UI Components:** shadcn/ui
- **Build Tool:** Vite
- **TypeScript:** Full type safety

## 📁 Project Structure

```
src/
├── components/
│   ├── CategoryFilter.tsx    # Category filter buttons
│   ├── ErrorState.tsx         # Error state component
│   ├── Header.tsx             # App header with logo
│   ├── LoadingSkeleton.tsx    # Loading skeleton screens
│   ├── NewsCard.tsx           # Individual news card
│   ├── SearchBar.tsx          # Search input component
│   ├── ThemeToggle.tsx        # Dark/light mode toggle
│   └── ui/                    # shadcn UI components
├── lib/
│   ├── api.ts                 # GNews API integration
│   └── utils.ts               # Utility functions
├── pages/
│   ├── Index.tsx              # Main page
│   └── NotFound.tsx           # 404 page
├── hooks/
│   ├── use-mobile.tsx         # Mobile detection hook
│   └── use-toast.ts           # Toast notifications hook
├── App.tsx                    # App wrapper with routing
├── main.tsx                   # App entry point
└── index.css                  # Design system & global styles
```

## 🎯 API Usage Notes

- Free tier: 100 requests per day
- For production apps, consider upgrading to a paid plan
- API responses are cached for 5 minutes to reduce requests
- Error handling includes specific messages for API key issues

## 💡 Tips for Assignment Submission

1. **GitHub Repository:**
   - Make sure your repo is public
   - Include this SETUP.md file
   - Add screenshots to README.md (optional but recommended)

2. **Live Deployment:**
   - Test the live site before submitting
   - Ensure API key is configured in your deployed version
   - Check that all features work as expected

3. **Email to:** hr@appdost.in
   - Include both GitHub repo link and live deployment link
   - Mention "NewsHub - News Feed App Assignment"

## 🐛 Troubleshooting

### "Invalid API key" Error
- Double-check you've replaced `YOUR_API_KEY_HERE` in `src/lib/api.ts`
- Ensure your API key is active on GNews.io
- Check if you've exceeded the daily request limit

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Make sure you're using Node.js version 16 or higher

### API Request Limit
- Free tier has 100 requests/day
- Each search/category change counts as 1 request
- Responses are cached for 5 minutes to help manage limits

## 📞 Support

For any issues or questions about this assignment, contact AppDost at hr@appdost.in

---

**Built with ❤️ for AppDost Assignment | Deadline: October 27, 2025**
