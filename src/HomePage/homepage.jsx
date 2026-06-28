import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './homepage.css'
import Intrests from './Intrests'
import Footer from './footer'
import homestudent from './image/homestudent.png'

const TrendingCard = ({ image, altImage, title, author, time, price, oldPrice, rating, reviews, badge, link }) => {
	const [src, setSrc] = useState(image)

	return (
		<div className="card-frame">
			<div
				className="trending-card"
				onMouseEnter={() => altImage && setSrc(altImage)}
				onMouseLeave={() => setSrc(image)}
			>
				<div className="card-image">
					<img src={src} alt={title} />
				</div>
				<div className="card-body">
					<h4>{link ? <Link to={link} className="course-link">{title}</Link> : title}</h4>
					<div className="card-meta">{author} · {time}</div>

					<hr className="card-divider" />

					<div className="card-bottom">
						<div className="price-block">
							<span className="price">${price}</span>
							{oldPrice && <span className="old-price">${oldPrice}</span>}
						</div>

						<div className="rating">⭐ {rating} <span className="reviews">({reviews})</span></div>
					</div>

					{badge && <div className="badge">{badge}</div>}
				</div>
			</div>
		</div>
	)
}

export default function HomePage() {
	return (
		<div className="homepage-root">
			<section className="hero">
				<div className="hero-content">
					<h1>
						Get Lifetime <span className="accent">Deal</span>
					</h1>
					<p className="hero-sub">Access to all on-demand courses</p>
					<button className="cta">Redeem Now</button>
				</div>

				{/* Student image on the right - placed lower to avoid nav overlap */}
				<div className="hero-image">
					<img
						src={homestudent}
						alt="student"
					/>
				</div>
			</section>

			<section className="trending">
				<div className="section-header">
					<h3>Trending Courses</h3>
					<Link className="all-courses" to="/all-courses">All Courses ›</Link>
				</div>

				<div className="trending-grid">
					<TrendingCard
						image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
						altImage="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80"
						title="Advanced Front-End Programming Techniques"
						link="/courses/advanced-frontend"
						author="Julia Anatole"
						time="1 hr"
						price="12.99"
						oldPrice="36"
						rating="4.5"
						reviews="2,980"
						badge="Top Author"
					/>

					<TrendingCard
						image="https://images.unsplash.com/photo-1532614431035-c5a0b1d0b7b4?auto=format&fit=crop&w=800&q=80"
						altImage="https://images.unsplash.com/photo-1508385082359-fc77a9b1a019?auto=format&fit=crop&w=800&q=80"
						title="Ultimate Cybersecurity Fundamental for Beginners"
						author="Jacob Jones"
						time="3:30 hr"
						price="12.99"
						oldPrice="36"
						rating="4.5"
						reviews="2,980"
						badge="Editor's Choice"
					/>

					<TrendingCard
						image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80"
						altImage="https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=800&q=80"
						title="Digital User Experience Design Essentials"
						author="Cody Fisher"
						time="2 hr"
						price="10.99"
						oldPrice="32"
						rating="4.5"
						reviews="2,980"
						badge="Top Author"
					/>

					<TrendingCard
						image="https://images.unsplash.com/photo-1531497865144-0463e7b1b6d7?auto=format&fit=crop&w=800&q=80"
						altImage="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
						title="Artificial Intelligence with Python"
						author="Jenny Wilson"
						time="1:30 hr"
						price="10.99"
						oldPrice="32"
						rating="4.5"
						reviews="2,980"
						badge="Editor's Choice"
					/>
				</div>
			</section>

			<Intrests />


			<Footer />
		</div>
	)
}
