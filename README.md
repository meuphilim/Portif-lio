# 🚀 Automated GitHub Portfolio

A modern, responsive portfolio website that automatically generates and updates from your GitHub repositories using CI/CD pipelines.

## ✨ Features

- 📊 **Automatic repository listing** from GitHub API
- 🎨 **Responsive design** with modern UI/UX
- 📈 **Language statistics** with visual charts
- 🔄 **Automated updates** every 12 hours via GitHub Actions
- 🌐 **Dual deployment** to GitHub Pages and Vercel
- 🏷️ **Repository badges and topics** display
- 🔗 **Live demo links** when available
- 🛡️ **Error handling** with fallback data
- ⚡ **Performance optimized** with static generation

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel + GitHub Pages
- **CI/CD**: GitHub Actions
- **API**: GitHub REST API v3

## 🚀 Quick Start

### 1. Clone and Install

\`\`\`bash
git clone https://github.com/yourusername/portfolio-github.git
cd portfolio-github
npm ci
\`\`\`

### 2. Environment Setup

\`\`\`bash
cp .env.example .env.local
# Edit .env.local with your GitHub username and token
\`\`\`

### 3. Local Development

\`\`\`bash
npm run dev
# Open http://localhost:3000
\`\`\`

### 4. Build and Deploy

\`\`\`bash
npm run build  # Build for production
npm run start  # Start production server
\`\`\`

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GITHUB_USERNAME` | Your GitHub username | ✅ |
| `NEXT_PUBLIC_GITHUB_USERNAME` | Public GitHub username | ✅ |
| `GITHUB_TOKEN` | GitHub Personal Access Token | ⚠️ Recommended |
| `VERCEL_TOKEN` | Vercel deployment token | 🔧 For CI/CD |
| `VERCEL_ORG_ID` | Vercel organization ID | 🔧 For CI/CD |
| `VERCEL_PROJECT_ID` | Vercel project ID | 🔧 For CI/CD |

### GitHub Repository Secrets

Configure these in your repository settings under **Settings > Secrets and variables > Actions**:

- `GITHUB_TOKEN`: Personal access token with `public_repo` scope
- `VERCEL_TOKEN`: Vercel API token
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID

## 🔄 Automated Workflows

### 1. Continuous Integration (`ci.yml`)
- **Triggers**: Push to main/develop, Pull requests
- **Actions**: Lint, type check, build validation, tests
- **Duration**: ~3-5 minutes

### 2. Vercel Deployment (`deploy-vercel.yml`)
- **Triggers**: Push to main (excluding docs)
- **Actions**: Build and deploy to Vercel production
- **Duration**: ~2-3 minutes

### 3. Scheduled Updates (`scheduled-update.yml`)
- **Triggers**: Every 12 hours (00:00, 12:00 UTC)
- **Actions**: Update portfolio data, deploy to GitHub Pages
- **Duration**: ~2-3 minutes

## 📊 Project Structure

\`\`\`
portfolio-github/
├── 📁 .github/workflows/     # GitHub Actions workflows
├── 📁 app/                   # Next.js App Router
│   ├── 📁 api/              # API routes
│   ├── 📄 layout.tsx        # Root layout
│   ├── 📄 page.tsx          # Main page
│   └── 📄 globals.css       # Global styles
├── 📁 scripts/              # Utility scripts
├── 📄 .env.example          # Environment variables template
├── 📄 .gitignore           # Git ignore rules
├── 📄 next.config.js       # Next.js configuration
├── 📄 package.json         # Dependencies and scripts
├── 📄 tailwind.config.js   # Tailwind CSS configuration
├── 📄 tsconfig.json        # TypeScript configuration
└── 📄 vercel.json          # Vercel deployment configuration
\`\`\`

## 🔧 Development

### Available Scripts

\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # Run TypeScript type checking
npm run format       # Format code with Prettier
npm run clean        # Clean build artifacts
npm test             # Run tests
\`\`\`

### Code Quality

- **ESLint**: Code linting with Next.js recommended rules
- **Prettier**: Code formatting with consistent style
- **TypeScript**: Type safety and better developer experience
- **Husky**: Git hooks for pre-commit validation

## 🚀 Deployment

### Automatic Deployment

The project automatically deploys to both platforms:

1. **GitHub Pages**: Static site at `https://yourusername.github.io/portfolio-github`
2. **Vercel**: Dynamic site at `https://portfolio-github-yourusername.vercel.app`

### Manual Deployment

\`\`\`bash
# Deploy to Vercel
npx vercel --prod

# Generate static site
npm run generate
\`\`\`

## 🛡️ Error Handling

The application includes comprehensive error handling:

- **API Fallbacks**: Uses cached data when GitHub API is unavailable
- **Rate Limiting**: Graceful handling of GitHub API rate limits
- **Build Resilience**: Continues building even with API failures
- **User Feedback**: Clear error messages and status indicators

## 📈 Performance

- **Static Generation**: Pre-built pages for optimal performance
- **Image Optimization**: Optimized GitHub avatars and assets
- **Caching**: Strategic caching of API responses
- **Bundle Analysis**: Optimized JavaScript bundles
- **Core Web Vitals**: Optimized for Google's performance metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [GitHub Actions logs](../../actions)
2. Verify your environment variables
3. Review the [Vercel deployment logs](https://vercel.com/dashboard)
4. Open an issue with detailed information

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Vercel](https://vercel.com/) for seamless deployment
- [GitHub](https://github.com/) for the powerful API and Actions
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first styling
