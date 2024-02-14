import React from 'react'
import { BarLoader } from 'react-spinners';

export default function PhotoGallery() {
  type PhotoState = {
      data: Set<{
        id?: string,
        caption?: string,
        media_url?: string
  }>,
      paging: {
        cursors?: object,
        next?: string,
        previous?: string
      }
  };

  const igPhotoState = {
    data: new Set([]),
    paging: {
      cursors: {},
      next: `https://graph.instagram.com/me/media?fields=id,caption,media_url&access_token=${ process.env.REACT_APP_IG_LLT }`,
      previous: ""
    }
  };

  const [error, setError] = React.useState("");
  const [igPhotos, setIgPhotos] = React.useState<PhotoState>(igPhotoState);
  const [loading, setLoading] = React.useState(false);
  const [offset, setOffset] = React.useState(0);

  // Initial fetch of instagram photos
  React.useEffect(() => {
    const instagram_photo_url = igPhotos.paging.next ? igPhotos.paging.next : "";

    if (!loading) {
      fetchInstagramPhotos(instagram_photo_url);
    } 
  },[offset]);

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
  }

  const fetchInstagramPhotos = async(media_url: string) => {
    setLoading(true);
    try {
      const localStoragePhotos = localStorage.getItem('igPhotos');
      const checkLocalStorage = localStoragePhotos ? JSON.parse(localStoragePhotos) : null;
      // const lastItemLocalStorage = localStorage.getItem('lastItem');
      // const checkLastItem = lastItemLocalStorage ? JSON.parse(lastItemLocalStorage) : null;

      // *** FOR CACHING IG API RESPONSE ***
      // Check to see if a next URL exists from IG API stored in localstorage. Return to end execution if none
      if (checkLocalStorage && checkLocalStorage.nextPage !== -1) {
        setIgPhotos({
          data: new Set(checkLocalStorage.data),
          paging: {
            next: checkLocalStorage.nextPage === -1 ? "" : checkLocalStorage.nextPage
          }
        });

      } else if (checkLocalStorage && checkLocalStorage.nextPage === -1) {
        setIgPhotos({
          data: new Set(checkLocalStorage.data),
          paging: {
            next: ""
          }
        });

        return;
      }

      if (igPhotos.paging.next !== "") {
        const queryInstagramUser = await fetch(media_url)
        const results = await queryInstagramUser.json();
        const nextPage = results.paging.next !== undefined ? results.paging.next : -1
        const lastItem = {
          time: new Date(),
          lastURL: nextPage
        };
        
        const photosForLocal = {
          data: results.data,
          nextPage: results.paging.next
        };
                
        console.log('FETCHED IG API');
        
        // if fetch operation is required, check if local storage 'igPhotos' exists and store accordingly
        if (checkLocalStorage === null) {
          console.log('NULL STORAGE');
          
          localStorage.setItem('igPhotos', JSON.stringify(photosForLocal))
          localStorage.setItem('lastItem', JSON.stringify(lastItem))
        } else {
          console.log('ELSE CALLED');
          
          const updateLocalPhotos = {
            data: [...checkLocalStorage.data, ...results.data],
            nextPage: nextPage
          };
          
          localStorage.setItem('igPhotos', JSON.stringify(updateLocalPhotos))
          localStorage.setItem('lastItem', JSON.stringify(lastItem))
        }
        
        setIgPhotos((prev) => ({
          data: new Set([...Array.from(prev.data), ...results.data]),
          paging: {
            next: results.paging.next !== undefined ? results.paging.next : ""
          }
        }));
      } else {
        console.log('NO MORE PHOTOS FROM IG API');
        return;
      }

    } catch (error) {
      console.log("error fetching instagram photos: ", error);
      setError("Error fetching instagram photos.");
    } finally{
      setLoading(false)
    }
  };

  // Type for IG photos prop
  type IgPhotosProp = {
    id?: string,
    caption?: string,
    media_url?: string
  };

  // *** add overlay of design name?
  const Photos = (props: IgPhotosProp) => {
    return (
      <div className='hover:scale-125 transition-all duration-300' >
        <img className='h-auto rounded-sm min-h-full' src={ props.media_url } alt=''/>
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
      console.log('OFFSET UPDATED');
      
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
    <div className='container space-y-10'>
      <div className='mx-auto text-center text-gray-400 font-bold text-4xl mt-5 space-y-3 r'>
        <h1>PhotoGallery</h1>
        <hr className="h-px sm:mx-auto mx-3 sm:max-w-screen-md rounded-sm border-pink-300"></hr>
      </div>
      {/* TEMP CLEAR LOCALSTORAGE BUTTON  */}
<button onClick={ clearStorage }>CLEAR STORAGE</button>
      <div className='container grid grid-cols-1 max-w-4xl'>
          { loading ? <div className='mx-auto '><BarLoader color='#fbb6ce'/></div> : null }
          
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-1 m-auto'>
          {/* { displayPhotos() } */}
          {
            // Array.isArray(igPhotos?.data) && igPhotos.data.length > 0 
            igPhotos.data.size > 0 ? Array.from(igPhotos.data).map((photoData) => {
              return (
                <Photos key={ photoData.id } id={ photoData.id } caption={ photoData.caption } media_url={ photoData.media_url }/>
              )
            })
            : null
          }
        </div>   
      </div>
    </div>
  )
}
