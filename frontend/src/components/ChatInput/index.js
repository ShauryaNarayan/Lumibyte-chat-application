import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './index.css';

function ChatInput({ onSend }) {
  const [value, setValue] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || sending) return;

    setSending(true);
    try {
      await onSend(trimmed);
      setValue('');
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="chatinput-form">
      <input
        className="chatinput-input"
        placeholder="Send a message..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" disabled={sending} className="chatinput-button">
        {sending ? 'Sending…' : 'Send'}
      </button>
    </form>
  );
}

ChatInput.propTypes = {
  onSend: PropTypes.func.isRequired,
};

export default ChatInput;
