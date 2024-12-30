import React from 'react'
import "./AdminLogin.scss"
import { AdminServices } from '@/Services/AdminServices/AdminServices'

function AdminLogin() {

    const handleLogin = () => {
        AdminServices.login()
    }

    return (
        <section className="adminLoginSec">
            <div className="animated-background">
                <div className="gradient-sphere sphere-1"></div>
                <div className="gradient-sphere sphere-2"></div>
                <div className="gradient-sphere sphere-3"></div>
                <div className="particles" id="particles"></div>
            </div>

            <div className="login-container">
                <div className="login-header">
                    <h1>Welcome</h1>
                    <p>Sign in to continue your journey</p>
                </div>

                <form id="loginForm" onSubmit={handleLogin}>
                    <div className="inputCont">
                        <input
                            type="email"
                            id="email"
                            placeholder="Email address"
                            required
                        />
                        <i className="input-icon fas fa-envelope " />
                    </div>

                    <div className="inputCont">
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            required
                        />
                        <i className="input-icon fas fa-lock" />
                    </div>

                    <div className="btnCont">
                        <button type="submit" className="submit-button">Sign In</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default AdminLogin