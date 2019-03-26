import { useState, useEffect, useContext } from "react";

import { darkskyAPIKEY } from '../config/apiKey';

import { AppContext } from '../store/context';

export default function useFetchWeather() {
  const { state, actions } = useContext(AppContext)
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);


  useEffect(() => {
    (async () => {
      if (state.cords) {
        setLoading(true);
        actions({
          type: 'setState',
          payload: { loadingData: true }
        })

        console.log("Fetching weather from darksky with:", state.cords, "with", state.unit, "units")

        try {
          const res = await fetch(`https://cors.io/?https://api.darksky.net/forecast/${darkskyAPIKEY}/${state.cords.lat},${state.cords.lng}?exclude=alerts,flags&units=${state.unit}`);
          const data = await res.json()
          setData(data);
          actions({
            type: 'setState',
            payload: { data: data }
          })

        } catch (e) {
          setError(e);
          console.log(e)
        }
        setLoading(false);
        actions({
          type: 'setState',
          payload: { loadingData: false }
        })
      }

    })();
  }, [state.cords, state.unit])

  return { data, loading, error, }
};