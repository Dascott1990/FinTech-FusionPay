💳 FinTech FusionPay
A modern FinTech mobile app built with React Native, Expo, and Clerk, designed for secure payments and seamless banking experiences. 🚀

🔹 Secure OTP Authentication (Clerk)
🔹 Real-Time Crypto Prices (CoinMarketCap API)
🔹 Interactive Charts & Graphs (Victory Native XL)
🔹 Gesture-Based Navigation (Expo Router & Reanimated 3)

📸 Screenshots
<p align="center"> <img src="./screenshots/1.png" width="20%"> <img src="./screenshots/2.png" width="20%"> <img src="./screenshots/3.png" width="20%"> <img src="./screenshots/4.png" width="20%"> <img src="./screenshots/5.png" width="20%"> <img src="./screenshots/6.png" width="20%"> <img src="./screenshots/7.png" width="20%"> <img src="./screenshots/8.png" width="20%"> <img src="./screenshots/9.png" width="20%"> <img src="./screenshots/10.png" width="20%"> <img src="./screenshots/11.png" width="20%"> </p>
🎥 Demo
<p align="center"> <img src="./screenshots/login.gif" width="30%"> <img src="./screenshots/state.gif" width="30%"> <img src="./screenshots/lockscreen.gif" width="30%"> <img src="./screenshots/charts.gif" width="30%"> <img src="./screenshots/icon.gif" width="30%"> </p>
🚀 Features
✅ User Authentication – OTP-based login using Clerk
✅ Real-time Crypto Prices – Fetch live market data from CoinMarketCap
✅ Interactive Charts – Visualize transactions and trends with Victory Native
✅ Gesture-Based Navigation – Swipe, tap, and drag interactions powered by Reanimated 3
✅ State Management – Optimized with Zustand & MMKV for fast performance

🛠️ Tech Stack
Frontend: React Native, Expo Router, Reanimated 3, Gesture Handler
State Management: Zustand + MMKV
Authentication: Clerk (OTP-based sign-up & login)
APIs: CoinMarketCap API (for live crypto prices)
UI/UX: Styled Components, NativeBase
⚡ Installation & Setup
🔹 1. Clone the repository
sh
Copy
Edit
git clone https://github.com/Dascott1990/FinTech-FusionPay.git
cd FinTech-FusionPay
🔹 2. Install dependencies
sh
Copy
Edit
npm install  # or yarn install
🔹 3. Set up your environment variables
Create a .env file and add your Clerk & CoinMarketCap API keys:

sh
Copy
Edit
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
COINMARKETCAP_API_KEY=your_api_key
🔹 4. Run the app
sh
Copy
Edit
npx expo start
🔑 Authentication with Clerk
FinTech FusionPay uses Clerk for secure OTP-based authentication.

📌 Steps to Set Up Clerk Authentication
Sign up at Clerk Dashboard
Create a new project & get your Publishable & Secret keys
Add the keys to your .env file
📈 APIs Used
🔹 Clerk – User Authentication
🔹 CoinMarketCap – Fetch Live Crypto Data
🏗️ Project Structure
sh
Copy
Edit
/FinTech-FusionPay
│── /app
│   ├── /(authenticated)
│   │   ├── /home.tsx
│   │   ├── /transactions.tsx
│   │   ├── /settings.tsx
│   ├── login.tsx
│   ├── signup.tsx
│── /components
│── /constants
│── /hooks
│── /services
│── /state
│── .env
│── package.json
│── app.json
│── README.md
This structure keeps authentication, UI components, and API services modular.

❗ Common Issues & Fixes
🔹 1. Cannot find native module ExpoApplication?
✅ Fix: Upgrade Expo SDK

sh
Copy
Edit
npx expo install --fix
npx expo upgrade 51
🔹 2. "Invalid Publishable Key" Error in Clerk?
✅ Fix: Ensure your publishable key is correct in .env

sh
Copy
Edit
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_correct_key
🔹 3. App Crashing on iOS?
✅ Fix: Ensure your Apple device is trusted for development

sh
Copy
Edit
eas build --profile development --platform ios
🤝 Contributing
Want to improve this project? Open an Issue or Pull Request on GitHub! 🚀

📜 License
This project is MIT Licensed – feel free to use and modify it.

📬 Contact
📧 Email: your-email@example.com
🐦 Twitter: @yourhandle
🚀 GitHub: Dascott1990

🌟 Star this repo if you like it! 🚀🔥