// in the bigsidebar, the show sidebar is the opposite of the small sidebar as we want to show the sidebar by default.
// also we donot want the sidebar to dissapear every time we click on a link, we will do this by passing the props
import Wrapper from "../assets/wrappers/BigSidebar"
import NavLinks from "./NavLinks"
import Logo from "./Logo"
import { useDashboardContext } from "../pages/DashboardLayout"

const BigSidebar = () => {

    const { showSidebar } = useDashboardContext();
    return (
        <Wrapper>
            <div className={showSidebar ? 'sidebar-container ' : 'sidebar-container show-sidebar'}>
                <div className="content">
                    <header>
                        <Logo />
                    </header>
                    <NavLinks isBigSidebar:true />
                </div>
            </div>
        </Wrapper>
    )
}

export default BigSidebar
