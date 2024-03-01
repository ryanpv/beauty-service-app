import React from 'react'
import { Link } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { SocialIcon } from 'react-social-icons';
import { HiMiniArrowRightCircle } from "react-icons/hi2";
import { useStateContext } from '../contexts/state-contexts';

// Utils
import { fetchInstagramPhotos } from '../utils/fetch-photos';

export default function HomePage() {
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [offset, setOffset] = React.useState(0);
  const { igPhotos, setIgPhotos } = useStateContext();
  
  const photoRef = React.useRef<HTMLDivElement>(null);
  const photoContainerHeight = photoRef.current && photoRef.current.clientHeight;
  const photoContainerScrollTop = photoRef.current && photoRef.current.scrollTop;
  const photoColumnLength = igPhotos.data && igPhotos.data.size;
  
console.log('cookies: ', document.cookie);

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
          <img className='min-h-64 max-h-80' src={ props.media_url } alt=''/>
        </Link>
      </div>
    )
  };
  
  return (
    <div className='flex flex-col bg-gray-100 '>
      <header 
        className='flex flex-col w-full space-y-10 h-[70vh] fixed top-0 z-10 opacity-[.85]' 
        style={ { backgroundImage: `url(${require('./cover-photo.jpg')})`, backgroundSize: 'cover', backgroundPosition: 'center' } }
      />

      <div className='flex flex-col space-y-8 mt-10 z-20 p-5'>
        <div className='flex justify-center mx-auto py-3 px-10 rounded-full'>
          <div className='flex flex-cols-2'>
            <div>
              <SocialIcon 
                url='www.instagram.com' 
                href='https://www.instagram.com/polishbycin/'
                bgColor='#fbb6ce'
                target='_blank'
                rel='noreferrer'
              />
            </div>

            <a href='https://www.instagram.com/polishbycin/' target='_blank' rel='noreferrer'>
              <p className='pt-2 px-3 text-2xl font-bold text-white underline decoration-pink-300'>PolishByCin</p>
            </a>
          </div>
        </div>

        <Link
          to='/book-appointment' 
          className='px-8 py-1.5 mx-auto rounded-full text-center bg-pink-300 font-semibold text-lg text-white hover:ring-pink-400 py-2.5 px-3.5 hover:bg-pink-400'
        >
          Book Appointment
        </Link>

        <p className='text-white text-xl font-semibold text-center'>
          Welcome to my world as a nail technician!
        </p>
      </div>

      <div className='z-10 bg-gray-100 pb-10 space-y-3 mt-[12vh]'>
    {/* <div className='flex py-3 px-10 rounded-full justify-center'> */}
        <Link to='/photo-gallery' className='text-center font-semibold text-4xl text-gray-600'>
          <div className='flex flex-cols-2 mt-10 space-x-3 justify-center'>
            <div>
              <HiMiniArrowRightCircle className='mt-1 ml-1' color='#fbb6ce' size='35'/>
            </div>
            <p className='underline decoration-pink-200'>Gallery</p>
          </div>
        </Link>

        {/* <hr className="h-px sm:mx-auto mx-3 sm:max-w-screen-md rounded-sm border-pink-200"></hr> */}

        <div ref={ photoRef } className='container py-5'>
          <div className="flex justify-between overflow-x-hidden rounded-full h-80">
            <div className="flex w-full overflow-scroll overflow-y-hidden [&>div]:flex-shrink-0 gap-1">
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
        </div>      
      </div>
    </div>
  )
}
