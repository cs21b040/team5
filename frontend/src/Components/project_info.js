import React from 'react'
import { CloseButton } from 'react-bootstrap';

function Project_info() {
    return (
    <>
    <div id="lightbox">
      <CloseButton id="close" onClick={() => document.getElementById("lightbox").style.display = "none"}/>
        <div className="content">
          <h1>Details of the project</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti laborum architecto eos, saepe eligendi modi rerum facilis quibusdam, doloribus doloremque suscipit perferendis consequuntur quaerat debitis possimus numquam temporibus porro enim. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia, iste rerum commodi hic placeat quod assumenda suscipit, quisquam cumque labore eaque tenetur ad? Mollitia consectetur totam cum! Distinctio, voluptates maiores! Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis delectus minus veniam voluptates doloremque? Accusantium porro ratione error similique vitae. Maxime vero eaque velit esse praesentium tenetur rerum magni voluptatum?</p>
        </div>
      </div>
    </>
  )
}
export default Project_info;