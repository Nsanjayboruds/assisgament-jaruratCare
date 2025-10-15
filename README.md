# 🏥 Jarurat Care — Patient Records Dashboard

A simple and responsive **React + Vite** web application for managing patient records — view, search, and manage patients efficiently.

---

## 🚀 Features

- 🏠 **Landing Page** with navigation (`Home`, `Patients`, `About`)
- 👨‍⚕️ **Patients Page** with a responsive grid layout  
- 🔍 **Search Bar** to filter patients by name  
- 📄 **View Details** modal or separate page  
- ⏳ **Loading** and ❌ **Error** states while fetching data  
- ➕ **Add New Patient** form (local state only)  
- 📱 Fully **Responsive UI** for desktop & mobile  

---

## 🧰 Tech Stack

- **React + Vite**
- **React Router DOM**
- **CSS / Tailwind CSS**
- **Fetch API** or mock JSON data
- **React Hooks** (for state management)

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Nsanjayboruds/Assignment-jaruratCare.git
cd Assignment-jaruratCare

````
###2️⃣ Install Dependencies
````bash
Using npm:
npm install
````````
###3️⃣ Start the Development :-
```
npm run dev
````
The app will usually start on http://localhost:5173

###4️⃣ Build for Production:-
````
npm run build
````

###⚙️ Project Structure:-
````````
Assignment-jaruratCare/
├── public/                 # Static assets (images, favicon, etc.)
├── src/
│   ├── components/         # Navbar, PatientCard, SearchBar, Modal, etc.
│   ├── pages/              # Home, Patients, About, PatientDetails
│   ├── data/               # Mock JSON data (patients.json)
│   ├── store/              # Redux or Context setup (if used)
│   ├── App.jsx             # Main app + routing
│   └── main.jsx            # Entry point
├── package.json
├── vite.config.js
├── README.md
└── .gitignore


````````
🧠 How It Works

The Patients page fetches data (from an API or local JSON).

Users can search patients by name.

Clicking View Details opens a modal or navigates to a new route showing full details.

Optionally, users can add a new patient, updating local state dynamically.


🧩 State Management

You can use:

React Hooks: useState, useEffect, useContext

or Redux Toolkit (for larger state logic)

Manages:

Patient data

Search query

Selected patient details

Add patient form state

Deployment

You can deploy this app easily on:

Netlify
vercel


🙌 Author

👤 Nishant Borude


