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
            <div className="container">
                <BrowserRouter>
                    <div className="row">
                        <div className="col-2">
                            <Link to="/">Home</Link>
                            <Link to="/search">Search</Link>
                            <Link to="/city">City</Link>
                        </div>
                    </div>

                    <Switch>
                        <main className="row">
                            <Route path="/search">
                                <Search/>
                            </Route>

                            <Route path="/city">
                                <City/>
                            </Route>

                            <Route path="/" exact>
                                <Home/>
                            </Route>
                        </main>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App
