import { Link } from 'react-router-dom'
import { updateTimeSpan } from '../redux/AppSlice'
import { useEffect } from 'react';
import { getAppsAsync, sortAppName, sortRuntime } from '../redux/AppSlice';
import { useSelector, useDispatch } from 'react-redux';
import LoadingSpinner from './LoadingSpinner'
const Home = ({ socket }) => {

	const dispatch = useDispatch()

	const {apps, isLoading } = useSelector((state) => state.fetchAppsData);

    useEffect(() => {
		dispatch(getAppsAsync());
	}, [dispatch]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            socket.on("Runtime Update", (data) => {
                console.log(socket.id);
                if (apps) {
                    if (apps.length > 1) {
                        dispatch(updateTimeSpan({ apps: apps, new_timespan: data.new_timespan, id: data._id }));
                    }
                }
            });
        }, 1000);
    
        return () => {
            clearInterval(intervalId);
            socket.removeAllListeners("Runtime Update");
        };
    }, [apps]);
    

	const handleAppNameSort = () =>{
		dispatch(sortAppName({ apps : apps}))
	}

	const handleAppRuntimeSort = () => {
		dispatch(sortRuntime({ apps: apps}))
	}
        
    if (isLoading){
        return <LoadingSpinner/>
	}else{
        return (
            <div className="content">
				<button onClick = {handleAppNameSort}>Sort By Name</button>
				<button onClick = {handleAppRuntimeSort}>Sort By Runtime</button>
                <div className="container">
                    {apps && apps.map((app, i) => 
                        <Link to = {`/${app.app}`} className= {`card ${app.isActive ? "active" : ""}`} key = {i} id = {app._id} >
                            <h3>{app.app}</h3>
                            <span>{app.timespan}</span>
                        </Link>
                    )}
                </div>
            </div>
        )
    }
}

export default Home
