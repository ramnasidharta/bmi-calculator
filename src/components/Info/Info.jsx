import React from 'react';
import PropTypes from 'prop-types';
import './Info.css';
import { FormattedMessage } from 'react-intl';

const Info = ({ weight, height, id, date, bmi, deleteCard }) => {
  const handleDelete = () => {
    deleteCard(id);
  };

  return (
    <div className="col m6 s12">
      <div className="card">
        <div className="card-content">
          <span className="card-title" data-test="bmi">
             <FormattedMessage id="bmi"/>: {bmi}
          </span>
          <div className="card-data">
            <span class="fl" data-test="weight">
              <FormattedMessage id="weight"/>: {weight} <FormattedMessage id="weightMeasure"/>
            </span>
            <span class="fl" data-test="height">
              <FormattedMessage id="height"/>: {height} <FormattedMessage id="heightMeasure"/>
            </span>
            <span class="fl" data-test="date">
              <FormattedMessage id="date"/>: {date}
            </span>
          </div>

          <button className="delete-btn" onClick={handleDelete}>
            X
          </button>
        </div>
      </div>
    </div>
  );
};

Info.propTypes = {
  weight: PropTypes.string,
  height: PropTypes.string,
  id: PropTypes.string,
  date: PropTypes.string,
  bmi: PropTypes.string,
  deleteCard: PropTypes.func
};

export default Info;
