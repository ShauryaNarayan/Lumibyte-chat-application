// backend/mockData.js
const { v4: uuidv4 } = require('uuid');

// In-memory session store
const sessions = {};

// Utility: Smart session title generator
function generateTitleFromQuestion(q) {
  if (!q) return 'New Chat';
  return q.length > 20 ? q.slice(0, 20) + '...' : q;
}

// Create initial demo session
function createInitialSessions() {
  const sessionId = uuidv4();

  sessions[sessionId] = {
    id: sessionId,
    title: 'Sample Sales Analysis',
    createdAt: new Date().toISOString(),
    messages: [
      {
        id: uuidv4(),
        role: 'user',
        content: 'Show me sample sales data for Q1.',
      },
      {
        id: uuidv4(),
        role: 'assistant',
        content: 'Here is a sample Q1 sales report in tabular form.',
        table: {
          columns: ['Region', 'Sales', 'Growth'],
          rows: [
            ['North', '$10,000', '+5%'],
            ['South', '$8,500', '+3%'],
            ['East', '$9,200', '+4%'],
            ['West', '$7,800', '+2%'],
          ],
        },
      },
    ],
  };
}

createInitialSessions();

// Create a NEW empty chat session
function createNewSession() {
  const sessionId = uuidv4();

  sessions[sessionId] = {
    id: sessionId,
    title: 'New Chat',
    createdAt: new Date().toISOString(),
    messages: [],
  };

  return sessions[sessionId];
}

// Add Q&A to session
function addMessageToSession(sessionId, question) {
  const session = sessions[sessionId];

  if (!session) return null;

  const userMessage = {
    id: uuidv4(),
    role: 'user',
    content: question,
  };

  const assistantMessage = {
    id: uuidv4(),
    role: 'assistant',
    content: 'This is a dummy structured response.',
    table: {
      columns: ['Category', 'Value', 'Notes'],
      rows: [
        ['Dummy 1', '123', 'Note A'],
        ['Dummy 2', '456', 'Note B'],
        ['Dummy 3', '789', 'Note C'],
      ],
    },
  };

  // push messages
  session.messages.push(userMessage, assistantMessage);

  // AUTO-UPDATE TITLE (only if it’s still New Chat)
  if (session.title === 'New Chat') {
    session.title = generateTitleFromQuestion(question);
  }

  return { userMessage, assistantMessage };
}

// EXPORTS (IMPORTANT!)
module.exports = {
  sessions,
  createNewSession,
  addMessageToSession,
};
