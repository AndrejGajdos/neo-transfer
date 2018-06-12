import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import cn from 'classnames';
import { login } from 'actions/access.actions';
import './login.scss';

class Login extends Component {
  static propTypes = {
    login: PropTypes.func,
    error: PropTypes.string,
  };

  static defaultProps = {
    login: () => null,
    error: '',
  };

  state = {
    showKey: false,
    error: null,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({ error: nextProps.error }, () => {
        toast.error(nextProps.error);
      });
    }
  }

  clickChangeInputType = () => {
    this.setState({ showKey: !this.state.showKey });
  };

  onFocus = () => {
    this.setState({ error: null }, () => {
      this.floatLabel.classList.add('active');
    });
  };

  onBlur = (e) => {
    if (e.target.value === '' || e.target.value === 'blank') {
      this.floatLabel.classList.remove('active');
    }
  };

  submitPrivateKey = (e) => {
    e.preventDefault();
    this.props.login(this.privateKey.value);
  };

  render() {
    const { showKey, error } = this.state;
    return (
      <div className="Login card">
        <div className="card-body">
          <form onSubmit={this.submitPrivateKey}>
            <label htmlFor="inputPrivateKey" className="floatLabel" ref={el => (this.floatLabel = el)}>
              Private Key
            </label>
            <div className="input-group">
              <div className="InputContainer d-flex flex-row flex-grow-1">
                <input
                  type={showKey ? 'text' : 'password'}
                  className={cn({ 'form-control InputContainer__Input': true, 'border-danger': error })}
                  id="inputPrivateKey"
                  required
                  ref={el => (this.privateKey = el)}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                />
                <div className="InputContainer__Btn input-group-append">
                  <button
                    className={cn({ 'btn btn-outline-secondary rounded-right': true, 'border-danger': error })}
                    type="button"
                    onClick={this.clickChangeInputType}
                  >
                    <i className="fa fa-eye" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <button type="submit" className="SubmitBtn btn btn-primary">
                Login
              </button>
            </div>
            <small
              className={cn({ 'form-text': true, [`${error ? 'text-danger' : 'text-muted'}`]: true })}
            >
              {error ? 'Please provide a valid private key' : 'Paste or type your private key to log in'}
            </small>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.access.error,
});

const mapDispatchToProps = dispatch => ({
  login: privateUserKey => dispatch(login(privateUserKey)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
