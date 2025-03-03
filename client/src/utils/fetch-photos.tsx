import { Dispatch, SetStateAction } from 'react';

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

type FetchParams = {
  setIgPhotos: Dispatch<SetStateAction<PhotoState>>;
  igPhotos: PhotoState;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
  media_url: string;
};

export const fetchInstagramPhotos = async({...fetchParams}: FetchParams) => {
  fetchParams.setLoading(true);

  try {
        // *** FOR CACHING IG API RESPONSE ***

    // Check local storage for data to update state
    if (JSON.parse(localStorage.getItem('igPhotos')!) && JSON.parse(localStorage.getItem('igPhotos')!).nextPage !== -1) {
      fetchParams.setIgPhotos({
        data: new Set(JSON.parse(localStorage.getItem('igPhotos')!).data),
        paging: {
          next: JSON.parse(localStorage.getItem('igPhotos')!).nextPage
        }
      });

    } else if (JSON.parse(localStorage.getItem('igPhotos')!) && JSON.parse(localStorage.getItem('igPhotos')!).nextPage === -1) {
      fetchParams.setIgPhotos({
        data: new Set(JSON.parse(localStorage.getItem('igPhotos')!).data),
        paging: {
          next: ""
        }
      });

      return; // End fetch operation as there should not be anymore pages to fetch (nextPage === -1)
    }

    /////////////////////////////////////

    // Check if there are more photos to be fetched from API - continue to fetch if next page of photos exists
    if (fetchParams.igPhotos.paging.next !== "") {
      const queryInstagramUser = await fetch(fetchParams.media_url)
      const results = await queryInstagramUser.json();
      const nextPage = results.paging.next !== undefined ? results.paging.next : -1
      const lastItem = {
        time: new Date().toUTCString(),
        lastURL: nextPage
      };

      const photosForLocal = {
        data: results.data,
        nextPage: results.paging.next
      };
                    
      // if fetch operation is required, check if local storage 'igPhotos' exists and store accordingly
      if (JSON.parse(localStorage.getItem('igPhotos')!) === null) {           
        localStorage.setItem('igPhotos', JSON.stringify(photosForLocal))
        localStorage.setItem('lastItem', JSON.stringify(lastItem))
      } else {             
        const updateLocalPhotos = {
          data: [...JSON.parse(localStorage.getItem('igPhotos')!).data, ...results.data],
          nextPage: nextPage
        };
        
        localStorage.setItem('igPhotos', JSON.stringify(updateLocalPhotos))
        localStorage.setItem('lastItem', JSON.stringify(lastItem))
      }
      
      // Updating state this way to ensure next page value is properly stored
      fetchParams.setIgPhotos((prev) => ({
        data: new Set([...Array.from(prev.data), ...results.data]),
        paging: {
          next: results.paging.next !== undefined ? results.paging.next : ""
        }
      }));
    } else { 
      console.log("No more results.")           
      return;
    }
  } catch (error) {
    console.log("error fetching instagram photos: ", error);
    fetchParams.setError("Error fetching instagram photos.");
  } finally {
    fetchParams.setLoading(false);
  }
};