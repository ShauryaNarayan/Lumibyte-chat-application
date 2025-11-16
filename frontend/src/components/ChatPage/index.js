import PropTypes from 'prop-types';
import React from 'react';
import ChatWindow from '../ChatWindow';
import Sidebar from '../Sidebar';
import './index.css';

function ChatPage({ match, history }) {
  const { sessionId } = match.params;

  return (
    <div className="chatpage-root">
      <Sidebar history={history} />
      <div className="chatpage-main">
        <ChatWindow sessionId={sessionId} />
      </div>
    </div>
  );
}

ChatPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      sessionId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ChatPage;
