import styled from "styled-components";
import Wrapper from '../assets/wrappers/LandingPage'
import main from '../assets/images/main.svg'
import { Link } from "react-router-dom";
import { Logo } from "../components";


const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className="container page">
                <div className="info">
                    <h1>
                        job <span>tracking </span>App
                    </h1>
                    <p>
                        I'm baby letterpress coloring book hell of, four loko shoreditch you probably haven't heard of them tattooed truffaut dreamcatcher kinfolk pok pok art party. Umami pork belly you probably haven't heard of them roof party cloud bread vape, post-ironic etsy green juice kombucha leggings scenester plaid. Yuccie roof party ethical praxis kitsch PBR&B.
                    </p>
                    <Link to='/register' className="btn register-link">
                        Register
                    </Link>
                    <Link to='/login' className="btn login-link">
                        Login / Demo User
                    </Link>
                </div>
                <img src={main} alt="job hunt" className="img main-img" />
            </div>
        </Wrapper>
    )
}


export default Landing;
