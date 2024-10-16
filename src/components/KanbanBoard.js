import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Column from './Column';
import './Kanban.css';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState('status'); // Default group by status
  const [sortOption, setSortOption] = useState('priority'); // Default sort by priority

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
        setTickets(result.data.tickets);
      } catch (error) {
        console.error('Error fetching the tickets:', error);
      }
    };
    fetchData();
  }, []);

  // Function to group tickets based on the selected option
  const groupTickets = () => {
    const grouped = {};
    if (grouping === 'status') {
      tickets.forEach(ticket => {
        if (!grouped[ticket.status]) {
          grouped[ticket.status] = [];
        }
        grouped[ticket.status].push(ticket);
      });
    } else if (grouping === 'user') {
      tickets.forEach(ticket => {
        const user = ticket.assigned_user || 'Unassigned';
        if (!grouped[user]) {
          grouped[user] = [];
        }
        grouped[user].push(ticket);
      });
    } else if (grouping === 'priority') {
      tickets.forEach(ticket => {
        if (!grouped[ticket.priority]) {
          grouped[ticket.priority] = [];
        }
        grouped[ticket.priority].push(ticket);
      });
    }
    return grouped;
  };

  // Sort tickets based on the selected option
  const sortedTickets = (tickets) => {
    return tickets.sort((a, b) => {
      if (sortOption === 'priority') {
        return b.priority - a.priority; // Descending order of priority
      } else if (sortOption === 'title') {
        return a.title.localeCompare(b.title); // Ascending order by title
      }
      return 0;
    });
  };

  const groupedTickets = groupTickets();

  return (
    <div className="kanban-board-container">
      {/* Header for grouping and sorting */}
      <Header
        grouping={grouping}
        setGrouping={setGrouping}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />

      {/* Render columns based on the grouped tickets */}
      <div className="kanban-columns">
        {Object.keys(groupedTickets).map(group => (
          <Column key={group} group={group} tickets={sortedTickets(groupedTickets[group])} />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
