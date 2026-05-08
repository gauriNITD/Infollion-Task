# Gemini AI Chatbot

A modern full-stack AI chatbot built using Next.js and Google Gemini API.  
The application supports real-time conversations, PDF/TXT document understanding, image-based queries, multi-chat history, and contextual AI responses with a responsive modern UI.

---

# 🚀 Features

## 💬 AI Chat
- Chat with Google Gemini AI
- Context-aware conversations
- Multi-chat support
- Persistent chat history using localStorage

## 📄 Document Support
- Upload PDF and TXT files
- Extract and analyze document text
- Ask questions about uploaded documents
- Document summarization support

## 🖼️ Image Understanding
- Upload PNG/JPG images
- Ask questions related to uploaded images
- Gemini multimodal image analysis support

## 🧠 Chat Context Memory
- Maintains current chat context
- Understands previous messages
- Keeps uploaded files associated with conversations

## 🎨 Modern UI/UX
- Responsive design
- Mobile sidebar drawer
- Markdown-rendered AI responses
- Attachment previews
- Smooth animations
- Modern Gemini-inspired interface

## ⚡ Error Handling
- Handles API failures gracefully
- Prevents blank AI responses
- Loading states and upload indicators

---

# 🛠️ Tech Stack

## Frontend
- Next.js 16
- React
- Tailwind CSS
- shadcn/ui
- Framer Motion
- React Markdown

## Backend
- Next.js API Routes
- Google Gemini API
- pdfreader

---

# 📂 Project Structure

```bash
gemini-chatbot/
│
├── app/
│   ├── api/
│   │   ├── chat/
│   │   ├── upload/
│   │   └── new-chat/
│   │
│   ├── globals.css
│   ├── layout.js
│   └── page.js
│
├── components/
│   ├── Chat/
│   │   ├── ChatContainer.js
│   │   ├── ChatInput.js
│   │   ├── ChatMessage.js
│   │   └── Sidebar.js
│
├── lib/
│   ├── gemini.js
│   ├── memoryStore.js
│   └── pdfParser.js
│
├── public/
├── .env.local
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/gemini-chatbot.git

cd gemini-chatbot
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Setup Environment Variables

Create a `.env.local` file in the root directory.

```env
GEMINI_API_KEY=your_google_gemini_api_key
```

Get your API key from:

https://aistudio.google.com/app/apikey

---

## 4️⃣ Run Development Server

```bash
npm run dev
```

Application will run on:

```bash
http://localhost:3000
```

---

# 📌 Usage

## Chat with AI
- Type a message
- Press Enter or click Send

## Upload Documents
- Upload PDF or TXT files
- Ask questions related to uploaded content

## Upload Images
- Upload JPG/PNG images
- Ask image-related questions

## Multi Chats
- Create multiple chats
- Switch between conversations
- Chats persist after refresh

---

# 🧪 Example Prompts

## PDF

```text
Summarize this document
```

```text
What are the key skills mentioned in the resume?
```

## Image

```text
What is shown in this image?
```

```text
Describe the uploaded image
```

---

# 📱 Responsive Design

The application is fully responsive and supports:
- Desktop
- Tablet
- Mobile devices

---

# 🚀 Deployment

This project can be deployed easily on:

- Vercel
- Netlify

Recommended: Vercel

---

# 📸 Screenshots

Add your screenshots here after deployment.

---

# 🔮 Future Improvements

- Streaming AI responses
- Voice input support
- Chat export
- Authentication
- Cloud database storage
- Dark/light themes

---

# 👨‍💻 Author

Aman Derwal

- GitHub: https://github.com/derwalaman
- LinkedIn: https://linkedin.com/in/amanderwal

---

# 📄 License

This project is for educational and assignment purposes.