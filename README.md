# RecipeNest 🍳

RecipeNest is your all-in-one platform to discover, share, and manage recipes from around the world. Whether you're a home cook, a professional chef, or someone who just loves food, RecipeNest offers a delightful and interactive experience:

---

## ✨ Features

- **Recipe Discovery:** Browse and discover a diverse collection of community-contributed recipes.
- **Personalized Search & Filters:** Find recipes by type, meal, dietary preference, season, occasion, and more.
- **Weather-Based Recommendations:** Get recipe suggestions tailored to your local weather.
- **Your Own Recipes:** Add, edit, and delete your recipes with step-by-step instructions and images.
- **Nutritional Insights:** See detailed nutritional breakdowns for every recipe and per serving.
- **Secure Authentication:** Register and log in securely using JWT-protected authentication.
- **Personal Dashboard:** Manage your contributed recipes in your profile.
- **Responsive & Fast:** Enjoy a seamless, mobile-friendly, and highly performant user experience.
- **SEO Optimized:** Server-rendered with rich metadata for maximum search visibility.

---

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

   Create a `.env.local` file in the root directory and add the required variables (see the Environment Variables section below).

4. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Environment Variables

Add the following to your `.env.local` file:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=RecipeNest
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/recipe-nest?retryWrites=true&w=majority
SECRET_KEY=<your_jwt_secret_minimum_32_characters>
WEATHER_API_KEY=<your_openweathermap_api_key>
EDAMAM_API_KEY=<your_edamam_api_key>
EDAMAM_APP_ID=<your_edamam_app_id>
```

---

## 📝 API Documentation

### Authentication

All routes that mutate data (create, update, delete recipes) require a Bearer JWT token in the `Authorization` header.  
Login and signup routes return a token upon successful authentication.

**Example header:**

```
Authorization: Bearer <your_jwt_token>
```

---

### Health Check

**GET** `/api/health`

- **Response:**
  ```json
  {
    "status": "OK",
    "timestamp": "2025-09-11T20:33:36Z",
    "uptime": 123.45,
    "environment": "development",
    "version": "1.0.0",
    "vercel": {
      "region": "local",
      "url": "localhost"
    }
  }
  ```
- **Purpose:** Health check for uptime and debugging.

---

### Recipes

#### Get All Recipes

- **GET** `/api/getAllRecipes`
- **Returns:**
  ```json
  {
    "recipes": [ { ...recipeObject } ]
  }
  ```

#### Get Recipe by ID

- **GET** `/api/getRecipeById/:id`
- **Returns:**
  ```json
  {
    "recipe": { ...recipeObject }
  }
  ```

#### Create Recipe

- **POST** `/api/createRecipe`
- **Auth:** Required
- **Content-Type:** `multipart/form-data`
- **Body:**
  - `name` (string, required)
  - `type`, `meal`, `time`, `difficulty`, `season`, `occasion` (string, required)
  - `dietaryType` (`Vegetarian` | `Non-Vegetarian` | `Vegan`, required)
  - `servings` (number, required)
  - `ingredients` (JSON stringified array of `{ name, quantity }`)
  - `instructions` (JSON stringified array of strings)
  - `image` (optional)
- **Returns:**
  - Success: `{ message: "Recipe created successfully", recipe: { ... } }`
  - Errors:
    - 401: Authentication required
    - 400: Validation error
    - 500: Server/database error

#### Update Recipe

- **PUT** `/api/updateRecipe/:id`
- **Auth:** Required
- **Body:** Same as Create
- **Returns:**
  - Success: `{ message: "Recipe updated", recipe: { ... } }`
  - Errors:
    - 401: Authentication required
    - 404: Not found
    - 400/500: Error

#### Delete Recipe

- **DELETE** `/api/deleteRecipe/:id`
- **Auth:** Required
- **Returns:**
  - Success: `{ message: "Recipe deleted" }`
  - Errors:
    - 401: Authentication required
    - 404: Not found
    - 400/500: Error

---

### Nutrition Info

- **Internal helper:** Uses [Edamam Nutrition API](https://developer.edamam.com/edamam-nutrition-api)
- **Example:** Called when creating/updating recipes to fetch nutrition data for given ingredients.

---

### User

#### Login

- **POST** `/api/login`
- **Body:** `{ email: string, password: string }`
- **Returns:**
  ```json
  {
    "token": "jwt_token",
    "user": { "name": "...", "email": "...", "_id": "..." }
  }
  ```
- **Errors:**
  - 401: Invalid credentials

#### Signup

- **POST** `/api/signup`
- **Body:** `{ name: string, email: string, password: string }`
- **Returns:** Same as Login

---

### Cache Revalidation

- **POST** `/api/revalidate`
- **Auth:** Required (uses secret in headers/body)
- **Purpose:** Triggers static/path revalidation for updated recipes & site content
- **Returns:**  
  `{ message: string, revalidated: boolean, paths: string[], now: timestamp }`
- **Errors:**
  - 400/500: Error message

---

## 📄 License

This project is licensed under the MIT License.

---

Made with ❤️ by [RecipeNest Team]
