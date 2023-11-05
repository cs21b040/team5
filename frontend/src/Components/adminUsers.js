import React from 'react'
import './Styles/admin.css';

export default function adminUsers() {
    return (
      <div className='adminUser'>
        <div className="row">
          <div className="col-md-4 border-box">
            <h4>Requests</h4>
          </div>
          <div className="col-md-4 border-box">
            <h4>Users</h4>
          </div>
          <div className="col-md-4 border-box">
            <h4>Application Info</h4>
          </div>
        </div>
      </div>
    )
  }