import './hero.css';
import Stripe from "@/app/(components)/Stripe/stripe";

export default function Hero() {
	return <div className='hero-container'>
		<div className="hero-main container">
			<div className="video-wrapper ">
				<video src="/images/hero/hero.mp4"
				       autoPlay
				       muted
				       loop
				       playsInline
				       controls={false}
				       className='hero-video '/>

			</div>
			<div className="video-text-container">
				<h1 className='hero-title'>Незалежна енергія без ризику зупинок</h1>
				<h2 className='hero-subtitle'>Когенераційні рішення для тих, хто не може дозволити зупини процесс.
					Гарантована автономія для
					держустанов і бізнесу</h2>
				<div className="hero-buttons">
					<button className='btn btn_white'>Звʼязатися</button>
					<button className='btn btn_outline'>Прорахувати проект</button>
				</div>

			</div>
			<ul className='hero-description'>
				<li className='hero-description__item'>
					<p className='hero-description__bold'>до 50%</p>
					<span>економія на електроенергії</span>
				</li>
				<li className='hero-description__item'>
					<p className='hero-description__bold'>250–4500 кВт</p>
					<span>нові та вживані ГПУ</span>
				</li>
				<li className='hero-description__item'>
					<p className='hero-description__bold'>100+</p>
					<span>варіантів ГПУ/ КГУ</span>
				</li>
				<li className='hero-description__item'>
					<p className='hero-description__bold'>15-20%</p>
					<span>економія на вартості ГПУ/КГУ</span>
				</li>
				<li className='hero-description__item'>
					<p className='hero-description__bold'>25+ років </p>
					<span>досвіду в енергетиці</span>
				</li>
			</ul>
		</div>
		<Stripe/>
	</div>
}