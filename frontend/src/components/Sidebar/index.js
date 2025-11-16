import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { createNewSession, getSessions } from '../../services/api';
import './index.css';

function Sidebar({ history }) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  function normalizeSessions(data) {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.sessions)) return data.sessions;
    return [];
  }

  const loadSessions = useCallback(async () => {
    try {
      const data = await getSessions();
      setSessions(normalizeSessions(data));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to load sessions:', error);
      setSessions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  const handleOpenSession = useCallback(
    (id) => {
      history.push(`/chat/${id}`);
    },
    [history]
  );

  const handleNewChat = useCallback(async () => {
    try {
      const data = await createNewSession();
      if (data && data.sessionId) {
        history.push(`/chat/${data.sessionId}`);
        loadSessions();
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to create new session:', error);
    }
  }, [history, loadSessions]);

  let content;
  if (loading) {
    content = <p className="text-xs text-slate-400">Loading...</p>;
  } else if (sessions.length === 0) {
    content = <p className="text-xs text-slate-400">No chats yet. Start one!</p>;
  } else {
    content = (
      <ul className="mt-2 space-y-1 text-xs">
        {sessions.map((s) => (
          <li key={s.id}>
            <button
              type="button"
              className="w-full truncate text-left px-2 py-1 rounded-md hover:bg-slate-800/70 transition-colors"
              onClick={() => handleOpenSession(s.id)}
            >
              <span className="align-middle">💬</span>
              <span className="ml-2 align-middle">{s.title}</span>
            </button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="sidebar-root">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-semibold text-slate-200 tracking-wide">Chats</span>
        <button
          type="button"
          onClick={handleNewChat}
          className="flex items-center gap-1 text-[11px] text-slate-100 bg-slate-700 hover:bg-slate-600 rounded-md px-2 py-1 transition-colors"
        >
          <span>+</span>
          <span>New Chat</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 sidebar-scroll">{content}</div>

      <div className="mt-3 border-t border-slate-700 pt-2 text-[11px] text-slate-400">
        <p className="truncate">
          Signed in as <span className="font-medium">Guest</span>
        </p>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Sidebar);
