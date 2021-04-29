import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../App/App.css';
import { i18nConfig, language, i18nDate } from '../../i18n.js';

const initialValues = {
	weight: '',
	height: '',
	date: ''
}

function updateDateFormat(states) {
  return states.map(s => {
    s.date = i18nDate(s.date);
  })
}

const BmiForm = ({ change }) => {
	const [state, setState] = useState(initialValues);

	const handleChange = e => {
		let { value, name } = e.target;
		if (value > 999) {
			value = 999;
		}
    const date = i18nDate(new Date());
		setState({
			...state,
			[name]: value,
			date
		});
  }

	const handleSubmit = () => {
		change(state);
		setState(initialValues);
	};

  const i18nMessages = i18nConfig.messages[language];

	return (
		<>
			<div className="row">
				<div className="col m6 s12">
					<label class="fl" htmlFor="weight">
            {i18nMessages.weight} ({i18nMessages.inPreposit} {i18nMessages.weightMeasure})
          </label>
					<input
						id="weight"
						name="weight"
						type="number"
						min="1"
						max="999"
						placeholder="50"
						value={state.weight}
						onChange={handleChange}
					/>
				</div>

				<div className="col m6 s12">
					<label class="fl" htmlFor="height">
            {i18nMessages.height} ({i18nMessages.inPreposit} {i18nMessages.heightMeasure})
          </label>
					<input
						id="height"
						name="height"
						type="number"
						min="1"
						max="999"
						placeholder="176"
						value={state.height}
						onChange={handleChange}
					/>
				</div>
			</div>
			<div className="center">
				<button
					id="bmi-btn"
					className="calculate-btn"
					type="button"
					disabled={state.weight === '' || state.height === ''}
					onClick={handleSubmit}
				>
          {i18nMessages.calculate}
				</button>
			</div>
		</>
	);
};

BmiForm.propTypes = {
	change: PropTypes.func.isRequired
};

export default BmiForm;
