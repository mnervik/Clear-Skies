import React, {Component} from 'react'

class City extends Component {
    state = {
        city: "",
        country: "",
        current: {
            icon: "",
            text: "",
        },
        forecast: [{
            icon: "",
            text: "",
            temp: 0,
        }],
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        return (
            <div className="col">
                <h1>{this.state.city}, {this.state.country}</h1>

                <h2>Current Weather</h2>
                <div className="card mb-3" style={{maxWidth: "400px"}}>
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            <img className="card-img"
                                 style={{width: "100px"}}
                                 alt="weather"
                                 src={this.state.current.icon}/>
                        </div>

                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{this.state.current.text}</h5>
                            </div>
                        </div>
                    </div>
                </div>

                <h2>Forecast Weather</h2>
                {this.getForecast()}
            </div>
        )
    }

    getData() {
        /*fetch("https://api.weatherbit.io/v2.0/current?city=Raleigh,NC&key=54409a0c2c2d4e5cbd525473f8951456")
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    city: data.city_name,
                    country: data.country_code,
                    current: {
                        icon: `https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png`,
                        text: data.weather.description
                    },
                })
            })*/

        let data =
            {
                "data": [
                    {
                        "rh": 79,
                        "pod": "d",
                        "lon": 10.4,
                        "pres": 1000.64,
                        "timezone": "Europe/Oslo",
                        "ob_time": "2019-10-19 14:19",
                        "country_code": "NO",
                        "clouds": 95,
                        "ts": 1571494770,
                        "solar_rad": 13.0065,
                        "state_code": "16",
                        "city_name": "Trondheim",
                        "wind_spd": 1.97101,
                        "last_ob_time": "2019-10-19T13:50:00",
                        "wind_cdir_full": "east-northeast",
                        "wind_cdir": "ENE",
                        "slp": 1007.76,
                        "vis": 24.1348,
                        "h_angle": 54,
                        "sunset": "15:46",
                        "dni": 234.92,
                        "dewpt": 3.3,
                        "snow": 0,
                        "uv": 0.748155,
                        "precip": 0,
                        "wind_dir": 59,
                        "sunrise": "06:17",
                        "ghi": 35.15,
                        "dhi": 29.09,
                        "aqi": 29,
                        "lat": 63.43,
                        "weather": {
                            "icon": "c04d",
                            "code": "804",
                            "description": "Overcast clouds"
                        },
                        "datetime": "2019-10-19:14",
                        "temp": 6.6,
                        "station": "ENVA",
                        "elev_angle": 8.98,
                        "app_temp": 3.3
                    }
                ],
                "count": 1
            }
        data = data.data[0]

        this.setState({
            city: data.city_name,
            country: data.country_code,
            current: {
                icon: this.iconToSrc(data.weather.icon),
                text: data.weather.description
            },
        })

        data = {
            "data": [{
                "moonrise_ts": 1571506746,
                "wind_cdir": "ESE",
                "rh": 78,
                "pres": 1000.81,
                "high_temp": 6.5,
                "sunset_ts": 1571500236,
                "ozone": 285.783,
                "moon_phase": 0.602845,
                "wind_gust_spd": 10.0503,
                "snow_depth": 0,
                "clouds": 91,
                "ts": 1571436060,
                "sunrise_ts": 1571465702,
                "app_min_temp": 2.4,
                "wind_spd": 2.33467,
                "pop": 20,
                "wind_cdir_full": "east-southeast",
                "slp": 1007.95,
                "valid_date": "2019-10-19",
                "app_max_temp": 3.8,
                "vis": 0,
                "dewpt": 3.1,
                "snow": 0,
                "uv": 1.27071,
                "weather": {"icon": "c04d", "code": 804, "description": "Overcast clouds"},
                "wind_dir": 103,
                "max_dhi": null,
                "clouds_hi": 33,
                "precip": 0.0322266,
                "low_temp": 4.2,
                "max_temp": 7,
                "moonset_ts": 1571493991,
                "datetime": "2019-10-19",
                "temp": 6.5,
                "min_temp": 5.8,
                "clouds_mid": 17,
                "clouds_low": 80
            }, {
                "moonrise_ts": 1571595173,
                "wind_cdir": "E",
                "rh": 72,
                "pres": 1005.86,
                "high_temp": 6.7,
                "sunset_ts": 1571586448,
                "ozone": 294.907,
                "moon_phase": 0.490792,
                "wind_gust_spd": 10.4445,
                "snow_depth": 0,
                "clouds": 46,
                "ts": 1571522460,
                "sunrise_ts": 1571552271,
                "app_min_temp": -0.3,
                "wind_spd": 3.33688,
                "pop": 20,
                "wind_cdir_full": "east",
                "slp": 1013.19,
                "valid_date": "2019-10-20",
                "app_max_temp": 3.5,
                "vis": 0,
                "dewpt": 0.2,
                "snow": 0,
                "uv": 2.2999,
                "weather": {"icon": "c03d", "code": 803, "description": "Broken clouds"},
                "wind_dir": 79,
                "max_dhi": null,
                "clouds_hi": 7,
                "precip": 0.000976562,
                "low_temp": 3.7,
                "max_temp": 6.7,
                "moonset_ts": 1571582838,
                "datetime": "2019-10-20",
                "temp": 4.8,
                "min_temp": 3.7,
                "clouds_mid": 28,
                "clouds_low": 26
            }, {
                "moonrise_ts": 1571684872,
                "wind_cdir": "SSW",
                "rh": 79,
                "pres": 1009.26,
                "high_temp": 6.6,
                "sunset_ts": 1571672659,
                "ozone": 276.806,
                "moon_phase": 0.377399,
                "wind_gust_spd": 5.98143,
                "snow_depth": 0,
                "clouds": 98,
                "ts": 1571608860,
                "sunrise_ts": 1571638840,
                "app_min_temp": -0,
                "wind_spd": 1.47093,
                "pop": 10,
                "wind_cdir_full": "south-southwest",
                "slp": 1016.68,
                "valid_date": "2019-10-21",
                "app_max_temp": 3.3,
                "vis": 0,
                "dewpt": 1.7,
                "snow": 0,
                "uv": 1.32139,
                "weather": {"icon": "c04d", "code": 804, "description": "Overcast clouds"},
                "wind_dir": 203,
                "max_dhi": null,
                "clouds_hi": 84,
                "precip": 0.121094,
                "low_temp": 3.9,
                "max_temp": 6.6,
                "moonset_ts": 1571670722,
                "datetime": "2019-10-21",
                "temp": 5.1,
                "min_temp": 3.9,
                "clouds_mid": 72,
                "clouds_low": 58
            }, {
                "moonrise_ts": 1571775942,
                "wind_cdir": "SSE",
                "rh": 80,
                "pres": 992.951,
                "high_temp": 12,
                "sunset_ts": 1571758872,
                "ozone": 225.573,
                "moon_phase": 0.268559,
                "wind_gust_spd": 16.4598,
                "snow_depth": 0,
                "clouds": 97,
                "ts": 1571695260,
                "sunrise_ts": 1571725410,
                "app_min_temp": 0.9,
                "wind_spd": 2.62898,
                "pop": 85,
                "wind_cdir_full": "south-southeast",
                "slp": 1000.32,
                "valid_date": "2019-10-22",
                "app_max_temp": 12,
                "vis": 0,
                "dewpt": 3.2,
                "snow": 0,
                "uv": 1.82383,
                "weather": {"icon": "r01d", "code": 500, "description": "Light rain"},
                "wind_dir": 149,
                "max_dhi": null,
                "clouds_hi": 57,
                "precip": 6.67969,
                "low_temp": 4.9,
                "max_temp": 12,
                "moonset_ts": 1571758036,
                "datetime": "2019-10-22",
                "temp": 6.4,
                "min_temp": 4.6,
                "clouds_mid": 89,
                "clouds_low": 66
            }, {
                "moonrise_ts": 1571867948,
                "wind_cdir": "SSW",
                "rh": 83,
                "pres": 991.947,
                "high_temp": 9.6,
                "sunset_ts": 1571845085,
                "ozone": 220.878,
                "moon_phase": 0.170831,
                "wind_gust_spd": 15.4218,
                "snow_depth": 0,
                "clouds": 97,
                "ts": 1571781660,
                "sunrise_ts": 1571811981,
                "app_min_temp": 7.3,
                "wind_spd": 2.30939,
                "pop": 85,
                "wind_cdir_full": "south-southwest",
                "slp": 999.236,
                "valid_date": "2019-10-23",
                "app_max_temp": 9.6,
                "vis": 0,
                "dewpt": 5.7,
                "snow": 0,
                "uv": 1.63089,
                "weather": {"icon": "r03d", "code": 502, "description": "Heavy rain"},
                "wind_dir": 194,
                "max_dhi": null,
                "clouds_hi": 51,
                "precip": 6.48438,
                "low_temp": 7.5,
                "max_temp": 9.6,
                "moonset_ts": 1571845046,
                "datetime": "2019-10-23",
                "temp": 8.3,
                "min_temp": 7.3,
                "clouds_mid": 81,
                "clouds_low": 75
            }, {
                "moonrise_ts": 1571873981,
                "wind_cdir": "SSE",
                "rh": 80,
                "pres": 961.322,
                "high_temp": 6.8,
                "sunset_ts": 1571931300,
                "ozone": 230.627,
                "moon_phase": 0.0908358,
                "wind_gust_spd": 9.40531,
                "snow_depth": 0,
                "clouds": 98,
                "ts": 1571868060,
                "sunrise_ts": 1571898552,
                "app_min_temp": 0.8,
                "wind_spd": 2.74727,
                "pop": 65,
                "wind_cdir_full": "south-southeast",
                "slp": 1000.76,
                "valid_date": "2019-10-24",
                "app_max_temp": 7.5,
                "vis": 23.8202,
                "dewpt": 2.8,
                "snow": 0,
                "uv": 0.784007,
                "weather": {"icon": "c04d", "code": 804, "description": "Overcast clouds"},
                "wind_dir": 154,
                "max_dhi": null,
                "clouds_hi": 82,
                "precip": 2.0625,
                "low_temp": 0,
                "max_temp": 7.6,
                "moonset_ts": 1571931899,
                "datetime": "2019-10-24",
                "temp": 6,
                "min_temp": 3.8,
                "clouds_mid": 96,
                "clouds_low": 94
            }, {
                "moonrise_ts": 1571966538,
                "wind_cdir": "SSW",
                "rh": 85,
                "pres": 959.884,
                "high_temp": 0.1,
                "sunset_ts": 1572017515,
                "ozone": 247.271,
                "moon_phase": 0.0343258,
                "wind_gust_spd": 8.20923,
                "snow_depth": 12.8,
                "clouds": 90,
                "ts": 1571954460,
                "sunrise_ts": 1571985124,
                "app_min_temp": -4.9,
                "wind_spd": 3.41581,
                "pop": 85,
                "wind_cdir_full": "south-southwest",
                "slp": 999.462,
                "valid_date": "2019-10-25",
                "app_max_temp": 2.6,
                "vis": 14.1751,
                "dewpt": 0.7,
                "snow": 12.75,
                "uv": 0.798951,
                "weather": {"icon": "s04d", "code": 610, "description": "Mix snow/rain"},
                "wind_dir": 200,
                "max_dhi": null,
                "clouds_hi": 15,
                "precip": 4.3125,
                "low_temp": -3.8,
                "max_temp": 6.7,
                "moonset_ts": 1572018686,
                "datetime": "2019-10-25",
                "temp": 3,
                "min_temp": -0.8,
                "clouds_mid": 76,
                "clouds_low": 70
            }],
            "city_name": "Trondheim",
            "lon": "10.39506",
            "timezone": "Europe/Oslo",
            "lat": "63.43049",
            "country_code": "NO",
            "state_code": "16"
        }
        data = data.data

        let forecast = data.map(function (key, index) {
            return {
                icon: data[index].weather.icon,
                text: data[index].weather.description,
                temp: data[index].temp
            }
        })
        this.setState({forecast: forecast})
    }

    getForecast() {
        let arr = []

        for(let i = 0; i < this.state.forecast.length; i++) {
            arr.push(<React.Fragment key={i}>{this.singleForecast(i)}</React.Fragment>)
        }

        return arr
    }

    singleForecast(index) {
        return (
            <div className="card mb-3" style={{maxWidth: "400px"}}>
                <img className="card-img-top"
                     style={{width: "100px"}}
                     alt="weather"
                     src={this.iconToSrc(this.state.forecast[index].icon)}/>

                     <div className="card-body">
                         <h5 className="card-title">{this.state.forecast[index].text}</h5>
                         <p className="card-text">{this.state.forecast[index].temp}&deg;C</p>
                     </div>
            </div>
        )
    }

    iconToSrc(icon) {
        return `https://www.weatherbit.io/static/img/icons/${icon}.png`
    }
}

export default City