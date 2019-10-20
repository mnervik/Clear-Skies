import React, {Component} from 'react'
import {Link} from "react-router-dom"

class Home extends Component {
    render() {
        return (
            <div className="col">
                <h1><i className="fas fa-home mr-1"/>Clear Skies<Link to="/search"><i className="fas fa-search ml-2 fa-xs"/></Link></h1>

                <section>
                    <h2>Favourites</h2>
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
                <li className="list-group-item" key={i + 1}>
                    {this.renderFavourite(fav[i])}
                </li>
            )
        }

        return (
            <ul className="list-group w-50">
                {arr}
            </ul>
        )
    }

    renderFavourite = (item) => {
        return (
            <p>
                <Link to={`/city/${item}/0/0`}>{this.renderFavouriteStar()} {item}</Link>
            </p>
        )
    }

    renderFavouriteStar = () => {
        return (
            <i className="fas fa-star align-items-end"
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