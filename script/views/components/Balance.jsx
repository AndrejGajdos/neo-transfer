import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Balance(props) {
  const { balance } = props;
  return (
    <div className="card mt-3">
      <div className="card-body text-center">
        <h5 className="card-title font-weight-light">Balance</h5>
        <div className="row">
          <div className="col-6">
            <h4 className="card-title">NEO</h4>
            <p className="card-text display-4">{balance.NEO}</p>
          </div>
          <div className="col-6">
            <h4 className="card-title">GAS</h4>
            <p className="card-text display-4">{balance.GAS}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

Balance.propTypes = {
  balance: PropTypes.object,
};

Balance.defaultProps = {
  balance: {},
};

const mapStateToProps = state => ({
  balance: state.balance,
});

export default connect(
  mapStateToProps,
  null,
)(Balance);
