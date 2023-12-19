import React from 'react'

export default function PhotoGallery() {
  type PhotoState = {
      data: {
        id: string,
        caption: string,
        media_url: string
  }[],
      paging: object
  }

  const [error, setError] = React.useState("");
  const [igPhotos, setIgPhotos] = React.useState<PhotoState | { data: [{ id: string, caption: string, media_url: string }] }>({ data: [{ id: '', caption: '', media_url: '' }] })

  React.useEffect(() => {
    fetchInstagramPhotos();
  },[])

  const fetchInstagramPhotos = async() => {
    try {
      const queryInstagramUser = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_url&access_token=${ process.env.REACT_APP_IG_LLT }`)
      const results = await queryInstagramUser.json();
      console.log("results; ", results)
      setIgPhotos(results);

    } catch (error) {
      console.log("error fetching instagram photos: ", error)
      setError("Error fetching instagram photos.")
    }
  }

  // Type for IG photos prop
  type IgPhotosProp = {
    id: string,
    caption: string,
    media_url: string
  }

  // *** add overlay of design name?
  // const Photos: React.FC<IgPhotosProp> = (props) => {
  const Photos = (props: IgPhotosProp) => {
    return (
      <div className='hover:scale-125' key={ props.id }>
        <img className='h-auto rounded-sm min-h-full ' src={ props.media_url } key={ props.id } alt=''/>
      </div>
    )
  }

  const displayPhotos = () => {
    if (Array.isArray(igPhotos?.data) && igPhotos.data.length > 0) {
      return igPhotos.data.map((photoData) => {
        return <Photos id={ photoData.id } caption={ photoData.caption } media_url={ photoData.media_url }/>
      })
    }
  }

  return (
    <>
      <div className='text-center'>
        <h1>PhotoGallery</h1>
      </div>

      <div className='container grid max-w-4xl'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-1 m-auto'>
          { displayPhotos() }  
        </div>  
      </div>   
    </>
  )
}
