import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { createNewSession } from '../../services/api';
import './index.css';

function LandingPage({ history }) {
  const handleStartChat = async () => {
    try {
      const data = await createNewSession();
      if (data?.sessionId) {
        history.push(`/chat/${data.sessionId}`);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to start new chat:', error);
    }
  };

  return (
    <div className="landing-root">
      <div className="landing-content">
        <h1 className="landing-title">Welcome to Your AI Assistant</h1>
        <p className="landing-subtitle">
          Start a conversation and explore structured responses, tables, and insights using a simple
          chat interface.
        </p>

        <button type="button" className="landing-button" onClick={handleStartChat}>
          ▶ Start New Chat
        </button>
      </div>
    </div>
  );
}

LandingPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(LandingPage);
