import React from 'react'
import { Link } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { SocialIcon } from 'react-social-icons';

export default function HomePage() {
  type PhotoState = {
    data: Set<{
      id?: string,
      caption?: string,
      media_url?: string,
      permalink?: string
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
    next: `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink&access_token=${ process.env.REACT_APP_IG_LLT }`,
    previous: ""
  }
};

  const [error, setError] = React.useState("");
  const [igPhotos, setIgPhotos] = React.useState<PhotoState>(igPhotoState);
  const [loading, setLoading] = React.useState(false);
  const [offset, setOffset] = React.useState(0);

  const photoRef = React.useRef<HTMLDivElement>(null);
  const photoContainerHeight = photoRef.current && photoRef.current.clientHeight;
  const photoContainerScrollTop = photoRef.current && photoRef.current.scrollTop;
  const photoColumnLength = igPhotos.data && igPhotos.data.size;
  console.log("length: ", photoColumnLength);
  

  React.useEffect(() => {
    const instagram_photo_url = igPhotos.paging.next ? igPhotos.paging.next : "";

    if (!loading) {
      fetchInstagramPhotos(instagram_photo_url);
    } 
  },[offset]);

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
        console.log('results: ', results);
        
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

  type IgPhotosProp = {
    id?: string,
    caption?: string,
    media_url?: string,
    permalink?: string
  };

  const Photos = (props: IgPhotosProp) => {
    return (
      <div className='hover:z-30 hover:scale-125 transition-all duration-200' >
        <Link to={`${props.permalink}`} target='_blank'>  
          <img className='rounded min-h-64 max-h-64 ' src={ props.media_url } alt=''/>
        </Link>
      </div>
    )
  };

  const SpanPhotos = (props: IgPhotosProp) => {
    return (
      <div className='col-span-3 hover:z-30 hover:scale-125 transition-all duration-200' >
        <Link to={`${props.permalink}`} target='_blank'>  
          <img className='h-auto rounded max-w-full' src={ props.media_url } alt=''/>
        </Link>
      </div>
    )
  };

  
  return (
    <div className='container flex flex-col max-w-screen-md mt-10 space-y-10 py-12'>
      <header className='flex flex-col mx-auto space-y-10'>
        <img
          className='mx-auto h-10 w-auto'
          src={ require('./logo192.png') }
          alt='test logo'
        />
        <h1 className='text-center'>Polish By Cin</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi massa nisl, aliquam vitae felis ut, 
          efficitur blandit neque. Duis dapibus diam eget imperdiet mollis. Aliquam massa turpis, venenatis quis 
          accumsan ac, convallis eget velit. Nunc sed porta mi. In lobortis feugiat iaculis. Pellentesque eros 
          lectus, posuere a leo et, lacinia pretium quam. Donec quis ornare velit, sed pellentesque ipsum. In 
          semper nisl magna, quis molestie velit dapibus ac. Nunc rhoncus nibh libero, eget tristique tortor 
          maximus suscipit. Integer interdum ultrices nisi non rutrum.
        </p>

        <Link
          to='/book-appointment' 
          className='px-8 py-1.5 mx-auto rounded-full text-center bg-pink-300 font-semibold text-lg text-white hover:ring-pink-400 py-2.5 px-3.5 text-white hover:bg-pink-400'
        >
          Book Appointment
        </Link>
      </header>

      <div className='flex justify-center'>
        <a href='#'>
          <div className='flex flex-cols-2'>
            {/* <img
              className='h-10'
              src={ require('./logo192.png') }
              alt='test logo'
            /> */}
            <div
              className=''
            >
              <SocialIcon 
                url='www.instagram.com' 
                href='https://www.instagram.com/polishbycin/'
                bgColor='#fbb6ce'
                // className='bg-pink-500'
              />
            </div>
            <p className='pt-3 px-3 text-lg font-semibold text-pink-300 underline'>PolishByCin</p>
          </div>
        </a>
      </div>

      <div ref={ photoRef } className='container max-w-4xl'>
        <div className="flex justify-between overflow-x-hidden w-full rounded-full max-h-64 ring-pink-400 ring-2 overflow-visible">
          <div className="flex w-full overflow-scroll overflow-y-hidden [&>div]:flex-shrink-0">
            {
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
        <h1 className='text-center mt-3 font-bold text-xl text-pink-300'>Go to photo gallery</h1>
      </div>      
    </div>
  )
}
