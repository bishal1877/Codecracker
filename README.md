# Codecracker - Real-Time Chat Application

A full-stack real-time messaging platform with animated UI, secure file uploads, and production-ready deployment. Built with modern web technologies for seamless real-time communication.

**Live Demo:** [codecracker-liard.vercel.app](https://codecracker-liard.vercel.app)

---

## 🎯 Features

- **Real-Time Messaging** - Instant message delivery using WebSocket connections (Socket.IO)
- **Room-Based Conversations** - Users can create/join specific chat rooms
- **Image Sharing** - Upload and share images with secure Cloudinary integration
- **User Authentication** - Secure login with Clerk authentication
- **Message Persistence** - All messages stored in PostgreSQL database
- **Animated UI** - Galaxy particle effects and text decryption animations
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Production Deployed** - Frontend hosted on Vercel with optimized performance

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Frontend (Vercel)                 │
│  Next.js 16 | React 19 | Tailwind CSS | Socket.IO   │
└────────────────────┬────────────────────────────────┘
                     │ WebSocket & HTTP
                     │
┌────────────────────▼────────────────────────────────┐
│                 Backend (Node.js)                    │
│   Express | Socket.IO | Multer | Cloudinary        │
└────────────────────┬────────────────────────────────┘
                     │ SQL Queries
                     │
┌────────────────────▼────────────────────────────────┐
│              PostgreSQL Database                     │
│         (Message Storage & Connection Pool)          │
└─────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with server-side rendering
- **React 19** - UI component library
- **Socket.IO Client** - Real-time bidirectional communication
- **Tailwind CSS** - Utility-first CSS framework
- **Clerk** - User authentication and management
- **Cloudinary** - Image storage and CDN
- **React Toastify** - Notification system
- **Motion** - Animation library
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Socket.IO** - WebSocket library for real-time communication
- **PostgreSQL (pg)** - Relational database
- **Cloudinary** - Cloud image storage
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

---

## 📁 Project Structure

```
Codecracker/
├── frontend/                    # Next.js React application
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.js       # Root layout with Clerk provider
│   │   │   ├── page.js         # Home page with Galaxy animation
│   │   │   ├── globals.css     # Global styles
│   │   │   └── component/      # Reusable components
│   │   │       ├── Chat/       # Chat interface & Socket.IO logic
│   │   │       ├── Input/      # Message input with file upload
│   │   │       ├── Navbar/     # Navigation component
│   │   │       ├── Header/     # Page header
│   │   │       ├── Home/       # Home page content
│   │   │       ├── Reply/      # Reply functionality
│   │   │       ├── Decrypt/    # Text decryption animation
│   │   │       ├── Lightray/   # Galaxy particle system
│   │   │       ├── Msg/        # Message display
│   │   │       └── Spotlight/  # Spotlight effects
│   │   └── proxy.js            # API proxy configuration
│   ├── package.json
│   ├── next.config.mjs
│   └── postcss.config.mjs
│
└── server/                     # Node.js Express backend
    ├── index.js               # Server entry point & Socket.IO setup
    ├── db.js                  # PostgreSQL connection pool
    ├── package.json
    └── controllers/
        └── control.js         # API route handlers
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- PostgreSQL database
- Cloudinary account
- Clerk account

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/yourusername/Codecracker.git
cd Codecracker
```

#### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/codecracker
CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
PORT=4000
```

Start the backend server:
```bash
npm start
```

#### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create a `.env.local` file in the `frontend` directory:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
```

Start the development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 📡 API Endpoints

### REST API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/msg?room=roomId` | Fetch all messages in a room |
| `GET` | `/msgbyid?id=messageId` | Fetch a specific message by ID |
| `POST` | `/upload` | Upload image file (multipart/form-data) |

### WebSocket Events

| Event | Payload | Direction |
|-------|---------|-----------|
| `join` | `{room: string}` | Client → Server |
| `sendmsg` | `{text, naam, room, url, qimg}` | Client → Server |
| `message` | `{name, msg}` | Server → Client |
| `disconnect` | - | Client → Server |

---

## 🗄️ Database Schema

```sql
CREATE TABLE mt (
  id SERIAL PRIMARY KEY,
  msg TEXT NOT NULL,
  name VARCHAR(255),
  room VARCHAR(255),
  url VARCHAR(500),
  qimg VARCHAR(500),
  time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_room ON mt(room);
CREATE INDEX idx_time ON mt(time);
```

---

## 🎨 Key Components

### Chat.jsx
- Real-time message sending and receiving
- Image upload integration
- Progress tracking UI
- Socket.IO connection management
- Clerk user authentication integration

### Input.jsx
- Message textarea with keyboard shortcuts
- File upload with preview
- Send button with conditional rendering
- Image preview functionality

### Galaxy.jsx
- WebGL particle system
- Mouse interaction effects
- Animated background animation
- Performance optimized rendering

### Decrypt.jsx
- Animated text decryption effect
- Customizable reveal direction
- Sequential character animation

---

## 🔒 Security Features

- **CORS Configuration** - Restricted to authorized origins
- **Clerk Authentication** - Secure user identity management
- **Connection Pooling** - PostgreSQL connection management with 10 max connections
- **Error Handling** - Graceful error responses with status codes
- **Environment Variables** - Sensitive data stored securely

---

## 📊 Performance Optimizations

- **Next.js Image Optimization** - Automatic image sizing and caching
- **CSS Modules** - Scoped styling to prevent conflicts
- **Connection Pooling** - Efficient database connection management
- **Lazy Loading** - Components load on demand
- **Cloudinary CDN** - Fast image delivery globally

---

## 🛠️ Development

### Hot Reload
- Frontend: Next.js auto-refresh on file changes
- Backend: Use `nodemon` for auto-restart

### Install Nodemon
```bash
cd server
npm install --save-dev nodemon
```

Update `package.json` scripts:
```json
"scripts": {
  "dev": "nodemon index.js"
}
```

### Testing Socket.IO Locally
Use Postman or browser console to test WebSocket connections:
```javascript
const socket = io('http://localhost:4000');
socket.emit('join', { room: 'test-room' });
socket.on('message', (data) => console.log(data));
```

---

## 🚢 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
vercel deploy
```

Set environment variables in Vercel dashboard:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

### Backend (Railway/Render/Heroku)
Recommended platforms:
- [Railway.app](https://railway.app) - Premium but recommended
- [Render.com](https://render.com) - Free tier available
- [Heroku](https://heroku.com) - Paid service

Set environment variables on your hosting platform with the same `.env` variables.

---

## 📈 Future Enhancements

- [ ] Message encryption/decryption
- [ ] User presence indicators (typing status)
- [ ] Message reactions and emojis
- [ ] Voice/video calling with WebRTC
- [ ] Message search functionality
- [ ] User profiles with avatars
- [ ] Message threads/replies
- [ ] Dark/light theme toggle
- [ ] Rate limiting on API endpoints
- [ ] Message editing and deletion

---

## 🐛 Troubleshooting

### Socket.IO Connection Issues
- Ensure backend is running on the correct port
- Check CORS configuration matches frontend origin
- Verify environment variables are set

### Image Upload Fails
- Verify Cloudinary credentials
- Check file size limits in Multer configuration
- Ensure API keys have upload permissions

### Database Connection Error
- Verify PostgreSQL is running
- Check `DATABASE_URL` format is correct
- Ensure database exists and user has permissions

---

## 📝 Environment Variables Reference

**Backend (.env)**
```
DATABASE_URL = PostgreSQL connection string
CLOUD_NAME = Cloudinary cloud name
API_KEY = Cloudinary API key
API_SECRET = Cloudinary API secret
PORT = Server port (default: 4000)
```

**Frontend (.env.local)**
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = Public Clerk key
CLERK_SECRET_KEY = Secret Clerk key
```

---

## 📜 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

Created as a full-stack learning project showcasing modern web development practices.

---

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

---

## 📞 Support

For questions or issues, please open an issue on GitHub or contact the maintainer.

---

**Built with ❤️ using Next.js, Node.js, and PostgreSQL**
