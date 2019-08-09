import React, { useState } from 'react';
import './App.css';

import Form from './components/Form'
import DailyWeather from './components/DailyWeather';
import WeeklyForecast from './components/WeeklyForecast';

import useGlobalState from './hooks/useGlobalState'
import { AppContext } from './store/context'
import { Typography, Tabs, Tab, AppBar, Grid, CircularProgress } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';

const App = () => {
  const store = useGlobalState()

  const [index, setIndex] = useState(0);

  const handleChange = (event, value) => {
    setIndex(value);
  };

  const handleChangeIndex = index => {
    setIndex(index);
  }

  return (
    <div className="App">
      <AppContext.Provider value={store}>

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item md={4} sm={7} xs={11}>
            <Form></Form>
            <br></br>

            {store.state.loadingData === true || store.state.loadingData === undefined || store.state.data == null
              ? <center><CircularProgress /></center>
              : (
                <>
                  <AppBar
                    position="static"
                    style={{
                      backgndColor: '#607d8b',
                    }}
                  >
                    <Tabs value={index} variant="fullWidth" onChange={handleChange}>
                      <Tab label="Daily" />
                      <Tab label="Weekly" />
                    </Tabs>
                  </AppBar>

                  <SwipeableViews index={index} onChangeIndex={handleChangeIndex} enableMouseEvents>
                    <div style={{ padding: 15 }}><DailyWeather /></div>
                    <div style={{ padding: 15 }}><WeeklyForecast /></div>
                  </SwipeableViews>
                </>
              )}

          </Grid>
        </Grid>

      </AppContext.Provider>

      <a
        href="https://darksky.net/poweredby/"
        style={{
          position: 'static',
          bottom: '0',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Typography variant="caption"
          style={{
            color: 'grey',
          }}
        >
          Powered by Dark Sky
        </Typography>
      </a>

    </div>
  )
}

export default App