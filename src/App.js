import React, {Component} from 'react'
import {
    BrowserRouter,
    Switch,
    Route,
} from "react-router-dom"

import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.min.css'

import Home from "./components/Home"
import Search from "./components/Search"
import City from "./components/City"

class App extends Component {
    state = {
        favourite: []
    }

    render() {
        // First Time initialize of LocalStorage
        if (localStorage.fav === undefined) localStorage.fav = []

        return (
            <div className="container">
                <ToastContainer/>

                <BrowserRouter>
                    <Switch>
                        <main className="row">
                            <Route path="/search" render={(props) => <Search {...props}/>}/>
                            <Route path="/city/:text/:lat?/:lon?" render={(props) => <City {...props}/>}/>
                            <Route path="/" exact render={(props) => <Home {...props}/>}/>
                        </main>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App
