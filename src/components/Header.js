import React, { useState } from 'react';
import './Header.css';

const Header = ({ grouping, setGrouping, sortOption, setSortOption }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleGroupingChange = (e) => {
    setGrouping(e.target.value);
    toggleDropdown(); 
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    toggleDropdown(); 
  };

  return (
    <div className="kanban-header">
      <h2>Kanban Board</h2>
      <div className="display-button-wrapper">
        <button className="display-button" onClick={toggleDropdown}>
          <img src="assets/Display.svg" alt="Display Icon" className="display-icon" />
          Display
        </button>

        {dropdownOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-section">
              <p>Grouping:</p>
              <select value={grouping} onChange={handleGroupingChange}>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="dropdown-section">
              <p>Ordering:</p>
              <select value={sortOption} onChange={handleSortChange}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
