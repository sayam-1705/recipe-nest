# RecipeNest 🍳

A modern, full-stack recipe sharing platform built with Next.js 15, MongoDB, and TailwindCSS.

## 🌟 Features

- **Recipe Discovery**: Browse and discover amazing recipes from the community
- **Weather-Based Suggestions**: Get recipe recommendations based on your local weather
- **User Authentication**: Secure login and registration system
- **Recipe Management**: Create, edit, and delete your own recipes
- **Nutrition Information**: Detailed nutritional analysis for each recipe
- **Responsive Design**: Fully responsive design that works on all devices
- **SEO Optimized**: Server-side rendering with proper metadata and structured data

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: MongoDB with Mongoose
- **Styling**: TailwindCSS
- **State Management**: TanStack Query (React Query)
- **Authentication**: JWT with bcryptjs
- **Image Optimization**: Next.js Image component
- **Deployment**: Vercel
- **TypeScript**: Full type safety

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- MongoDB database (MongoDB Atlas recommended for production)

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/sayam-1705/recipe-nest.git
   cd recipe-nest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_minimum_32_characters
   WEATHER_API_KEY=your_openweathermap_api_key
   NUTRITION_API_KEY=your_nutrition_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment on Vercel

### Automatic Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and configure the build settings

3. **Configure Environment Variables**
   In your Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add all the variables from your `.env.example`:
     ```
     NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
     MONGODB_URI=your_mongodb_atlas_connection_string
     JWT_SECRET=your_jwt_secret_minimum_32_characters
     WEATHER_API_KEY=your_openweathermap_api_key
     NUTRITION_API_KEY=your_nutrition_api_key
     GOOGLE_SITE_VERIFICATION=your_google_site_verification
     REVALIDATION_SECRET=your_revalidation_secret
     ```

4. **Redeploy**
   - After setting environment variables, redeploy from the Vercel dashboard

### Manual Deployment with Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

## 🗄️ Database Setup

### MongoDB Atlas (Recommended for Production)

1. Create account at [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new cluster
3. Create a database user
4. Get your connection string
5. Replace `<username>`, `<password>`, and `<dbname>` in the connection string
6. Add to environment variables

### Local MongoDB (Development)

1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/recipe-nest`

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_APP_URL` | Your app's public URL | ✅ |
| `MONGODB_URI` | MongoDB connection string | ✅ |
| `JWT_SECRET` | JWT secret key (min 32 chars) | ✅ |
| `WEATHER_API_KEY` | OpenWeatherMap API key | ❌ |
| `NUTRITION_API_KEY` | Nutrition API key | ❌ |
| `GOOGLE_SITE_VERIFICATION` | Google verification code | ❌ |
| `REVALIDATION_SECRET` | Secret for revalidation API | ❌ |

## 📝 API Routes

- `GET /api/getAllRecipes` - Get all recipes
- `GET /api/getRecipeById/[id]` - Get recipe by ID  
- `POST /api/createRecipe` - Create new recipe
- `PUT /api/updateRecipe/[id]` - Update recipe
- `DELETE /api/deleteRecipe/[id]` - Delete recipe
- `POST /api/login` - User login
- `POST /api/signup` - User registration
- `POST /api/revalidate` - Revalidate cache

## 🎨 Customization

### Colors
The app uses a custom color palette defined in `tailwind.config.ts`. Main colors:
- Primary Orange: `#f97316`
- Secondary Green: `#10b981`
- Neutral tones for backgrounds and text

### Components
All components are located in `/src/components/` and are fully customizable.

## 📱 Features

- ✅ Server-Side Rendering (SSR)
- ✅ Static Site Generation (SSG) for recipe pages
- ✅ Image optimization
- ✅ SEO optimization with metadata
- ✅ Responsive design
- ✅ Error boundaries
- ✅ Loading states
- ✅ Form validation
- ✅ Authentication system
- ✅ Recipe CRUD operations
- ✅ Nutrition chart visualization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🔧 Troubleshooting

### Common Issues

1. **Build Errors**
   - Make sure all environment variables are set
   - Check that MongoDB is accessible
   - Verify Node.js version (18+)

2. **API Issues**
   - Check MongoDB connection string
   - Verify JWT secret is set and minimum 32 characters
   - Check API route permissions

3. **Deployment Issues**
   - Make sure all environment variables are set in Vercel
   - Check build logs in Vercel dashboard
   - Verify domain configuration

### Performance Tips

- Use Next.js Image component for all images
- Implement proper caching strategies
- Optimize bundle size with dynamic imports
- Use static generation where possible

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Made with ❤️ by [RecipeNest Team]
