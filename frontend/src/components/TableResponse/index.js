import PropTypes from 'prop-types';
import React from 'react';
import './index.css';

function TableResponse({ table }) {
  if (!table || !Array.isArray(table.columns) || !Array.isArray(table.rows)) {
    return null;
  }

  const { columns, rows } = table;

  return (
    <div className="tableresponse-root">
      <table className="tableresponse-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={`col-${col}`}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const rowKey = `row-${row.join('|')}`;
            return (
              <tr key={rowKey}>
                {row.map((cell) => {
                  const cellKey = `${rowKey}-${cell}`;
                  return <td key={cellKey}>{cell}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

TableResponse.propTypes = {
  table: PropTypes.shape({
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  }).isRequired,
};

export default TableResponse;
