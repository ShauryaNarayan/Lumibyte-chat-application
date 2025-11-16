// backend/server.js
const express = require('express');
const cors = require('cors');

const {
  sessions,
  createNewSession,
  addMessageToSession
} = require('./mockData');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('Backend API is running ✅');
});

/*
|--------------------------------------------------------------------------
| GET /api/sessions
| Returns list of all chat sessions
|--------------------------------------------------------------------------
*/
app.get('/api/sessions', (req, res) => {
  const sessionList = Object.values(sessions).map((s) => ({
    id: s.id,
    title: s.title,
    createdAt: s.createdAt,
  }));

  // Frontend expects: { sessions: [...] }
  return res.json({ sessions: sessionList });
});

/*
|--------------------------------------------------------------------------
| GET /api/new-chat
| Creates and returns a new empty session
|--------------------------------------------------------------------------
*/
app.get('/api/new-chat', (req, res) => {
  const newSession = createNewSession();
  return res.json({
    sessionId: newSession.id,
    session: newSession,
  });
});

/*
|--------------------------------------------------------------------------
| GET /api/session/:id
| Returns full conversation history
|--------------------------------------------------------------------------
*/
app.get('/api/session/:id', (req, res) => {
  const { id } = req.params;
  const session = sessions[id];

  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }

  const history = session.messages.map((m) => ({
    id: m.id,
    question: m.role === 'user' ? m.content : '',
    answer: m.role === 'assistant' ? m.content : '',
    tableData: m.table || null,
  }));

  return res.json({
    id: session.id,
    title: session.title,
    createdAt: session.createdAt,
    history,
  });
});

/*
|--------------------------------------------------------------------------
| POST /api/chat/:id
| User sends question → Assistant returns mock structured answer
|--------------------------------------------------------------------------
*/
app.post('/api/chat/:id', (req, res) => {
  const { id } = req.params;
  const { question } = req.body;

  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Question is required' });
  }

  const result = addMessageToSession(id, question);

  if (!result) {
    return res.status(404).json({ error: 'Session not found' });
  }

  const { assistantMessage } = result;

  return res.json({
    id: assistantMessage.id,
    question,
    answer: assistantMessage.content,
    tableData: assistantMessage.table,
  });
});

/*
|--------------------------------------------------------------------------
| Start Server
|--------------------------------------------------------------------------
*/
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend running at http://localhost:${PORT}`);
});
