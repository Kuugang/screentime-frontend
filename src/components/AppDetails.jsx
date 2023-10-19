import { useParams } from "react-router-dom";
import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { getAppDetails, updateAppDetailsTimeSpan, sortRuntime, sortAppDate } from '../redux/AppSlice'
import LoadingSpinner from './LoadingSpinner'
import NotFound from "./NotFound";

var ReactDOM = require('react-dom');

const AppDetails = ({ socket }) => {
    const { app } = useParams();

    const dispatch = useDispatch();

    const { appdetails, appdetailss, isLoading, is404 } = useSelector((state) => state.fetchAppsData);

    useEffect(() => {
		dispatch(getAppDetails({ app }));
	}, [dispatch]);

    useEffect(() => {
        socket.on("Runtime Update", (data) => {
            if (appdetails){
                if (appdetails.length > 1){
                    dispatch(updateAppDetailsTimeSpan({ apps : appdetails, new_timespan : data.new_timespan, id : data._id}))
                }
            }
        });
        return () => {
            socket.removeAllListeners("Runtime Update");
        }
    }, [appdetails])

    const handleAppRuntimeSort = () => {
        dispatch(sortRuntime({apps : appdetails}))
    }

    const handleAppDateSort = () => {
        dispatch(sortAppDate({ apps: appdetailss}))
    }

    if (isLoading) {
        return <LoadingSpinner/>
    } else if (is404){
        return  <NotFound/>
    }else{
        return (
            <div className="content">
                {<h2>{app}</h2>}
                <button onClick = {handleAppRuntimeSort}>Sort by Runtime</button>
                <button onClick = {handleAppDateSort}>Sort by Date</button>

                <div className="container">
                    {appdetails && appdetails.map((app, i) => (
                        <div className= {`card ${app.isActive ? "active" : ""}`} key = {i} id = {app._id} >
                            <h3>{app.date}</h3>
                            <span>{app.timespan}</span>
                        </div>  
                    ))}
                </div>
            </div>
        )
    }
}

export default AppDetails