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
                        Take control of your career with our job tracking app — organize applications, track progress,
                        and stay motivated every step of the way. Whether you're job hunting or leveling up, this
                        platform empowers you to stay focused and land your dream role.
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
