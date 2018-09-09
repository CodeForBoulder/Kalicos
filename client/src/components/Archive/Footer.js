import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Footer.css'

const Footer = () => (
	<div className="footer">
		<ul className="footernav">
			<li><Link to="/">Home page</Link></li>
			<li><Link to="/maps">Find a charity</Link></li>
			<li><Link to="/about">About Kalicos</Link></li>
			<li><Link to="/contact">Contact us</Link></li>
		</ul>
		<ul className="copyright">
			<li>Copyright Kalicos Code for Boulder 2018.</li>
			<li>All rights reserved.</li>
			<li>Contact</li>
			<li>webmaster@codeforboulder.org</li>
		</ul>
	</div>
)


export default Footer