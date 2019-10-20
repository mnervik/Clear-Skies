import React, {Component} from 'react'
import {Link} from "react-router-dom"

import config from '../config'
import {toast} from "react-toastify"

class City extends Component {
    state = {
        city: "",
        country: "",
        text: "",
        current: {
            icon: "",
            text: "",
            temp: 0
        },
        forecast: [{
            icon: "",
            text: "",
            temp: 0,
        }],
        gps: {
            lon: 0.0,
            lat: 0.0,
        },
        isFav: false
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        return (
            <div className="col">
                <h1 className="heading heading--inline">
                    <Link to="/search" className="heading__link">
                        <i className="fas fa-caret-left mr-2 ml-3"/>
                    </Link>Clear Skies
                </h1>
                <i className="fas fa-caret-right fa-2x ml-2 mr-1"/>
                <h2 className="heading heading--inline">
                    {this.state.city}, {this.state.country} {this.renderFavouriteStar()}
                </h2>

                <section>
                    <h2 className="heading--sub">Now</h2>
                    <div className="card mb-3 weather">
                        <div className="row no-gutters">
                            <div className="col-md-4">
                                <img className="card-img weather__img"
                                     alt="weather"
                                     src={this.iconToSrc(this.state.current.icon)}/>
                            </div>

                            <div className="col-md-8">
                                <div className="card-body weather__body">
                                    <h5 className="card-title weather__title">{this.state.current.text}</h5>
                                    <p className="card-text weather__temp">{this.state.current.temp}&deg;C</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="heading--sub">16 Day Forecast</h2>
                    {this.renderForecast()}
                </section>
            </div>
        )
    }

    renderFavouriteStar = () => {
        if (localStorage.fav.indexOf(this.state.text) > -1) {
            return (
                <div className="d-inline star star--active">
                    <i className="fas fa-star"
                       onClick={this.removeFavourite}
                    />
                </div>
            )
        } else {
            return (
                <div className="d-inline star">
                    <i className="far fa-star"
                       onClick={this.addFavourite}
                    />
                </div>
            )
        }
    }

    getFavourite() {
        let fav = []
        if (localStorage.fav.length) {
            fav = JSON.parse(localStorage.fav)
        }
        return fav
    }

    removeFavourite = (e) => {
        let fav = this.getFavourite()
        fav = fav.filter(item => {
            return item !== this.state.text
        })

        localStorage.fav = JSON.stringify(fav)

        // Change Visual Status of Star
        e.target.classList.add('far')
        e.target.classList.remove('fas', 'star--active')

        // Toggle Fav status
        this.setState({isFav: false})
    }

    addFavourite = (e) => {
        let fav = this.getFavourite()
        fav.push(this.state.text)
        localStorage.fav = JSON.stringify(fav)

        // Change Visual Status of Star
        e.target.classList.add('fas', 'star--active')
        e.target.classList.remove('far')

        // Toggle Fav status
        this.setState({isFav: true})
    }

    getData() {
        const {match: {params: {text, lon, lat}}} = this.props
        this.setState({text, gps: {lon, lat}})

        const country = text.split(',').pop().trim()
        const city = text.substr(0, text.lastIndexOf(','))

        // Unknown exact location
        if (!parseInt(lat) || !parseInt(lon)) {
            fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&country=${country}&key=${config.apiKey.weatherbit}`)
                .then(res => res.json())
                .then(({data}) => {
                    data = data[0]
                    this.setState({
                        city: data.city_name,
                        country: data.country_code,
                        current: {
                            icon: data.weather.icon,
                            text: data.weather.description,
                            temp: data.temp,
                        },
                    })
                })

            fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}m&country=${country}&key=${config.apiKey.weatherbit}`)
                .then(res => res.json())
                .then(({data}) => {
                    let forecast = data.map((key, index) => {
                        return {
                            icon: data[index].weather.icon,
                            text: data[index].weather.description,
                            temp: data[index].temp
                        }
                    })
                    this.setState({forecast: forecast})
                })
        } else {
            fetch(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${config.apiKey.weatherbit}`)
                .then(res => res.json())
                .then(({data}) => {
                    data = data[0]
                    this.setState({
                        city: data.city_name,
                        country: data.country_code,
                        current: {
                            icon: data.weather.icon,
                            text: data.weather.description,
                            temp: data.temp,
                        },
                    })
                })

            fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${config.apiKey.weatherbit}`)
                .then(res => res.json())
                .then(({data}) => {
                    let forecast = data.map((key, index) => {
                        return {
                            icon: data[index].weather.icon,
                            text: data[index].weather.description,
                            temp: data[index].temp
                        }
                    })
                    this.setState({forecast: forecast})
                })
        }
    }

    renderForecast = () => {
        let arr = []

        for (let i = 0; i < this.state.forecast.length; i++) {
            arr.push(
                <React.Fragment key={i}>
                    {this.singleForecast(i)}
                </React.Fragment>
            )
        }

        return (
            <div className="row">{arr}</div>
        )
    }

    singleForecast (index){
        let tempClass = this.state.forecast[index].temp > 0 ? 'hot' : 'cold'
        tempClass = `text-muted weather__temp weather__temp--${tempClass}`

        return (
            <div className="card col-md-3 col-sm-6 mb-3 forecast">
                <img className="card-img-top forecast__img"
                     alt="weather"
                     src={this.iconToSrc(this.state.forecast[index].icon)}/>

                <div className="card-body forecast__body weather">
                    <h5 className="card-title weather__title">{this.state.forecast[index].text}</h5>
                    <p className={tempClass}>{this.state.forecast[index].temp}&deg;C</p>
                    <p className="text-muted weather__duration">in {index + 1} {index ? 'days' : 'day'}</p>
                </div>
            </div>
        )
    }

    iconToSrc = icon => {
        return `https://www.weatherbit.io/static/img/icons/${icon}.png`
    }
}

export default City