import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav>
            <ul>
                <Link to = '/'>Home</Link>
                <Link to = '/about'>About</Link>
                <Link to = '/dates'>More</Link>
            </ul>
        </nav>
    )
}

export default Navbar