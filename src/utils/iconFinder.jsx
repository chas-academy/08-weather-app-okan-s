const iconFinder = iconData => {

    if (iconData === "clear-day") {
        return require("../images/wi-day-sunny.svg")
    }
    if (iconData === "clear-night") {
        return require("../images/wi-night-clear.svg")
    }
    if (iconData === "rain") {
        return require("../images/wi-rain.svg")
    }
    if (iconData === "snow") {
        return require("../images/wi-snow.svg")
    }
    if (iconData === "sleet") {
        return require("../images/wi-sleet.svg")
    }
    if (iconData === "wind") {
        return require("../images/wi-strong-wind.svg")
    }
    if (iconData === "fog") {
        return require("../images/wi-fog.svg")
    }
    if (iconData === "cloudy") {
        return require("../images/wi-cloudy.svg")
    }
    if (iconData === "partly-cloudy-day") {
        return require("../images/wi-cloud.svg")
    }
    if (iconData === "partly-cloudy-night") {
        return require("../images/wi-cloud.svg")
    }
    
}

export default iconFinder
