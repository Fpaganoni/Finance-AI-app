# Finance-AI-app

<div align="center">

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

## 📋 Table of Contents

- [Finance-AI-app](#finance-ai-app)
  - [📋 Table of Contents](#-table-of-contents)
  - [🎯 Overview](#-overview)
  - [✨ Key Features](#-key-features)
  - [🛠 Technology Stack](#-technology-stack)
    - [Frontend Framework](#frontend-framework)
    - [UI \& Styling](#ui--styling)
    - [Forms \& Validation](#forms--validation)
    - [Data \& Visualization](#data--visualization)
    - [Internationalization \& Localization](#internationalization--localization)
    - [Additional Libraries](#additional-libraries)
    - [Development Tools](#development-tools)
  - [📁 Project Structure](#-project-structure)
  - [🚀 Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Edit .env.local with your configuration](#edit-envlocal-with-your-configuration)

---

## 🎯 Overview

**Finance-AI-app** is a sophisticated financial management application built with cutting-edge web technologies. This project leverages artificial intelligence and modern UI components to deliver a seamless user experience for financial analysis, tracking, and management. The application is designed with accessibility and internationalization in mind, providing users with a responsive, intuitive interface for their financial needs.

---

## ✨ Key Features

- **AI-Powered Analytics**: Intelligent financial insights and data analysis capabilities
- **Responsive Design**: Fully responsive interface that adapts to all device sizes
- **Multi-Language Support**: Built-in internationalization for global accessibility
- **Modern UI Components**: Comprehensive component library with Radix UI and Shadcn/ui
- **Real-Time Data Visualization**: Interactive charts and graphs powered by Recharts
- **Form Management**: Robust form handling with React Hook Form and Zod validation
- **Dark Mode Support**: Theme switching capability for enhanced user experience
- **Performance Optimized**: Built with Next.js for optimal performance and SEO
- **Analytics Integration**: Vercel Analytics for monitoring and insights

---

## 🛠 Technology Stack

### Frontend Framework

- **Next.js** (v16.2.4) - React framework for production-grade applications
- **React** (v19) - UI library for building interactive components
- **TypeScript** (v5.7.3) - Type-safe JavaScript development

### UI & Styling

- **Tailwind CSS** (v4.2.0) - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide React** - Comprehensive icon library
- **Class Variance Authority** - Type-safe CSS class composition

### Forms & Validation

- **React Hook Form** (v7.54.1) - Performant, flexible form library
- **Zod** (v3.24.1) - TypeScript-first schema validation
- **@hookform/resolvers** - Form resolver for Zod integration

### Data & Visualization

- **Recharts** (v2.15.0) - Composable charting library
- **date-fns** (v4.1.0) - Modern date utility library

### Internationalization & Localization

- **next-intl** (v4.11.1) - Internationalization solution for Next.js

### Additional Libraries

- **next-themes** - Theme management and persistence
- **react-resizable-panels** - Flexible panel layout system
- **Embla Carousel** - Carousel component library
- **Sonner** - Toast notification system
- **Vaul** - Drawer component library
- **Vercel Analytics** - Performance monitoring and analytics

### Development Tools

- **ESLint** - Code linting and quality assurance
- **PostCSS** (v8.5) - CSS transformation tool
- **Autoprefixer** - Automatic CSS vendor prefixes

---

## 📁 Project Structure

Finance-AI-app/ ├── public/ # Static assets ├── src/ │ ├── components/ # Reusable React components │ ├── pages/ # Next.js pages and routing │ ├── styles/ # Global styles and Tailwind configuration │ └── utils/ # Utility functions and helpers ├── package.json # Project dependencies and scripts ├── tailwind.config.ts # Tailwind CSS configuration ├── tsconfig.json # TypeScript configuration └── next.config.js # Next.js configuration

Code

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v18.0.0 or higher)
- **pnpm** (v8.0.0 or higher) - recommended package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Fpaganoni/Finance-AI-app.git
   cd Finance-AI-app
   Install dependencies
   ```

bash
pnpm install
Configure environment variables (if required)

bash
cp .env.example .env.local

# Edit .env.local with your configuration

📝 Available Scripts
The following scripts are available in the package.json file:

Script Description
pnpm run dev Start the development server at http://localhost:3000
pnpm run build Create an optimized production build
pnpm run start Start the production server
pnpm run lint Run ESLint to check code quality and identify issues
💻 Development
Starting the Development Server
bash
pnpm run dev
The application will be accessible at http://localhost:3000. The development server implements hot module reloading for a seamless development experience.

Building for Production
bash
pnpm run build
pnpm run start
This creates an optimized production build and serves it locally. The build process optimizes bundle sizes and performance metrics.

Code Quality
Maintain code quality by running the linter before committing changes:

bash
pnpm run lint
🌐 Internationalization
The application supports multiple languages through the next-intl library. Configuration and translation files are typically located in the project structure. Users can seamlessly switch between supported languages while maintaining application state.

🎨 Theme Management
The application includes built-in theme switching capability powered by next-themes. Users can toggle between light and dark modes with automatic persistence of their preference.

📊 Analytics
Vercel Analytics is integrated to track application performance, user interactions, and provide insights into application health and usage patterns.

📄 Language Composition
TypeScript: 96.1%
CSS: 3.7%
JavaScript: 0.2%
This composition reflects a strongly typed, modern TypeScript-first development approach with minimal JavaScript and organized styling.

🤝 Contributing
Contributions are welcome! If you would like to contribute to this project:

Fork the repository
Create a feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request
Please ensure your code adheres to the project's linting standards and follows the established code style.

📞 Support
For questions, issues, or suggestions, please open an issue on the GitHub Issues page.

📜 License
This project is available under the MIT License. See the LICENSE file for more details.

<div align="center">
Made with ❤️ by Fpaganoni

![GitHub Last Commit](https://img.shields.io/github/last-commit/Fpaganoni/Finance-AI-app?style=flat-square) ![Repository Size](https://img.shields.io/github/repo-size/Fpaganoni/Finance-AI-app?style=flat-square)

Live: soon..

</div>
