// todo the use of this navlinks page is to reduce the number of lines of code. we well just write <NavLinks/> in the big and small sidebar and this code will be printed there. this is a good practice if you want to set the same links again and again in different pages.


import { useDashboardContext } from "../pages/DashboardLayout";
import links from "../utils/links";
import { NavLink } from "react-router-dom";

const NavLinks = ({ isBigSidebar }) => {

    const { toggleSidebar, user } = useDashboardContext();
    return (
        <div className="nav-links">
            {links.map((link) => {
                const { text, path, icon } = link;
                const { role } = user;
                if (path === './admin' && role !== 'admin') return;
                return (
                    <NavLink
                        to={path}
                        key={text}
                        className='nav-link'
                        onClick={isBigSidebar ? null : 'toggleSidebar'}
                        end
                    >
                        <span className="icon">
                            {icon}
                        </span>
                        {text}
                    </NavLink>)
            })}
        </div>
    )
}

export default NavLinks;
