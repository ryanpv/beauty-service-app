import React from 'react'
import { BarLoader } from 'react-spinners';

export default function PhotoGallery() {
  type PhotoState = {
      data: {
        id: string,
        caption: string,
        media_url: string
  }[],
      paging: object
  };

  const [error, setError] = React.useState("");
  const [igPhotos, setIgPhotos] = React.useState<PhotoState | { data: [{ id: string, caption: string, media_url: string }] }>({ data: [{ id: '', caption: '', media_url: '' }] });
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    fetchInstagramPhotos();
  },[]);

  const fetchInstagramPhotos = async() => {
    try {
      setLoading(true);
      const queryInstagramUser = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_url&access_token=${ process.env.REACT_APP_IG_LLT }`)
      const results = await queryInstagramUser.json();
      console.log("results; ", results)
      setIgPhotos(results);
      setLoading(false);
    } catch (error) {
      console.log("error fetching instagram photos: ", error);
      setError("Error fetching instagram photos.");
      setLoading(false);
    }
  };

  // Type for IG photos prop
  type IgPhotosProp = {
    id: string,
    caption: string,
    media_url: string
  };

  // *** add overlay of design name?
  const Photos = (props: IgPhotosProp) => {
    return (
      <div className='hover:scale-125' key={ props.id }>
        <img className='h-auto rounded-sm min-h-full ' src={ props.media_url } key={ props.id } alt=''/>
      </div>
    )
  };

  const displayPhotos = () => {
    if (Array.isArray(igPhotos?.data) && igPhotos.data.length > 0) {
      return igPhotos.data.map((photoData) => {
        return <Photos id={ photoData.id } caption={ photoData.caption } media_url={ photoData.media_url }/>
      })
    }
  };

  return (
    <>
      <div className='text-center'>
        <h1>PhotoGallery</h1>
      </div>

      <div className='container grid max-w-4xl'>
          { loading ? <div className='mx-auto '><BarLoader color='#fbb6ce'/></div> : 
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-1 m-auto'>
          { displayPhotos() }
        </div>  
          }  
      </div>   
    </>
  )
}
