
# TradeFlow Mobile Client

A premium, cross-platform mobile e-commerce application engineered with **React Native**. This project serves as the client-side interface for the **TradeFlow Ecosystem**, delivering a sophisticated "Old Money" aesthetic with high-performance user interactions.

The application is fully integrated with the **SpringTradeFlow** backend architecture, ensuring real-time data synchronization, secure transaction processing, and dynamic content management controlled directly via the TradeFlow Admin Panel.

## 📱 UI Showcase

| Member Access | Collection Home | Discovery & Filter | Catalogue Results | Product Detail |
| :---: | :---: | :---: | :---: | :---: |
| <img src="Screenshots/SignIn.png" width="180" alt="Screenshots/Sign In Screen"/> | <img src="Screenshots/Home.png" width="180" alt="Screenshots/Home Screen"/> | <img src="Screenshots/Filter.png" width="180" alt="Filter Screen"/> | <img src="Screenshots/SearchResults.png" width="180" alt="Results Screen"/> | <img src="Screenshots/Product.png" width="180" alt="Product Screen"/> |

## 🏗 System Architecture & Integration

This mobile client operates as a head for the headless commerce architecture provided by **SpringTradeFlow**.

### Backend Integration (SpringTradeFlow)
* **Real-Time Data Streaming:** Utilizes optimized RESTful endpoints to fetch catalog data, user profiles, and order history with minimal latency.
* **Synchronized Inventory:** Stock levels and product availability are updated instantly across the mobile app as changes occur in the warehouse or via the Admin Panel.
* **Secure Authentication:** Implements JWT-based authentication flows for secure session management and user data protection.

### Admin Panel Control
* **Dynamic Management:** All banners, featured collections (e.g., "Gentlemen/Ladies"), and trending tags visible in the mobile app are configurable in real-time from the Admin Panel.
* **Order Lifecycle:** Orders placed via the mobile app are immediately reflected in the Admin Dashboard for processing and fulfillment.

## 🛠 Technical Stack & Features

### Core Technologies
* **Framework:** React Native (CLI)
* **Language:** JavaScript / ES6+
* **Navigation:** React Navigation (Native Stack & Bottom Tabs) - Custom "Old Money" tab bar implementation.

### Key Implementations
* **Context API for Global State:**
    * `AuthContext`: Manages user sessions, token persistence, and guest/member states.
    * `FavoritesContext`: Optimistic UI updates for wishlist management, synchronized with the server.
    * `AnimationContext`: Manages intro sequences and layout transitions to ensure smooth UX.
* **Optimistic UI:** Instant visual feedback for user actions (e.g., "Add to Wishlist") while processing background API requests.
* **Advanced Networking:**
    * **Axios Interceptors:** Centralized request/response handling, error management, and token injection.
    * **QS (Query String):** Handling complex filtering parameters for search results.
* **Custom Design System:**
    * Bespoke components (`ProductBox`, `Button`, `Tabs`) designed to adhere to the strict minimal/luxury design language.
    * Use of specific typography (Didot / Times New Roman) and color palettes (Cream #FCFCF8, Burgundy #520000).
* **Performance:**
    * `FlatList` optimizations for large catalog rendering.
    * `Animated` API for smooth header transitions and entry animations.
    * `react-native-safe-area-context` for modern device compatibility.

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/tradeflow-mobile.git](https://github.com/yourusername/tradeflow-mobile.git)
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **iOS Configuration (Mac only):**
    ```bash
    cd ios && pod install && cd ..
    ```

4.  **Run the application:**
    ```bash
    # Android
    npx react-native run-android

    # iOS
    npx react-native run-ios
    ```

## 📄 License

This project is proprietary software belonging to the TradeFlow Ecosystem.
