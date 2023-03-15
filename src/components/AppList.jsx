import { Link } from 'react-router-dom'
import { updateTimeSpan } from '../redux/AppSlice'
import { useEffect } from 'react';
import { getAppsAsync } from '../redux/AppSlice';
import { useSelector, useDispatch } from 'react-redux';
import LoadingSpinner from './LoadingSpinner'

var ReactDOM = require('react-dom');

const AppList = ({ socket }) => {
    
    const dispatch = useDispatch()

	const {apps, isLoading} = useSelector((state) => state.fetchAppsData);

    useEffect(() => {
		dispatch(getAppsAsync());
	}, [dispatch]);

    useEffect(() => {
        socket.on("Runtime Update", (data) => {
            if (apps){
                if (apps.length > 1){
                    dispatch(updateTimeSpan({ apps : apps, new_timespan : data.new_timespan, id : data._id}))
                }
            }
        });
        return () => {
            socket.removeAllListeners("Runtime Update");
        }
    }, [apps])
        
    if (isLoading){
        return <LoadingSpinner/>
	}else{
        return (
            <div className="content">
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

export default AppList