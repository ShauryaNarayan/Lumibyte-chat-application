// src/components/ChatWindow/index.js
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { getSessionHistory, sendMessage } from '../../services/api';
import AnswerFeedback from '../AnswerFeedback';
import ChatInput from '../ChatInput';
import ModelSwitcher from '../ModelSwitcher';
import TableResponse from '../TableResponse';
import './index.css';

function ChatWindow({ sessionId }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [model, setModel] = useState('gpt-3.5');
  const bottomRef = useRef(null);

  // Load history
  useEffect(() => {
    let isMounted = true;

    async function loadHistory() {
      setLoading(true);

      try {
        const data = await getSessionHistory(sessionId);

        if (isMounted && data && Array.isArray(data.history)) {
          setMessages(data.history);
        }
      } catch (error) {
        console.error('Failed to load history:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    if (sessionId) loadHistory();

    return () => {
      isMounted = false;
    };
  }, [sessionId]);

  // Auto scroll
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // FIXED handleSend — adds user + assistant messages
  const handleSend = async (question) => {
    try {
      const assistant = await sendMessage(sessionId, question, model);

      setMessages((prev) => [
        ...prev,

        // user message bubble
        {
          id: `u-${Date.now()}`,
          question,
          answer: '',
          tableData: null,
        },

        // assistant message bubble
        {
          id: assistant.id,
          question: '',
          answer: assistant.answer,
          tableData: assistant.tableData || null,
        },
      ]);
    } catch (error) {
      console.error('Send message failed:', error);
    }
  };

  return (
    <div className="chatwindow-root">
      <div className="chatwindow-inner">
        {/* Header */}
        <div className="chatwindow-topbar">
          <div>
            <h1 className="chatwindow-title">Chat</h1>
            <p className="chatwindow-subtitle">
              Ask questions and receive mock structured responses.
            </p>
          </div>

          <ModelSwitcher model={model} onChange={setModel} />
        </div>

        {/* Messages */}
        <div className="chatwindow-messages">
          {loading && <p className="chatwindow-hint">Loading conversation…</p>}

          {!loading && messages.length === 0 && (
            <div className="chatwindow-empty">
              <h2>Start a new conversation</h2>
              <p>Ask anything, and the assistant will respond with mock structured data.</p>
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className="chatwindow-block">
              {msg.question && (
                <div className="chat-bubble chat-bubble-user">
                  <p>{msg.question}</p>
                </div>
              )}

              {msg.answer && (
                <div className="chat-bubble chat-bubble-assistant">
                  <div className="chat-bubble-content">
                    <p className="assistant-text">{msg.answer}</p>

                    {msg.tableData && (
                      <div className="mt-3">
                        <TableResponse table={msg.tableData} />
                      </div>
                    )}

                    <div className="mt-2">
                      <AnswerFeedback messageId={msg.id} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="chatwindow-input">
          <ChatInput onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}

ChatWindow.propTypes = {
  sessionId: PropTypes.string.isRequired,
};

export default ChatWindow;
