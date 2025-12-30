# 🛡️ GearGuard - Maintenance Management System (CMMS)

GearGuard is a full-stack SaaS application designed to streamline equipment maintenance, track repair workflows, and manage technician crews in real-time.

![Project Status](https://gearguard-eta.vercel.app)
![Mobile Responsive](https://gearguard-eta.vercel.app)

## 🚀 Live Demo
**Frontend:** [https://gearguard-eta.vercel.app](https://gearguard-eta.vercel.app)  
**Backend:** Hosted on Render  
**Database:** MongoDB Atlas

---

## 🌟 Key Features

### 📊 Executive Dashboard
* **Real-time Analytics:** Visualizes maintenance status (New, In Progress, Completed, Overdue) using interactive charts.
* **KPI Cards:** Instant summary of critical metrics.

### 📋 Kanban Workflow
* **Drag-and-Drop Style:** Move tasks through stages (`New` → `In Progress` → `Repaired`) with a single click.
* **Live Updates:** Status changes reflect instantly across the system.

### 👥 Team Management
* **Crew Scheduling:** Add, view, and delete maintenance crews.
* **Shift Management:** Assign leads and shifts (Morning/Evening/Night) to optimize workforce coverage.

### 🔒 Security & UX
* **Secure Auth:** Encrypted Login/Signup with duplicate email protection.
* **Responsive Design:** Fully optimized for Mobile and Desktop with a collapsible sidebar.
* **Modern UI:** Built with Tailwind CSS for a clean, glass-morphism aesthetic.

---

## 🛠️ Tech Stack

### **Frontend (Client)**
* **React.js (Vite):** Fast, component-based UI.
* **Tailwind CSS:** Modern utility-first styling.
* **Recharts:** Data visualization library for analytics.
* **Lucide React:** Beautiful, consistent iconography.
* **Axios:** HTTP client for API communication.

### **Backend (Server)**
* **Node.js & Express.js:** Robust REST API architecture.
* **MongoDB & Mongoose:** NoSQL database for flexible data modeling.
* **Cors & Dotenv:** Security and environment configuration.

---

## 📸 Screenshots

| Dashboard | Kanban Workflow |
|-----------|-----------------|
| <img width="1365" height="628" alt="Screenshot 2025-12-30 192136" src="https://github.com/user-attachments/assets/05098043-9756-4d70-b0a1-c6f75bbb1e85" /> |
| <img width="1365" height="629" alt="Screenshot 2025-12-30 192151" src="https://github.com/user-attachments/assets/343242a6-7609-41a3-ad67-f7718e59bbca" /> |

---

## ⚙️ Installation & Setup

If you want to run this locally:

1.  **Clone the repo:**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/gearguard.git](https://github.com/daivikp40/gearguard.git)
    cd gearguard
    ```

2.  **Install Dependencies:**
    ```bash
    # Install server dependencies
    cd server
    npm install

    # Install client dependencies
    cd ../client
    npm install
    ```

3.  **Configure Environment:**
    * Create a `.env` file in `/server` and add your `MONGO_URL`.

4.  **Run the App:**
    ```bash
    # Run Backend (Port 5000)
    cd server
    node index.js

    # Run Frontend (Port 5173)
    cd client
    npm run dev
    ```

---

## 👤 Author

**Patel Daivik** Full Stack Developer  
[GitHub Profile](https://github.com/daivikp40)
