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
    console.log('USESTATE FETCH CALLED');
    if (!loading) {
      fetchInstagramPhotos(instagram_photo_url);
    } 
  },[offset]);

  // Fetch instagram photos on scroll for infinite scroll
  React.useEffect(() => {
    window.addEventListener("scroll", paginatePhotos);
    return () => window.removeEventListener("scroll", paginatePhotos);
  }, [loading]);

  const fetchInstagramPhotos = async(media_url: string) => {
    setLoading(true);
    try {
      if (igPhotos.paging.next !== "") {
        const queryInstagramUser = await fetch(media_url)
        const results = await queryInstagramUser.json();
        console.log("RESULTS URL undefined?: ", results.paging.next === undefined)
  
        setIgPhotos((prev) => ({
          data: new Set([...Array.from(prev.data), ...results.data]),
          paging: {
            next: results.paging.next !== undefined ? results.paging.next : ""
          }
        }));
      } else {
        console.log('no more');
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
      <div className='hover:scale-125' >
        <img className='h-auto rounded-sm min-h-full' src={ props.media_url } alt=''/>
      </div>
    )
  };


  const paginatePhotos = async() => {
    if (igPhotos.paging.next === "") return;

    // return nothing until innerHeight + scrollTop is close to offsetHeight value
    if (window.innerHeight + document.documentElement.scrollTop < (document.documentElement.offsetHeight - 100) || loading) {

      return;
    } else {
      // Offset state used to trigger fetch useEffect
      console.log('offset called');
      
      setOffset(prev => prev + 1);
    }
  };

  return (
    <div className='container space-y-10'>
      <div className='mx-auto text-center font-bold text-2xl mt-5 space-y-3 r'>
        <h1>PhotoGallery</h1>
        <hr className="h-px sm:mx-auto mx-3 sm:max-w-screen-md rounded-sm border-pink-300"></hr>
      </div>

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


            {/* <div className='container max-w-2xl overflow-auto'>
        <div className='grid grid-cols-2'>
          <div>
            <img src={ require("./balloon-sq1.jpg") } alt="placeholder" />
          </div>
          <div>
            <img src={ require("./balloon-sq2.jpg") } alt="placeholder" />
          </div>
          <div>
            <img src={ require("./balloon-sq3.jpg") } alt="placeholder" />
          </div>
          <div>
            <img src={ require("./balloon-sq4.jpg") } alt="placeholder" />
          </div>
          <div>
            <img src={ require("./balloon-sq5.jpg") } alt="placeholder" />
          </div>
        </div>
      </div>    */}
    </div>
  )
}
