import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.scss';

import { GAME_IDLE, GAME_PLAYING, GAME_ENDED, GAME_COUNTDOWN } from '../../reducers/game/Constants';

import SoundOption from '../soundoption/SoundOption';
import Conditional from '../../helpers/Conditional';

const mapStateToProps = (state) => {
	return {
		state: state.game.state,
		user: state.app.user,
		numberOfPlays: state.game.numberOfPlays
	};
};

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			menuOpen: false
		};
	}

	render() {
		const { state, user, numberOfPlays } = this.props;

		return (
			<header className="header">
				<div className="header__column text-left">
					<SoundOption blocked={state === GAME_PLAYING || numberOfPlays <= 2} />
				</div>

				<div className="header__column text-right">
					<Conditional if={!user.FirstName}>
						<Conditional if={state === GAME_PLAYING || state === GAME_COUNTDOWN}>
							<div className="google__button--disabled" />
						</Conditional>

						<Conditional if={state === GAME_IDLE || state === GAME_ENDED}>
							<a href={process.env.REACT_APP_SERVER_URL + '/auth/google'}>
								<div className="google__button" />
							</a>
						</Conditional>
					</Conditional>

					<Conditional if={user.FirstName}>
						<span>Welcome, {user.FirstName}!</span>
						<a className="header__logout" href={process.env.REACT_APP_SERVER_URL + '/logout'}>Logout</a>
					</Conditional>
				</div>
			</header>
		);
	}
}

export default connect(mapStateToProps)(Header);