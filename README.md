# 🎵 Mixx TZ - YAS Registration System

A complete web application for managing YAS (YAS PIN) registration and prize entries for Mixx TZ.

## ✨ Features

### 📝 Registration Form
- **Phone Number Registration**: Users enter their Mixx subscriber number
- **YAS PIN Entry**: 4-digit security PIN verification
- **Real-time Validation**: Instant feedback on form inputs
- **Success Notifications**: Confirmation with entry ID
- **Responsive Design**: Works perfectly on mobile and desktop

### 📊 Admin Panel
- **Entry Management**: View, edit, and delete all registrations
- **Live Statistics**: 
  - Total registered entries count
  - Total prize pool value
- **Search Functionality**: Find entries by name or ID
- **Export to CSV**: Download all entries as CSV file
- **Edit Entries**: Modify names and YAS PINs
- **Delete Entries**: Remove registrations with confirmation
- **Auto-refresh**: Updates every 30 seconds

## 🛠️ Technology Stack

**Frontend:**
- HTML5
- CSS3 (Responsive Design)
- Vanilla JavaScript (No dependencies)

**Backend:**
- Node.js
- Express.js
- Body Parser
- CORS

**Data:**
- In-memory storage (can be easily switched to MongoDB, PostgreSQL, etc.)

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/kelex345/mixxtz.git
cd mixxtz
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the server**
```bash
npm start
# or for development with auto-reload
npm run dev
```

4. **Access the application**
- Registration Form: http://localhost:3000
- Admin Panel: http://localhost:3000/admin

## 📂 Project Structure

```
mixxtz/
├── public/
│   ├── index.html          # Registration form
│   ├── admin.html          # Admin panel
│   ├── app.js              # Form logic
│   ├── admin.js            # Admin logic
│   ├── style.css           # Form styles
│   └── admin-style.css     # Admin styles
├── server.js               # Express server & API
├── package.json            # Dependencies
└── README.md              # Documentation
```

## 🔌 API Endpoints

### Create Entry
```
POST /api/entries
Content-Type: application/json

{
  "name": "John Doe",
  "yasPin": "1234"
}
```

### Get All Entries
```
GET /api/entries
```

### Get Entry by ID
```
GET /api/entries/:id
```

### Update Entry
```
PUT /api/entries/:id
Content-Type: application/json

{
  "name": "Jane Doe",
  "yasPin": "5678"
}
```

### Delete Entry
```
DELETE /api/entries/:id
```

### Get Statistics
```
GET /api/stats
```

## 📱 UI Screenshots

### Registration Form
- Clean, modern design with Mixx branding
- Yellow and blue color scheme
- Input validation with error messages
- Loading spinner during submission
- Success/error notifications

### Admin Panel
- Statistics cards showing metrics
- Searchable entries table
- Edit and delete buttons
- CSV export functionality
- Modal dialogs for editing/confirming
- Responsive table layout

## 🔐 Security Features

- Input validation on frontend and backend
- XSS prevention with HTML escaping
- YAS PIN masking (shown as dots in table)
- CORS enabled for API protection
- Delete confirmation to prevent accidents

## 🚀 Deployment

### Heroku
```bash
# Create Procfile
echo "web: node server.js" > Procfile

# Deploy
git push heroku main
```

### Docker
```bash
# Create Dockerfile
docker build -t mixxtz .
docker run -p 3000:3000 mixxtz
```

## 📊 Example API Response

```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "yasPin": "1234",
    "createdAt": "2026-07-20T18:14:19.000Z",
    "fee": 800000
  }
}
```

## 🛣️ Roadmap

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] User authentication & admin login
- [ ] Email confirmations
- [ ] SMS notifications
- [ ] Payment integration
- [ ] Prize draw functionality
- [ ] Analytics dashboard
- [ ] Multi-language support

## 📝 License

MIT License - feel free to use this project

## 👨‍💻 Author

**kelex345** - [@kelex345](https://github.com/kelex345)

## 🤝 Contributing

Pull requests are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions, please create an issue on GitHub.

---

**🎵 Mixx TZ - Making Dreams Come True with YAS**
