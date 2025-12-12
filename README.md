# Developer Dashboard

A modern, responsive developer dashboard built with React and Tailwind CSS that displays real-time data from GitHub and weather APIs.

## Features

- **GitHub Profile Card**: Displays user avatar, repositories, followers, and following count
- **Weather Card**: Shows current weather conditions, temperature, wind speed, and real-time clock
- **Dark/Light Mode Toggle**: Persistent theme switching with smooth transitions
- **Responsive Design**: Works seamlessly across mobile, tablet, and desktop devices

## APIs Used

- **GitHub API**: `https://api.github.com/users/[username]`
- **OpenWeatherMap API**: For weather data (with fallback to demo data)

## Technologies Used

- React 18
- Tailwind CSS
- Axios for API calls
- Local Storage for theme persistence

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd developer-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/
│   ├── Navbar.js          # Navigation with theme toggle
│   ├── GitHubCard.js      # GitHub profile display
│   └── WeatherCard.js     # Weather information display
├── App.js                 # Main application component
├── index.js              # Application entry point
└── index.css             # Tailwind CSS imports
```

## Customization

- **GitHub Username**: Change the `username` prop in `App.js`
- **Weather Location**: Modify the `city` prop in `App.js`
- **Weather API**: Add your OpenWeatherMap API key in `WeatherCard.js`

## Build for Production

```bash
npm run build
```

## Deployment

This project can be deployed to:
- Vercel
- Netlify
- GitHub Pages

## Screenshots

![Dashboard Screenshot](screenshot.png)

## License

MIT License