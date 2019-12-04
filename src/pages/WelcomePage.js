import React from 'react'
import {Image, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";


export default function Welcome() {
    return (
        <div className="welcome-area">
            <section className="welcome-contain container">
                <div>
                    <h1 className="welcome-title">Discover the world’s top designers & creatives</h1>
                    <p>Panoko is the leading destination to find & showcase creative work and home to the world's best design professionals.</p>
                    {/* <Button className="signin-btn-v2">Sign Up</Button> */}
                    <Button className="signin-btn-v2" variant="outline-info">
                        <Link className="signin-btn-v2" to="/signup">Sign Up</Link>
                    </Button>
                </div>
                <div>
                    <Image className="welcome-img" src="https://cdn.dribbble.com/assets/art-banners/botw-c092192e602abaa8d6a18c807d25a5f84d57e52eb907d3fa820fb83d29554e37.png" fluid />
                </div>
            </section>
        </div>
    )
}