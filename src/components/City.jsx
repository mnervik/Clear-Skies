import React, {Component} from 'react'
import {Link} from "react-router-dom"

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
                <h1 className="d-inline"><Link to="/search"><i className="fas fa-caret-left mr-2 ml-2"/></Link>Clear Skies
                </h1><i className="fas fa-caret-right fa-2x ml-2 mr-1"/><h2
                className="d-inline">{this.state.city}, {this.state.country} {this.renderFavouriteStar()}</h2>

                <section>
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
                </section>

                <section>
                    <h2>Forecast Weather</h2>
                    {this.renderForecast()}
                </section>
            </div>
        )
    }

    renderFavouriteStar = () => {
        if (localStorage.fav.indexOf(this.state.text) > -1) {
            return (
                <React.Fragment>
                    <i className="fas fa-star"
                       onClick={this.removeFavourite}
                    />
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <i className="far fa-star"
                       onClick={this.addFavourite}
                    />
                </React.Fragment>
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
        e.target.classList.remove('fas')

        this.setState({isFav: false})
    }

    addFavourite = (e) => {
        let fav = this.getFavourite()
        fav.push(this.state.text)
        localStorage.fav = JSON.stringify(fav)

        // Change Visual Status of Star
        e.target.classList.add('fas')
        e.target.classList.remove('far')

        this.setState({isFav: true})
    }

    getData() {
        const {match: {params: {text, lon, lat}}} = this.props
        this.setState({text, gps: {lon, lat}})

        const country = text.split(',').pop().trim()
        const city = text.substr(0, text.lastIndexOf(','))

        // Unknown exact location
        if (!parseInt(lat) || !parseInt(lon)) {
            fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&country=${country}&key=4c59b77e86454e1b9e79b6a2105ac214`)
                .then(res => res.json())
                .then(({data}) => {
                    data = data[0]
                    this.setState({
                        city: data.city_name,
                        country: data.country_code,
                        current: {
                            icon: `https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png`,
                            text: data.weather.description
                        },
                    })
                })

            fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}m&country=${country}&key=4c59b77e86454e1b9e79b6a2105ac214`)
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
            fetch(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=4c59b77e86454e1b9e79b6a2105ac214`)
                .then(res => res.json())
                .then(({data}) => {
                    data = data[0]
                    this.setState({
                        city: data.city_name,
                        country: data.country_code,
                        current: {
                            icon: `https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png`,
                            text: data.weather.description,
                            temp: data.temp,
                        },
                    })
                })

            fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=4c59b77e86454e1b9e79b6a2105ac214`)
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

    singleForecast = index => {
        return (
            <div className="card mb-3 w-25">
                <img className="card-img-top"
                     style={{width: "100px"}}
                     alt="weather"
                     src={this.iconToSrc(this.state.forecast[index].icon)}/>

                <div className="card-body">
                    <h5 className="card-title">{this.state.forecast[index].text}</h5>
                    <p className="card-text">{this.state.forecast[index].temp}&deg;C</p>
                    <p className="text-muted">in {index + 1} {index ? 'days' : 'day'}</p>
                </div>
            </div>
        )
    }

    iconToSrc = icon => {
        return `https://www.weatherbit.io/static/img/icons/${icon}.png`
    }
}

export default City