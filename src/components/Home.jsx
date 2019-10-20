import React, {Component} from 'react'
import {Link} from "react-router-dom"

class Home extends Component {
    render() {
        return (
            <div className="col">
                <h1 className="heading">
                    <i className="fas fa-home mr-1"/>
                    Clear Skies
                    <Link to="/search" className="heading__link">
                        <i className="fas fa-search ml-2 fa-xs"/>
                    </Link>
                </h1>

                <section>
                    <h2 className="heading--sub">Favourites</h2>
                    {this.renderFavourites()}
                </section>
            </div>
        )
    }

    renderFavourites = () => {
        let fav = this.getFavourite()

        let arr = []
        for (let i = fav.length - 1; i >= 0; i--) {
            arr.push(
                <li className="list-group-item favourites" key={i + 1}>
                    {this.renderFavourite(fav[i])}
                </li>
            )
        }

        return (
            <ul className="list-group mw-100">
                {arr}
            </ul>
        )
    }

    renderFavourite = (item) => {
        return (
            <p className="favourites__item">
                {this.renderFavouriteStar()}<Link to={`/city/${item}/0/0`}> {item}</Link>
            </p>
        )
    }

    renderFavouriteStar = () => {
        return (
            <i className="fas fa-star star star--active align-items-end"
               onClick={this.removeFavourite}
            />
        )
    }

    getFavourite() {
        let fav = []
        if (localStorage.fav.length) {
            fav = JSON.parse(localStorage.fav)
        }
        return fav
    }

    removeFavourite = (e) => {
        let node = e.target.parentNode

        let favourite = node.textContent.trim()
        let fav = this.getFavourite()

        // Get index of clicked Item
        let index = fav.indexOf(favourite)
        if (index > -1) {
            fav.splice(index, 1)
        }

        // Update localstorage array
        localStorage.fav = JSON.stringify(fav)

        // Remove Item from DOM
        node.parentElement.remove()
    }
}

export default Home