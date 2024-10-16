

import React from 'react';
import './Column.css'; 
const Column = ({ group, tickets }) => {
  return (
    <div className="column">
      <h3>{group}</h3>
      <div className="ticket-list">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="ticket">
            <h4>{ticket.title}</h4>
            <p>Priority: {ticket.priority}</p>
            <p>Status: {ticket.status}</p>
            <p>Assigned to: {ticket.assigned_user || 'Unassigned'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Column;
