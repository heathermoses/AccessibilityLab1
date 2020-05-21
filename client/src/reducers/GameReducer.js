import update from 'immutability-helper';
import {
	GAME_IDLE,
	TIMER_SECONDS,
	MILLISECONDS_IN_A_SECOND,
	TIMEOUT_MIN_MS,
	COUNTDOWN_SECONDS,
	HINT_BOX_CLOSED,
	BOX_DEFAULT_VALUES
} from '../constants';

export const types = {
	UPDATE_STATE: '@accessibility-lab/audio-cue/game/update_state',
	RESET: '@accessibility-lab/audio-cue/game/reset',
	TICK: '@accessibility-lab/audio-cue/game/tick',
	ROUND_TICK: '@accessibility-lab/audio-cue/game/round_tick',
	COUNTDOWN_TICK: '@accessibility-lab/audio-cue/game/countdown_tick',
	RESET_ROUND_TIMER: '@accessibility-lab/audio-cue/game/reset_round_timer',
	RESET_COUNTDOWN_TIMER: '@accessibility-lab/audio-cue/game/reset_countdown_timer',
	UPDATE_SCORE: '@accessibility-lab/audio-cue/game/update_score',
	INCREMENT_CORRECT_ANSWERS: '@accessibility-lab/audio-cue/game/increment_correct_answers',
	INCREMENT_INCORRECT_ANSWERS: '@accessibility-lab/audio-cue/game/increment_incorrect_answers',
	START_NEW_ROUND: '@accessibility-lab/audio-cue/game/start_new_round',
	UPDATE_HINT_BOX_STATUS: '@accessibility-lab/audio-cue/game/update_hint_box_status',
	UPDATE_HINT_USED: '@accessibility-lab/audio-cue/game/hint_used',
	REVEAL_BOX: '@accessibility-lab/audio-cue/game/reveal_box',
	HIDE_BOX: '@accessibility-lab/audio-cue/game/hide_box',
	UPDATE_BOX: '@accessibility-lab/audio-cue/game/update_box',
	UPDATE_BOX_STATUS: '@accessibility-lab/audio-cue/game/update_box_status',
	TOGGLE_SOUND: '@accessibility-lab/audio-cue/game/update_sound_status',
	ADD_RESULT: '@accessibility-lab/audio-cue/game/add_result',
	UPDATE_CONGRATULATION_MESSAGE: '@accessibility-lab/audio-cue/game/update_congratulation_message',
	SHAKE: '@accessibility-lab/audio-cue/game/shake' // change made
};

export const initialState = {
	state: GAME_IDLE,
	plays: 0,
	results: [],

	// time related
	time: TIMER_SECONDS * MILLISECONDS_IN_A_SECOND / TIMEOUT_MIN_MS,
	roundTime: 0,
	countdownTime: COUNTDOWN_SECONDS,

	// statistics related
	score: 0,
	roundNumber: 0,
	correctAnswers: 0,
	incorrectAnswers: 0,

	// boxes related
	boxes: BOX_DEFAULT_VALUES,
	correctBoxNumber: null,
	boxRevealed: false,

	// hint related
	hintBoxStatus: HINT_BOX_CLOSED,
	hintUsed: false,

	// misc
	soundEnabled: true,
	congratulationMessage: null,
	shake: false // change made
};

export default (state = initialState, action) => {
	switch (action.type) {
		case types.SHAKE:
			return {
				shake: true
			}
		case types.UPDATE_STATE:
			return {
				...state,
				state: action.state
			};

		case types.RESET:
			return {
				...initialState,
				plays: state.plays + 1,
				results: state.results,
				soundEnabled: state.soundEnabled
			};

		case types.TICK:
			return {
				...state,
				time: state.time - 1
			};

		case types.ROUND_TICK:
			return {
				...state,
				roundTime: state.roundTime + TIMEOUT_MIN_MS
			};

		case types.COUNTDOWN_TICK:
			return {
				...state,
				countdownTime: state.countdownTime - 1
			};

		case types.RESET_ROUND_TIMER:
			return {
				...state,
				roundTime: 0
			};

		case types.RESET_COUNTDOWN_TIMER:
			return {
				...state,
				countdownTime: COUNTDOWN_SECONDS
			};

		case types.UPDATE_SCORE:
			return {
				...state,
				score: action.score
			};

		case types.INCREMENT_CORRECT_ANSWERS:
			return {
				...state,
				correctAnswers: state.correctAnswers + 1
			};

		case types.INCREMENT_INCORRECT_ANSWERS:
			return {
				...state,
				incorrectAnswers: state.incorrectAnswers + 1
			};

		case types.START_NEW_ROUND:
			return {
				...state,
				roundNumber: state.roundNumber + 1,
				boxes: BOX_DEFAULT_VALUES,
				hintUsed: false
			};

		case types.UPDATE_HINT_BOX_STATUS:
			return {
				...state,
				hintBoxStatus: action.status
			};

		case types.UPDATE_HINT_USED:
			return {
				...state,
				hintUsed: action.hintUsed
			};

		case types.REVEAL_BOX:
			return {
				...state,
				boxRevealed: true
			};

		case types.HIDE_BOX:
			return {
				...state,
				boxRevealed: false
			};

		case types.UPDATE_BOX:
			return {
				...state,
				correctBoxNumber: action.box
			};

		case types.UPDATE_BOX_STATUS:
			return update(state, {
				boxes: {
					[action.box]: {
						$set: action.status
					}
				}
			});

		case types.TOGGLE_SOUND:
			return {
				...state,
				soundEnabled: !state.soundEnabled
			};

		case types.ADD_RESULT:
			return {
				...state,
				results: state.results.concat(action.result)
			};

		case types.UPDATE_CONGRATULATION_MESSAGE:
			return {
				...state,
				congratulationMessage: action.message
			};

		default:
			return state;
	}
};

export const actions = {
	updateState: (state) => ({ type: types.UPDATE_STATE, state }),
	reset: () => ({ type: types.RESET }),
	tick: () => ({ type: types.TICK }),
	roundTick: () => ({ type: types.ROUND_TICK }),
	countdownTick: () => ({ type: types.COUNTDOWN_TICK }),
	resetRoundTimer: () => ({ type: types.RESET_ROUND_TIMER }),
	resetCountdownTimer: () => ({ type: types.RESET_COUNTDOWN_TIMER }),
	updateScore: (score) => ({ type: types.UPDATE_SCORE, score }),
	incrementCorrectAnswers: () => ({ type: types.INCREMENT_CORRECT_ANSWERS }),
	incrementIncorrectAnswers: () => ({ type: types.INCREMENT_INCORRECT_ANSWERS }),
	startNewRound: () => ({ type: types.START_NEW_ROUND }),
	updateHintBoxStatus: (status) => ({ type: types.UPDATE_HINT_BOX_STATUS, status }),
	updateHintUsed: (hintUsed) => ({ type: types.UPDATE_HINT_USED, hintUsed }),
	revealBox: () => ({ type: types.REVEAL_BOX }),
	hideBox: () => ({ type: types.HIDE_BOX }),
	updateBox: (box) => ({ type: types.UPDATE_BOX, box }),
	updateBoxStatus: (box, status) => ({ type: types.UPDATE_BOX_STATUS, box, status }),
	toggleSound: () => ({ type: types.TOGGLE_SOUND }),
	addResult: (result) => ({ type: types.ADD_RESULT, result }),
	updateCongratulationMessage: (message) => ({ type: types.UPDATE_CONGRATULATION_MESSAGE, message }),
	shakeHint: () => ({type: types.SHAKE}) // change made
};
