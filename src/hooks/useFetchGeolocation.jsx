import { useState, useEffect, useContext } from "react";
import { AppContext } from '../store/context';
import { googleAPIKEY } from '../config/apiKey';

export default function useFetchGeolocation() {
  const { actions } = useContext(AppContext)

  const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [city, setCity] = useState(null);
  const [location, setLocation] = useState(null);
  useEffect(() => {

    // setLoading(true);
    actions({
      type: 'setState',
      payload: { loadingPlace: true }
    })

    async function reverseGeo(pos) {
      try {
        const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.lat},${pos.lng}&key=${googleAPIKEY}`);
        const data = await res.json()
        setCity(data.results[0].formatted_address);
      } catch (e) {
        setError(e);
        console.log(e)
      }
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 6600,
      maximumAge: 0,
    };

    function success(pos) {
      pos = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      }
      console.log("Geolocation navigator success:", pos)
      setLocation(pos)
      reverseGeo(pos)
      actions({
        type: 'setState',
        payload: { loadingPlace: false }
      })
      // setLoading(false);
    }

    function error(e) {
      setError(e);
      console.log(e)

      void (async () => {
        // IP Location City
        try {
          const res = await fetch(`https://ipapi.co/json/`);
          const data = await res.json()

          if (Object.values({ city })[0] == null) {
            setCity(data.city)
          }

        } catch (e) {
          setError(e);
          console.log(e)
        }
        actions({
          type: 'setState',
          payload: { loadingPlace: false }
        })
        // setLoading(false);
      })()
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
    // }    
  }, [])

  // return { city, location, loading, error, };
  return { city, location, error, };
};
