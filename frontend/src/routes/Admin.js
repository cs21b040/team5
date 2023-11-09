import React, { useState } from 'react';
import Header from './../Components/Header.js';
import Nav from 'react-bootstrap/Nav';
import AdminUsers from './../Components/adminUsers.js';
import AdminInterestGroup from './../Components/adminInterestGroup.js';
import AdminAcademics from './../Components/adminAcademics.js';

function Admin () {
  const [activeKey, setActiveKey] = useState('users');
  return (
    <div>
      <Header />
      <div>
        <Nav className="justify-content-center" style={{marginTop:'10px'}} variant="pills" activeKey={activeKey} onSelect={setActiveKey}>
          <Nav.Item>
            <Nav.Link eventKey="users">Users</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="interest-groups">Interest Groups</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="academics">Academics</Nav.Link>
          </Nav.Item>
        </Nav>

        {activeKey === 'users' && <AdminUsers />}
        {activeKey === 'interest-groups' && <AdminInterestGroup />}
        {activeKey === 'academics' && <AdminAcademics />}
      </div>
    </div>
  );
}

export default Admin;