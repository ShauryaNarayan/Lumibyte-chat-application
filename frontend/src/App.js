// src/App.js
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ChatPage from './components/ChatPage';
import LandingPage from './components/LandingPage';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900 dark:bg-slate-900 dark:text-slate-100">
        {/* Top bar */}
        <header className="h-12 flex items-center justify-between px-4 border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-950/80 shadow-sm">
          <h1 className="text-sm font-semibold tracking-tight">Simplified Chat App </h1>
          <ThemeToggle />
        </header>

        {/* Main content */}
        <main className="flex-1">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/chat/:sessionId" component={ChatPage} />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
