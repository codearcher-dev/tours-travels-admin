# Prime Traveller - Admin Dashboard

A modern, responsive, and feature-rich Admin Panel built for **Prime Traveller**, a tour and travel company. This dashboard allows administrators to seamlessly manage tour packages, destinations, customer enquiries, and feedback through an intuitive and premium user interface.

## 🚀 Tech Stack

- **Frontend Framework:** React 18 (Vite)
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v6
- **Icons:** Lucide React
- **Charts & Analytics:** Recharts
- **Notifications:** React Hot Toast

## ✨ Key Features

### 1. Dashboard & Analytics
- Overview of key metrics (Total Packages, Destinations, Visitors, Enquiries).
- Interactive bar charts built with Recharts visualizing monthly enquiry trends.

### 2. Package Management
- **List View:** Clean, single-line table layout with quick-action popups to view full details (itineraries, pricing, inclusions).
- **Create/Edit Packages:** Advanced form handling dynamic day-wise itineraries, multiple destinations, inclusions, and exclusions.
- **Image Gallery:** Drag-and-drop image upload UI with inline gallery previews.

### 3. Destination Management
- **List & Modals:** Compact list view with comprehensive detail modals showing key places to visit and gallery images.
- **Create/Edit Destinations:** Form to add new travel destinations and their highlights.

### 4. Enquiries & Lead Management
- **Status Tracking:** Mark incoming enquiries as "Pending" or "Served".
- **WhatsApp Integration:** Direct one-click WhatsApp redirection to instantly connect with leads via their provided phone number.
- **Notifications:** Real-time unread notification bell in the header that resets upon viewing.

### 5. Feedback System
- **Feedback Link Generator:** Create dynamic, custom question-wise feedback forms for customers.
- **Review Dashboard:** View customer ratings, overall satisfaction, and question-by-question breakdowns with a visually appealing star-rating UI.

## 📱 Mobile Responsiveness

The entire admin panel has been strictly optimized for small devices:
- Table layouts are constrained and non-scrollable horizontally to maintain clean formatting.
- Complex forms automatically stack inputs and labels for easy touch-typing.
- Modals scale dynamically to fit mobile viewports, utilizing maximized widths and touch-friendly padding.

## 🛠️ Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project directory:**
   ```bash
   cd tours-travels-admin
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173`

## 📂 Project Structure

```
src/
├── components/       # Reusable UI components (ImageUploader, layout, etc.)
├── context/          # React Context providers (PackageContext)
├── pages/            # Main page components
│   ├── auth/         # Login and Forgot Password pages
│   ├── packages/     # Package lists and forms
│   ├── destinations/ # Destination lists and forms
│   ├── enquiries/    # Enquiry list and management
│   ├── feedbacks/    # Feedback list and link generator
│   └── admins/       # Admin user management
├── services/         # API and service integrations
├── utils/            # Helper functions (date formatting, etc.)
├── App.jsx           # Application routing setup
└── main.jsx          # React entry point
```
