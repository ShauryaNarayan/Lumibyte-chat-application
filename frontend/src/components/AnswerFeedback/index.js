import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './index.css';

function AnswerFeedback({ messageId }) {
  const [feedback, setFeedback] = useState(null);

  const handleUp = () => {
    setFeedback((prev) => (prev === 'up' ? null : 'up'));
    // Could send messageId + feedback to backend
  };

  const handleDown = () => {
    setFeedback((prev) => (prev === 'down' ? null : 'down'));
  };

  return (
    <div className="answerfeedback-root" data-message-id={messageId}>
      <button
        type="button"
        onClick={handleUp}
        className={`answerfeedback-btn ${
          feedback === 'up' ? 'answerfeedback-btn-active-up' : 'answerfeedback-btn-outline-up'
        }`}
      >
        👍
      </button>
      <button
        type="button"
        onClick={handleDown}
        className={`answerfeedback-btn ${
          feedback === 'down' ? 'answerfeedback-btn-active-down' : 'answerfeedback-btn-outline-down'
        }`}
      >
        👎
      </button>
    </div>
  );
}

AnswerFeedback.propTypes = {
  messageId: PropTypes.string.isRequired,
};

export default AnswerFeedback;
