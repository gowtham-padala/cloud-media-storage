import React, { useState } from 'react'

function ImageUpload() {
    const [file, setFile] = useState(null)
  
    const handleFileChange = (event) => {
      setFile(event.target.files[0])
    }
  
    const handleSubmit = async (event) => {
      event.preventDefault()
  
      if (!file) {
        alert('Please select a file first!')
        return
      }
  
      const formData = new FormData()
      formData.append('image', file)
  
      try {
        const response = await fetch('http://localhost:3000/upload', {
          method: 'POST',
          body: formData,
        })
  
        if (response.ok) {
          const data = await response.json()
          alert(`Image uploaded successfully! URL: ${data.imageUrl}`)
        } else {
          alert('Failed to upload image.')
        }
      } catch (error) {
        console.error('Error during file upload:', error)
        alert('Error during file upload.')
      }
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload Image</button>
      </form>
    )
  }
  
export default ImageUpload