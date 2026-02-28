# E-commerce Landing Page

A modern e-commerce website built with Next.js, featuring product browsing, shopping cart, user authentication, and a merchant dashboard.

## 🛠️ Tech Stack

- **Framework:** Next.js 16
- **UI Library:** NextUI + shadcn/ui
- **Styling:** Tailwind CSS 4
- **Database:** SQLite (via Prisma)
- **Authentication:** Custom with bcrypt
- **Payments:** Stripe integration

## 📦 Features

- **Public Pages:** Home, Shop, About, Contact, FAQ, Shipping, Terms, Team
- **User Features:** Login, Signup, Profile, Shopping Cart
- **Merchant Dashboard:** Product management, order handling
- **API:** RESTful endpoints for products, cart, auth, checkout

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Setup database
npm run db:push

# Seed sample data (optional)
npm run seed

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

## 📁 Project Structure

```
├── components/       # React components (Header, Footer, ProductCard, etc.)
├── context/          # React contexts (Auth, Cart)
├── lib/              # Utilities (Prisma client, Supabase client)
├── pages/            # Next.js pages and API routes
│   ├── api/          # API endpoints
│   ├── merchant/     # Merchant dashboard
│   └── products/     # Product pages
├── prisma/           # Database schema and seed
├── public/           # Static assets
└── styles/           # Global styles
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run db:push` | Push schema to database |
| `npm run seed` | Seed database with sample data |