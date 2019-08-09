import React from 'react';
import { useState, useEffect, useContext } from "react";
import { AppContext } from '../store/context';
import useFetchGeolocation from '../hooks/useFetchGeolocation'
import useFetchWeather from '../hooks/useFetchWeather'

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import TextField from '@material-ui/core/TextField';
import { MenuItem, CircularProgress, Switch, Typography, Paper } from '@material-ui/core';


const Form = () => {

  const [address, setAddress] = useState("")

  const { city, } = useFetchGeolocation()

  const { state, actions } = useContext(AppContext)

  useEffect(() => {
    actions({
      type: 'setState',
      payload: { unit: "si" }
    })
  }, [])

  const handleToggleChange = name => event => {
    if (event.target.checked) {
      actions({
        type: 'setState',
        payload: { unit: "us" }
      })
    } else {
      actions({
        type: 'setState',
        payload: { unit: "si" }
      })
    }

  };

  const handleChange = address => {
    setAddress(address)
    actions({
      type: 'setState',
      payload: { data: null }
    })
  };

  const handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Google places success:', latLng)
        actions({
          type: 'setState',
          payload: { cords: latLng }
        })
        actions({
          type: 'setState',
          payload: { location: address }
        })
      })
      .catch(error => console.error('Error', error))
  };

  //When IP fetch gets data
  useEffect(() => {
    if (city) {
      setAddress(city)
      handleSelect(city)
    }
  }, [city])

  useFetchWeather()

  return (
    <>
      <PlacesAutocomplete
        value={state.loadingPlace === true ? 'Loading geolocation...' : address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <>
            <Paper
              style={{
                width: '100%',
              }}
            >
              <TextField
                required
                label="Search Places"
                {...getInputProps({
                  className: 'location-search-input',
                })}
                style={{
                  width: '96%',
                  margin: '0.5% 1.5% 1% 2%',
                }}
              />

              <div className="autocomplete-dropdown-container">
                {loading && <CircularProgress />}

                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: 'grey', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <MenuItem
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </MenuItem>
                  );
                })}
              </div>
            </Paper>
          </>
        )}
      </PlacesAutocomplete>

      <br></br>

      <Paper
        style={{
          backgroundColor: '#ea9d3e',
          float: 'right',
          width: 'fit-content',
        }}
      >
        &nbsp;
          <Typography inline>Metric</Typography>
        <Switch onChange={handleToggleChange()} />
        <Typography inline>Imperial</Typography>
        &nbsp;
      </Paper>


      <br></br>
      <br></br>
      <br></br>

    </>
  );
}

export default Form