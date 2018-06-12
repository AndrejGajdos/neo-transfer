import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';
import Login from './components/Login';
import Transfer from './components/Transfer';
import Address from './components/Address';
import Balance from './components/Balance';

function Main(props) {
  const { address } = props;
  return (
    <div className="container col-12 col-sm-10 col-md-9 col-lg-6 col-xl-5 mt-3">
      {address.length < 1 ? <Login /> : <Address />}
      <SlideDown in={address.length > 0}>
        {address.length > 0 && (
          <div>
            <Balance />
            <Transfer />
          </div>
        )}
      </SlideDown>
    </div>
  );
}

Main.propTypes = {
  address: PropTypes.string,
};

Main.defaultProps = {
  address: '',
};

const mapStateToProps = state => ({
  address: state.access.address,
});

export default connect(
  mapStateToProps,
  null,
)(Main);
