<div align="center">
  
# 🍳 RecipeNest

### _All-in-One Recipe Discovery_

[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](https://github.com/sayam-1705/recipe-nest)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.1.8-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)

</div>

## 🎯 About

RecipeNest is a modern full-stack web application for discovering, and managing recipes. Built with Next.js 15, TypeScript, and MongoDB, it offers weather-based recipe recommendations, nutritional analysis, and a comprehensive recipe management system.

## ✨ Features

- **Recipe Discovery** - Browse and search recipes with advanced filters
- **Weather Recommendations** - Get recipe suggestions based on your local weather
- **Nutrition Analysis** - Detailed nutritional breakdowns using Edamam API
- **User Authentication** - Secure JWT-based login and registration with Google OAuth support
- **Recipe Management** - Create, edit, and delete your own recipes
- **Responsive Design** - Mobile-first, optimized for all devices

## 🛠️ Tech Stack

- **Frontend:** Next.js 15.1.8, TypeScript, Tailwind CSS, React Query
- **Backend:** Node.js, MongoDB, Mongoose, JWT Authentication
- **External APIs:** OpenWeatherMap, Edamam Nutrition API
- **Tools:** ESLint, Vercel-ready deployment

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/sayam-1705/recipe-nest.git
cd recipe-nest

# Install dependencies
npm install

# Set up environment variables
cp .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Prerequisites

- Node.js ≥18.0.0
- MongoDB database
- API keys for OpenWeatherMap and Edamam

## 🔐 Environment Variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/recipe-nest
SECRET_KEY=your_jwt_secret_minimum_32_characters_long
WEATHER_API_KEY=your_openweathermap_api_key
EDAMAM_API_KEY=your_edamam_nutrition_api_key
EDAMAM_APP_ID=your_edamam_app_id
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

Get API keys from:

- [OpenWeatherMap](https://openweathermap.org/api)
- [Edamam Developer](https://developer.edamam.com/)
- [Google Cloud Console](https://console.cloud.google.com/) - Create OAuth 2.0 credentials

## 📝 API Endpoints

### Authentication

Protected routes require Bearer token: `Authorization: Bearer <token>`

### Key Endpoints

- `GET /api/getAllRecipes` - Get all recipes
- `GET /api/getRecipeById/[id]` - Get recipe by ID
- `POST /api/createRecipe` - Create recipe (Protected)
- `PUT /api/updateRecipe/[id]` - Update recipe (Protected)
- `DELETE /api/deleteRecipe/[id]` - Delete recipe (Protected)
- `POST /api/signup` - User registration
- `POST /api/login` - User login
- `GET /api/getRecipeBasedOnWeather` - Weather-based recommendations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and commit: `git commit -m "Add new feature"`
4. Push to the branch: `git push origin feature/new-feature`
5. Open a Pull Request

## 📄 License

This is a personal project. All rights reserved.

---

<div align="center">

**Made with ❤️ by [sayam-1705](https://github.com/sayam-1705)**

[⭐ Star this repo](https://github.com/sayam-1705/recipe-nest) • [🤝 Contribute](https://github.com/sayam-1705/recipe-nest/fork) • [� Report Issues](https://github.com/sayam-1705/recipe-nest/issues)

</div>
