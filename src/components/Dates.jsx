import { useEffect } from "react"
import { Link } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner"
import { FaSortNumericDownAlt, FaSortNumericDown } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { getDates, sortDate } from '../redux/AppSlice'

function Dates() {
    const dispatch = useDispatch()

    const { dates, isLoading, dateOrder } = useSelector((state) => state.fetchAppsData);

    useEffect(() => {
        dispatch(getDates())
    }, [dispatch])

    const handleSortButton = () => {
        dispatch(sortDate({dates: dates}))
    }

    if (isLoading) {
        return <LoadingSpinner/>
    }else{
        return (
            <div className="content">
                <h2>Dates</h2>
                <button onClick = {handleSortButton}>Sort {dateOrder === "DSC" ? <FaSortNumericDownAlt/> : <FaSortNumericDown/> }</button>
                <div className="container">
                    {dates && dates.map((date) => (
                        <Link to = {`/dates/${date}`} id = {date} className = 'card' key = {date}>
                            <p>{date}</p>
                        </Link>
                    ))}
                </div>
            </div>
        )
    }
}
export default Dates