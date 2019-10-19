import React, {Component} from 'react'
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom"

import Home from "./components/Home"
import Search from "./components/Search"
import City from "./components/City"

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Link to="/">Home</Link>
                <Link to="/search">Search</Link>
                <Link to="/city">City</Link>

                <Switch>
                    <Route path="/search" exact>
                        <Search/>
                    </Route>

                    <Route path="/city" exact>
                        <City/>
                    </Route>

                    <Route path="/" exact>
                        <Home/>
                    </Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App
