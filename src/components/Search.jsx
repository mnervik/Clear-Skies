import React, {Component} from 'react'
import {
    Redirect,
    Link
} from "react-router-dom"

import {AsyncTypeahead} from "react-bootstrap-typeahead"
import "react-bootstrap-typeahead/css/Typeahead.min.css"

import config from "../config"

class Search extends Component {
    state = {
        isLoading: false,
        options: [],
        redirect: false,
        text: "",
        gps: {
            lon: 0.0,
            lat: 0.0,
        },
    }

    handleChange = query => {
        this.setState({isLoading: true})

        fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${config.apiKey.google}&input=${query}&types=(regions)&language=en`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    isLoading: false,
                    options: data["predictions"].map(x => x.description),
                })
            })
    }

    handleSearch = (e) => {
        this.setState({
            redirect: true,
            text: e[0]
        })
    }

    handleClick() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const {latitude: lat, longitude: lon} = position.coords

                this.setState({
                    gps: {
                        lon, lat
                    }
                })

                this.cordToText()
            })
        } else {
            console.log('GeoLocation is not supported') // TODO Add Toast
        }
    }

    render() {
        return (
            <div className="col">
                <h1 className="heading">
                    <Link to="/" className="heading__link">
                        <i className="fas fa-home mr-1"/>
                    </Link>
                    Clear Skies
                    <i className="fas fa-search ml-2 fa-xs"/>
                </h1>

                <h2>Find Location</h2>
                <div className="mt-2 mb-1">
                    <div className="btn btn-primary"
                         onClick={() => this.handleClick()}
                    ><i className="fas fa-location-arrow mr-2"/>Use My Location
                    </div>
                </div>

                <AsyncTypeahead
                    minLength={3}
                    onSearch={this.handleChange}
                    onChange={this.handleSearch}
                    placeholder="Search for location"
                    options={this.state.options}
                    className="typeahead"
                />

                {this.renderRedirect()}
            </div>
        )
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={`/city/${this.state.text}/${this.state.gps.lat}/${this.state.gps.lon}`}/>
        }
    }

    cordToText = () => {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.gps.lat},${this.state.gps.lon}&key=${config.apiKey.google}`)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    text: data.results[0]['formatted_address'],
                    redirect: true
                })
            })
    }
}

export default Search