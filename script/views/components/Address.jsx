import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from 'actions/access.actions';
import './address.scss';

class Address extends Component {
  static propTypes = {
    address: PropTypes.string,
    logout: PropTypes.func,
  };

  static defaultProps = {
    address: '',
    logout: () => null,
  };

  clickLogout = () => {
    this.props.logout();
  };

  render() {
    const { address } = this.props;
    return (
      <div className="Address card">
        <div className="Address__body card-body d-flex align-items-center">
          <span className="d-flex justify-content-center">{address}</span>
          <button type="button" className="btn btn-outline-danger d-flex ml-auto" onClick={this.clickLogout}>
            Log out
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  address: state.access.address,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Address);
