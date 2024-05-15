import React from 'react';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      <MenuItem to="/teacher">Teacher</MenuItem>
      <MenuItem to="/student">Student</MenuItem>
      <MenuItem to="/booking">Booking</MenuItem>
      <MenuItem to="/subject">Subject</MenuItem>
      <MenuItem to="/timeslot">Timeslot</MenuItem>
      <MenuItem to="/meeting">Meeting</MenuItem>
      <MenuItem to="/study-material">Study Material</MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
