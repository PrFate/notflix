import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

export const Home = () => {

    const [email, setEmail] = useState('');

    return (
        <main className='main'>
            <section className='home'>
                <article className='home__cta' style={{backgroundImage: "url('./assets/bg.jpeg')"}}>
                    <h2 className='heading-secondary heading-secondary--light u-margin-bottom-small'>Unlimited movies, TV, shows and more</h2>
                    <p className='subheading subheading--light u-margin-bottom'>Watch anywhere. Cancel anytime</p>
                    <form className='home__form'>
                        <label htmlFor="emailInputEl" className="home__label">Ready to watch? Enter your email:</label>
                        <span className="home__input-group">
                            <input type='email' className='home__input' id='emailInputEl' onChange={(e) => setEmail(e.target.value)} placeholder="Email Address"/>
                            <Link to={`/signin/${email}`}>
                                <button className='btn btn--form'>Sign Up</button>
                            </Link>
                        </span>
                        <p className='home__sublabel'>Entering your email will create or restart your membership</p>
                    </form>
                </article>
                <img className='home__img' src="./assets/notflix.svg" alt='Girl holding Netflix logo'/>
            </section>
        </main>
    );
};