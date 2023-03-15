import { getAppsOnDate } from '../redux/AppSlice'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import NotFound from './NotFound';

const AppsOnDate = () => {
    const { date } = useParams(); 

    const dispatch = useDispatch()

    const { appsOnDate, isLoading, is404 } = useSelector((state) => state.fetchAppsData)

    useEffect(() => {
        dispatch(getAppsOnDate({date: date}))
    }, [dispatch])
 
    if (isLoading){
        return <LoadingSpinner/>
    }else if (is404){
        return <NotFound/>
    }else{
        return(
            <div className="content">
                <div className="container">
                    {appsOnDate && appsOnDate.map((app, i) => (
                        <Link to = {`/${app.app}`} className = 'card' key = {i}>
                            <h3>{app.app}</h3>
                            <p><span>{app.timespan}</span></p>
                        </Link>
                    ))}
                </div>
            </div>
        )
    }
}

export default AppsOnDate