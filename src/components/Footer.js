import React from 'react'

const Footer = () => {
  return (
    <div className='Footer'>
        <footer className="bg-light text-center text-lg-start">
            {/* Copyright */}
            <div
                className="text-center p-3"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            >
                © 2024 - till date Copyright:
                 <a className="text-dark" href="/">
                mym.com
                </a>
            </div>
            {/* Copyright */}
        </footer>

    </div>
  )
}

export default Footer