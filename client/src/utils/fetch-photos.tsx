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
    const localStoragePhotos = localStorage.getItem('igPhotos');
    const checkLocalStorage = localStoragePhotos ? JSON.parse(localStoragePhotos) : null;

        // *** FOR CACHING IG API RESPONSE ***
    // Check to see if a next URL exists from IG API stored in localstorage. Return to end execution if none
    if (checkLocalStorage && checkLocalStorage.nextPage !== -1) {
      fetchParams.setIgPhotos({
        data: new Set(checkLocalStorage.data),
        paging: {
          next: checkLocalStorage.nextPage === -1 ? "" : checkLocalStorage.nextPage
        }
      });

    } else if (checkLocalStorage && checkLocalStorage.nextPage === -1) {
      fetchParams.setIgPhotos({
        data: new Set(checkLocalStorage.data),
        paging: {
          next: ""
        }
      });

      return;
    }

    // Check if there are more photos to be fetched from API - continue to fetch if next page of photos exists
    if (fetchParams.igPhotos.paging.next !== "") {
      const queryInstagramUser = await fetch(fetchParams.media_url)
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
                    
      // if fetch operation is required, check if local storage 'igPhotos' exists and store accordingly
      if (checkLocalStorage === null) {        
        localStorage.setItem('igPhotos', JSON.stringify(photosForLocal))
        localStorage.setItem('lastItem', JSON.stringify(lastItem))
      } else {        
        const updateLocalPhotos = {
          data: [...checkLocalStorage.data, ...results.data],
          nextPage: nextPage
        };
        
        localStorage.setItem('igPhotos', JSON.stringify(updateLocalPhotos))
        localStorage.setItem('lastItem', JSON.stringify(lastItem))
      }
      
      fetchParams.setIgPhotos((prev) => ({
        data: new Set([...Array.from(prev.data), ...results.data]),
        paging: {
          next: results.paging.next !== undefined ? results.paging.next : ""
        }
      }));
    } else {
      return;
    }


  } catch (error) {
    console.log("error fetching instagram photos: ", error);
    fetchParams.setError("Error fetching instagram photos.");
  } finally {
    fetchParams.setLoading(false);
  }
};