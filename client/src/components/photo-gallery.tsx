import React from 'react'

export default function PhotoGallery() {
  const [error, setError] = React.useState("");

  const fetchInstagramPhotos = async() => {
    try {
      const queryInstagramUser = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_url&access_token=${ process.env }`)
    } catch (error) {
      console.log("error fetching instagram photos: ", error)
      setError("Error fetching instagram photos.")
    }
  }

  return (
    <>
      <div>PhotoGallery</div>

      
    
    </>
  )
}
