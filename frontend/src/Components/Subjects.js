import React from 'react'
import './Styles/subjects.css';
function Subjects({subject}) {
  return (
    <div className='sidebarSubject'>
        <div className='sidebarSubject_info'>
            <h5>{subject}</h5>
        </div>
    </div>
  )
}

export default Subjects
