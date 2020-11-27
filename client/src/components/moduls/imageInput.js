import React from 'react'

export const ImageInput = ({title, onChange, src, name}) =>{

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
    onChange(event)
  }
}

  return(
    <div className="imageInput">
      <label>
        <p>{title}</p>
        <input type="file" name={name} id="fileElem" accept="image/*" onChange={handleFiles}/>
        <div id="fileList">
          <img src={src} id="sammerDayImg" className="inputImg"/>
        </div>
      </label>
    </div>
  )
}
