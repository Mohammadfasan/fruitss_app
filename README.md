# 🍎 Fruits Order App (React Native + Firebase)

A beautiful and intuitive mobile application for browsing fruits, selecting favorites, and placing orders seamlessly. Built with React Native, Firebase, and styled with Tailwind CSS.

![React Native](https://img.shields.io/badge/React%20Native-Mobile%20App-blue)
![Firebase](https://img.shields.io/badge/Firebase-Backend-orange)
![Status](https://img.shields.io/badge/Status-Live-success)

## 🚀 Live Demo & Source

* **GitHub Repository:** [Fruits Order App](https://lnkd.in/gwJgyihg)
* **Demo Video:** [Watch Demo]() *(Add your demo video link here)*
* **Download APK:** [Download Here]() *(Add your APK download link if available)*

## 📋 Table of Contents

- [Features](#-features)
- [Screens](#-screens)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [Firebase Setup](#-firebase-setup)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🏠 Home Screen
- Beautiful fruit catalog with attractive images
- Smooth scrolling and intuitive navigation
- Search functionality to find specific fruits

### 🛒 Shopping Cart
- Add/remove fruits from cart
- Real-time cart updates
- Quantity selection for each fruit
- Total price calculation

### 🔐 User Authentication
- Secure login and registration
- User profile management
- Order history tracking

### 📦 Order Management
- Easy order placement process
- Order confirmation and tracking
- Order history with status updates

### 💰 Payment Integration
- Secure payment processing
- Multiple payment options
- Order summary before payment

## 📱 Screens

- **Home Screen** - Browse available fruits
- **Product Details** - View fruit details and add to cart
- **Cart Screen** - Review and manage cart items
- **Checkout Screen** - Complete order with delivery details
- **Profile Screen** - User account and order history
- **Login/Register** - User authentication

## 🛠 Tech Stack

* **Frontend:** React Native, Expo
* **Styling:** Tailwind CSS (NativeWind)
* **Backend:** Firebase (Firestore, Auth, Storage)
* **State Management:** React Context API / Redux
* **Navigation:** React Navigation
* **Payment:** Stripe Integration (Optional)

## 📸 Screenshots

*(Add your app screenshots here)*

| Home Screen | Product Details | Shopping Cart |
|:---:|:---:|:---:|
| <img src="screenshots/home.png" width="200"> | <img src="screenshots/details.png" width="200"> | <img src="screenshots/cart.png" width="200"> |

| Checkout | Profile | Authentication |
|:---:|:---:|:---:|
| <img src="screenshots/checkout.png" width="200"> | <img src="screenshots/profile.png" width="200"> | <img src="screenshots/login.png" width="200"> |

## 💻 Installation

Follow these steps to set up the project locally on your machine.

### Prerequisites
- Node.js (v14 or above)
- npm or yarn
- Expo CLI
- Android Studio / Xcode (for emulator)
- Firebase Account

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/fruits-order-app.git
   cd fruits-order-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install Expo CLI globally** (if not already installed)
   ```bash
   npm install -g expo-cli
   ```

4. **Start the development server**
   ```bash
   expo start
   # or
   npm start
   ```

## 🔑 Environment Variables

Create a `.env` file in the root directory and add your Firebase configuration:

```env
# Firebase Configuration
API_KEY=your_firebase_api_key
AUTH_DOMAIN=your_project_auth_domain
PROJECT_ID=your_firebase_project_id
STORAGE_BUCKET=your_storage_bucket
MESSAGING_SENDER_ID=your_sender_id
APP_ID=your_firebase_app_id

# Optional: Stripe Configuration
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## 📱 Usage

1. **Run on Android/iOS Device:**
   - Install Expo Go app on your mobile device
   - Scan the QR code from terminal or browser
   - The app will load on your device

2. **Run on Emulator:**
   - Press 'a' for Android emulator
   - Press 'i' for iOS simulator
   - Press 'w' for web browser

## 🔥 Firebase Setup

1. Create a new Firebase project
2. Enable Authentication (Email/Password)
3. Create a Firestore Database
4. Set up Storage for product images
5. Add your web app to Firebase project
6. Copy configuration to your `.env` file

## 🚀 Future Enhancements

- [ ] Push notifications for order updates
- [ ] Favorite fruits functionality
- [ ] Advanced filtering and sorting
- [ ] Social media sharing
- [ ] Delivery tracking with maps
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Voice search functionality

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### 🌟 If you like this project, give it a star! ⭐

**Built with ❤️ using React Native & Firebase**

</div>
