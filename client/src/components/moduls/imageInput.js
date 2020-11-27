import React from 'react'

export const ImageInput = ({title, onChange}) =>{

  function handleFiles(event) {
    const files = event.target.files
    console.log(event.target.files);
    window.URL = window.URL || window.webkitURL;
    var fileElem = document.getElementById("fileElem"),
        fileList = document.getElementById("fileList");

  if (!files.length) {
    fileList.innerHTML = "<p>No files selected!</p>";
  } else {
    var img = document.getElementById("sammerDayImg");
    img.src = window.URL.createObjectURL(files[0]);
    img.onload = function() {
      window.URL.revokeObjectURL(this.src);
    }
    onChange(files[0])
  }
}

  return(
    <div className="imageInput">
      <label>
        <p>{title}</p>
        <input type="file" id="fileElem" accept="image/*" onChange={handleFiles}/>
        <img src="http://localhost:5000/api/base/fonImage/base/base/day" id="sammerDayImg" className="inputImg"/>
        <div id="fileList">
        </div>
      </label>
    </div>
  )
}
