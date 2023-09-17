import React from 'react'
import Header from './../Components/Header.js';
import Project from '../Components/Research-card.js';
import CardGroup from 'react-bootstrap/CardGroup';

function Research() {
  return (
    <div>
      <Header/>
      <h1>Research</h1>
      <div className='container'>
        <CardGroup>
          <Project title="Project Title" professor="Professor Name" desc="Short Description about the project" date="dd-mm-yyyy"/>
          <Project title="Project Title" professor="Professor Name" desc="Short Description about the project" date="dd-mm-yyyy"/>
          <Project title="Project Title" professor="Professor Name" desc="Short Description about the project" date="dd-mm-yyyy"/>
          <Project title="Project Title" professor="Professor Name" desc="Short Description about the project" date="dd-mm-yyyy"/>
          <Project title="Project Title" professor="Professor Name" desc="Short Description about the project" date="dd-mm-yyyy"/>
          <Project title="Project Title" professor="Professor Name" desc="Short Description about the project" date="dd-mm-yyyy"/>
          <Project title="Project Title" professor="Professor Name" desc="Short Description about the project" date="dd-mm-yyyy"/>
          <Project title="Project Title" professor="Professor Name" desc="Short Description about the project" date="dd-mm-yyyy"/>
          <Project title="Project Title" professor="Professor Name" desc="Short Description about the project" date="dd-mm-yyyy"/>
          <Project title="Project Title" professor="Professor Name" desc="Short Description about the project" date="dd-mm-yyyy"/>
          <Project title="Project Title" professor="Professor Name" desc="Short Description about the project" date="dd-mm-yyyy"/>
          <Project title="Project Title" professor="Professor Name" desc="Short Description about the project" date="dd-mm-yyyy"/>
          <Project title="Project Title" professor="Professor Name" desc="Short Description about the project" date="dd-mm-yyyy"/>
          <Project title="Project Title" professor="Professor Name" desc="Short Description about the project" date="dd-mm-yyyy"/>
          <Project title="Project Title" professor="Professor Name" desc="Short Description about the project" date="dd-mm-yyyy"/>
          <Project title="Project Title" professor="Professor Name" desc="Short Description about the project" date="dd-mm-yyyy"/>
          <Project title="Project Title" professor="Professor Name" desc="Short Description about the project" date="dd-mm-yyyy"/>
          <Project title="Project Title" professor="Professor Name" desc="Short Description about the project" date="dd-mm-yyyy"/>
        </CardGroup>
      </div>
    </div>
  )
}

export default Research