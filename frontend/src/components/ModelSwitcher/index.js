import PropTypes from 'prop-types';
import React from 'react';
import './index.css';

function ModelSwitcher({ model, onChange }) {
  const handleSelect = (value) => {
    if (value !== model) {
      onChange(value);
    }
  };

  return (
    <div className="modelswitcher-root">
      <span className="modelswitcher-label">Model</span>
      <div className="modelswitcher-pill">
        <button
          type="button"
          className={`modelswitcher-option ${
            model === 'gpt-3.5' ? 'modelswitcher-option-active' : 'modelswitcher-option-idle'
          }`}
          onClick={() => handleSelect('gpt-3.5')}
        >
          GPT-3.5
        </button>
        <button
          type="button"
          className={`modelswitcher-option ${
            model === 'gpt-4' ? 'modelswitcher-option-active' : 'modelswitcher-option-idle'
          }`}
          onClick={() => handleSelect('gpt-4')}
        >
          GPT-4
        </button>
      </div>
    </div>
  );
}

ModelSwitcher.propTypes = {
  model: PropTypes.oneOf(['gpt-3.5', 'gpt-4']).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ModelSwitcher;
