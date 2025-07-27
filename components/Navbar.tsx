import NavItem from './NavItem'

export default function Navbar() {
    return (
        <div className='flex bg-secondary p-4 lg:text-lg  justify-center gap-6'>
            <NavItem title="Popular" param="popular" />
            <NavItem title="Upcoming" param="upcoming" />
            <NavItem title="Top rated" param="top_rated" />
        </div>
    )
}
