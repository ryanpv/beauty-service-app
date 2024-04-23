import React from 'react'
import { Link } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { fetchInstagramPhotos } from '../utils/fetch-photos'
import { useStateContext } from '../contexts/state-contexts';

export default function PhotoGallery() {
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [offset, setOffset] = React.useState(0);
  const { igPhotos, setIgPhotos } = useStateContext();

  // Initial fetch of instagram photos
  React.useEffect(() => {
    const media_url = igPhotos.paging.next ? igPhotos.paging.next : "";
    const fetchPhotosParams = {
      setIgPhotos,
      igPhotos,
      setLoading,
      setError,
      media_url
    };

    if (!loading) {
      fetchInstagramPhotos(fetchPhotosParams);
    } 
  }, [offset]);

  // Fetch instagram photos on scroll for infinite scroll
  React.useEffect(() => {
    window.addEventListener("scroll", paginatePhotos);
    return () => window.removeEventListener("scroll", paginatePhotos);
  }, [loading]);

  React.useEffect(() => {
    window.addEventListener("resize", handleScreenResizing);
    return () => window.removeEventListener("resize", handleScreenResizing);
  }, [loading]);

  const clearStorage = () => {
    console.log('clearing cache');
    
    localStorage.clear();
  };

  // Type for IG photos prop
  type IgPhotosProp = {
    id?: string,
    caption?: string,
    media_url?: string,
    permalink?: string
  };

  const Photos = (props: IgPhotosProp) => {
    return (
      <div className='relative hover:z-30 sm:hover:scale-125 transition-all duration-200' >
        <Link to={`${props.permalink}`} target='_blank'>  
          <img className='rounded-xl lg:h-full' src={ props.media_url } alt=''/>
        </Link>
        <div className='absolute top-0 left-0 w-full px-4 text-center py-2 text-white pointer-events-none'>
          <p className='font-bold text-xs sm:text-lg'>{ props.caption?.split('-')[0] }</p>
        </div>
      </div>
    )
  };

  const paginatePhotos = () => {
    if (igPhotos.paging.next === "") return;

    // return nothing until innerHeight + scrollTop is close to offsetHeight value
    if (window.innerHeight + document.documentElement.scrollTop < (document.documentElement.offsetHeight - 100) || loading) {

      return;
    } else {
      // Offset state used to trigger fetch useEffect      
      setOffset(prev => prev + 1);
    }
  };

  const handleScreenResizing = () => {
    if (igPhotos.paging.next === "") return;

    if (window.innerHeight + 100 < document.documentElement.offsetHeight) {
      return;
    }

    setOffset(prev => prev + 1);
  };

  return (
    <div className='container space-y-10 mb-10'>
      <div className='mx-auto text-center text-[#342D59] font-semibold text-5xl mt-10 space-y-3'>
        <h1>Photo Gallery</h1>
        {/* <hr className="h-px sm:mx-auto mx-3 sm:max-w-screen-md rounded-sm border-[#342D59]"></hr> */}
      </div>
      {/* TEMP CLEAR LOCALSTORAGE BUTTON  */}
{/* <button onClick={ clearStorage }>CLEAR STORAGE</button> */}
      <div className='container grid grid-cols-1 max-w-4xl'>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-1'>
          {
            // Array.isArray(igPhotos?.data) && igPhotos.data.length > 0 
            igPhotos.data.size > 0 ? Array.from(igPhotos.data).map((photoData, idx) => {
              return (
                <Photos key={ photoData.id } id={ photoData.id } caption={ photoData.caption } media_url={ photoData.media_url } permalink={ photoData.permalink } />
                )
            })
            : null
          }
        </div>   
          { loading ? <div className='mx-auto '><BarLoader color='#fbb6ce'/></div> : null }
          
      </div>
    </div>
  )
}
