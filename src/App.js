import {BrowserRouter as Router, Routes, Route} from 'react-router-dom' 
import Home from "./components/Home"
import AppDetails from "./components/AppDetails"
import About from './components/About'
import Dates from './components/Dates'
import AppsOnDate from './components/AppsOnDate'
import Navbar from './components/Navbar';
import NotFound from './components/NotFound'
import {io} from "socket.io-client"


function App() {
	const production_url = "https://screentime-frontend.vercel.app"

	const connectToSocket = () => {
		if (process.env.NODE_ENV === 'development'){
		  	const socket = io.connect("http://localhost:5000");
		  return socket
		}else{
		  	const socket = io.connect(production_url);
		  return socket
		}
	}

	return (
		<Router>
			<div className = "app">
				<Routes>
					<Route path = "" element = {<Home socket = { connectToSocket() }/>}/>
					<Route path = "/about" element = {<About/>}/>
					<Route path = "/dates" element = {<Dates/>}/>
					<Route path = "/:app" element = {<AppDetails socket = { connectToSocket() }/>}/>
					<Route path = "/dates/:date" element = {<AppsOnDate/>}/>
					<Route path = "*" element = {<NotFound/>}/>
				</Routes>
			</div>
			<Navbar/>
		</Router>
  );
}

export default App;
