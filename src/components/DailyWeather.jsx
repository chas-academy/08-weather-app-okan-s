import React from "react";
import { useContext } from "react";
import { AppContext } from '../store/context';
import moment from 'moment'

import iconFinder from "../utils/iconFinder"
import { Card, CardContent, Typography, Grid, Paper } from "@material-ui/core";


const DailyWeather = () => {

    const { state } = useContext(AppContext)

    const hourly = () => {
        let arr = []
        for (let i = 0; i < 24; i++) {
            arr.push(
                state.data.hourly.data[i]
            )
        }
        return arr
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            {state.data ? (
                <Grid container>

                    <Card>
                        <CardContent>

                            <Grid container
                                direction="column"
                                justify="center"
                                alignItems="center"
                            >
                                <Grid item>
                                    <Typography variant="title">
                                        {state.data.hourly.summary}
                                    </Typography>
                                </Grid>

                                <Grid item>
                                    <img height="128px" src={iconFinder(state.data.currently.icon)} alt={state.data.currently.icon}></img>
                                </Grid>

                                <Grid item>
                                    <Typography variant="h3">
                                        {state.data.currently.temperature}°{state.unit === "si" ? "C" : "F"}
                                    </Typography>
                                </Grid>

                            </Grid>


                            <br></br>

                            <Paper>
                                <Grid
                                    container
                                    style={{
                                        display: 'flex',
                                        overflowX: 'auto',
                                        whiteSpace: 'nowrap',
                                        flexWrap: 'nowrap',
                                    }}
                                >

                                    {hourly().map(item => {
                                        return (
                                            <Grid
                                                item
                                                key={moment.unix(item.time).format("LT") + Date.now()}
                                                style={{
                                                    textAlign: 'center',
                                                }}>
                                                <Typography variant="subtitle1">&nbsp;&nbsp;<u>{moment.unix(item.time).format("LT")}</u>&nbsp;&nbsp;</Typography>
                                                <img height="32px" src={iconFinder(item.icon)} alt={item.icon}></img>
                                                <Typography variant="subtitle2">{item.temperature}°{state.unit === "si" ? "C" : "F"}</Typography>
                                            </Grid>
                                        )
                                    })}

                                </Grid>
                            </Paper>

                            <br></br>

                            <Paper>
                                <Grid
                                    container
                                    style={{
                                        display: 'flex',
                                        overflowX: 'auto',
                                        flexWrap: 'nowrap',
                                        justifyContent: 'space-between',
                                        textAlign: 'center',
                                    }}
                                >

                                    <Grid item sm>
                                        <Typography variant="subtitle1"><u><b>Sunrise</b></u></Typography>
                                        <img height="64px" src={require("../images/wi-sunrise.svg")} alt="sunrise"></img>
                                        <Typography variant="subtitle2">{moment.unix(state.data.daily.data[0].sunriseTime).format("LT")}</Typography>

                                    </Grid>

                                    <Grid item sm>
                                        <Typography variant="subtitle1"><u><b>Wind</b></u></Typography>
                                        <img height="64px" src={require("../images/wi-strong-wind.svg")} alt="Wind"></img>
                                        <Typography variant="subtitle2">{state.data.currently.windSpeed} {state.unit === "si" ? "m/s" : "mph"}</Typography>

                                    </Grid>

                                    <Grid item sm>
                                        <Typography variant="subtitle1"><u><b>Humidity</b></u></Typography>
                                        <img height="64px" src={require("../images/wi-humidity.svg")} alt="humidity"></img>
                                        <Typography variant="subtitle2">{Math.round(state.data.currently.humidity * 100)}%</Typography>
                                    </Grid>

                                    <Grid item sm>
                                        <Typography variant="subtitle1"><u><b>Sunset</b></u></Typography>
                                        <img height="64px" src={require("../images/wi-sunset.svg")} alt="sunset"></img>
                                        <Typography variant="subtitle2">{moment.unix(state.data.daily.data[0].sunsetTime).format("LT")}</Typography>
                                    </Grid>

                                </Grid>
                            </Paper>

                        </CardContent>
                    </Card>
                </Grid>

            ) : null}

        </div>
    )
}

export default DailyWeather