import React, { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from '../store/context';
import moment from 'moment'
import { Card, CardContent, Typography } from "@material-ui/core";
import iconFinder from "../utils/iconFinder"

let dayInfoArr = []
let highestTemp = null
let lowestTemp = null

const WeeklyForecast = () => {

    const { state } = useContext(AppContext)

    const highestTempWeek = () => {
        let singleTemps = []
        dayInfoArr.forEach(item => {
            singleTemps.push(item.temperatureHigh)
        })
        highestTemp = Math.max(...singleTemps)
    }

    const lowestTempWeek = () => {
        let singleTemps = []
        dayInfoArr.forEach(item => {
            singleTemps.push(item.temperatureLow)
        })
        lowestTemp = Math.min(...singleTemps)

    }

    const weeklyDays = () => {
        let arr = []
        for (let i = 1; i <= 5; i++) {
            arr.push(state.data.daily.data[i])
        }
        dayInfoArr = arr
        highestTempWeek()
        lowestTempWeek()
    }

    useEffect(() => {

        if (state.data && state.data.daily) {
            weeklyDays()

        }
    }, [state.data && state.data.daily])

    return (
        <div>
            {dayInfoArr.length > 0 && highestTemp != null && lowestTemp != null ? (
                <Card>
                    <CardContent>
                        {/* <ul> */}
                        {dayInfoArr.map(daily => {
                            return (
                                <div key={moment.unix(daily.time).format("dddd Do MMMM") + Date.now()}>
                                    <li>
                                        <Typography variant="subtitle1" inline>
                                            {moment.unix(daily.time).format("ddd Do")}
                                        </Typography>
                                        &nbsp;
                                        <img src={iconFinder(daily.icon)} alt={daily.icon}
                                            style={{
                                                verticalAlign: 'middle',
                                                height: '2.5rem',
                                            }}>
                                        </img>

                                        <div
                                            style={{
                                                position: 'relative',
                                                height: '1rem',
                                                width: '100%',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    backgroundColor: 'grey',
                                                    height: '100%',
                                                    borderRadius: '16px',
                                                    border: '1px solid black',

                                                    left: lowestTemp === daily.temperatureLow & lowestTemp < 0
                                                        ? 0 + '%' : Math.abs((daily.temperatureLow / lowestTemp)) + '%',

                                                    width: ((daily.temperatureHigh / highestTemp) * 100) - Math.abs((daily.temperatureLow / lowestTemp)) + '%',
                                                }}
                                            >
                                                <Typography variant="subtitle2" inline style={{ color: 'white', verticalAlign: 'middle', }}>&nbsp;{daily.temperatureLow}°{state.unit === "si" ? "C" : "F"}</Typography>
                                                <Typography variant="subtitle2" inline style={{ color: 'white', float: 'right', verticalAlign: 'middle', }}>{daily.temperatureHigh}°{state.unit === "si" ? "C" : "F"}&nbsp;</Typography>
                                            </div>
                                        </div>

                                    </li>

                                    <br></br>
                                    <hr></hr>
                                </div>

                            )
                        })}
                        {/* </ul> */}
                    </CardContent>
                </Card>
            ) : null}
        </div>
    )
}

export default WeeklyForecast