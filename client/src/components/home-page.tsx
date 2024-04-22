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
    <div className='flex flex-col'>
      {/* <div 
        className='flex flex-col contrast-125 w-full space-y-10 h-[100-vh] fixed top-0 z-10 opacity-[.85] border-4 border-blue-400' 
        // style={ { backgroundImage: `url(${require('./cover-photo.jpg')})`, backgroundSize: 'cover', backgroundPosition: 'center' } }
        style={{ backgroundColor: "#F1C6D0"}}
      ></div> */}

      <div
        className='grid grid-cols-2 m-8 md:m-20 bg-pink-100 shadow-xl rounded'
        style={{  height: `${ window.innerHeight * 0.7 }px`}}
        // style={ { backgroundImage: `url(${require('./pink-design.jpg')})`, backgroundSize: 'cover', backgroundPosition: 'center', height: `${ window.innerHeight * 0.7 }px` } }
      >
        <div className='flex flex-col space-y-8 p-5 my-auto ml-auto' >
          {/* <div className='flex justify-center mx-auto py-3 px-10 rounded-full'>
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
                <p 
                  className='pt-2 px-3 text-2xl font-bold text-pink-700 underline decoration-pink-300'
                >PolishBy<span className='ext-pink-300'>Cin</span></p>
              </a>
            </div>
          </div> */}
          <p className='text-2xl text-pink-700 font-semibold'>Welcome to PolishByCin</p>
          
          <div className='text-right'>
            <p className='text-5xl font-semibold text-[#342D59]'>
              Manicures, Pedicures
            </p>
            <p className='text-4xl font-semibold text-[#342D59]'>
              & More!
            </p>
          </div>

          <p className='text-gray-500 font-semibold text-lg'>Explore a world of gel nail art.</p>

          <div className='space-x-5'>
            <Link
              to='/services' 
              className='px-8 py-1.5 mr-auto rounded-full border-2 border-pink-700 font-semibold text-lg text-pink-700 hover:ring-pink-700 py-2.5 px-3.5 hover:bg-pink-300'
            >
              View Services
            </Link>
            <Link
              to='/login' 
              className='px-8 py-1.5 mr-auto rounded-full border-2 bg-pink-700 border-pink-700 font-semibold text-lg text-white hover:border-pink-300 py-2.5 px-3.5 hover:bg-pink-300'
            >
              Login
            </Link>
          </div>
        </div>

        <div
          className='flex'
        >
          <div className='h-3/5 w rounded overflow-hidden my-auto border-2 border-pink-700'>
            <img src={ require('./cover-photo.jpg')} alt='nails' className='object-fit h-4/5 w-'/>
          </div>
        </div>

      </div>

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
                <p 
                  className='pt-2 px-3 text-2xl font-bold text-pink-700 underline decoration-pink-300'
                >PolishBy<span className='ext-pink-300'>Cin</span></p>
              </a>
            </div>

      <div className='z-10 pb-10 space-y-3 my-[12vh]'>
    {/* <div className='flex py-3 px-10 rounded-full justify-center'> */}
        <div className='flex'>
          <Link to='/photo-gallery' className='mx-auto text-center font-semibold text-4xl text-gray-600'>
            <div className='flex flex-cols-2 mt-10 space-x-3 justify-center'>
              <div>
                <HiMiniArrowRightCircle className='mt-1 ml-1' color='#fbb6ce' size='35'/>
              </div>
              <p className='underline decoration-pink-200'>Gallery</p>
            </div>
          </Link>
        </div>
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
