import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cn from 'classnames';
import { toast } from 'react-toastify';
import transfer from 'actions/transfer.actions';
import get from 'lodash/get';
import includes from 'lodash/includes';
import './transfer.scss';

class Transfer extends Component {
  static propTypes = {
    transfer: PropTypes.func,
    transferMessage: PropTypes.object,
    balance: PropTypes.object,
  };

  static defaultProps = {
    transfer: () => null,
    transferMessage: {},
    balance: {},
  };

  state = {
    error: null,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.transferMessage !== nextProps.transferMessage) {
      if (nextProps.transferMessage.error) {
        toast.error(nextProps.transferMessage.error.message);
      }
      if (nextProps.transferMessage.success) {
        toast.success(nextProps.transferMessage.success.message);
      }
    }
  }

  handleChange = () => {
    if (parseFloat(this.props.balance[this.currency.value]) < parseFloat(this.amount.value)) {
      this.setState({
        error: {
          type: 'amount',
        },
      });
    } else {
      this.setState({ error: null });
    }
  };

  onFocus = (e) => {
    document.querySelector(`[for="${e.target.id}"]`).classList.add('active');
  };

  onBlur = (e) => {
    if (e.target.value === '' || e.target.value === 'blank') {
      document.querySelector(`[for="${e.target.id}"]`).classList.remove('active');
    }
  };

  submitTransfer = (e) => {
    e.preventDefault();
    this.props.transfer(this.toAddress.value, parseFloat(this.amount.value), this.currency.value);
  };

  render() {
    const { error } = this.state;
    return (
      <div className="Transfer card mt-4 mb-3">
        <div className="card-body text-center">
          <h5 className="card-title font-weight-light">Transfer</h5>
          <form onSubmit={this.submitTransfer} className="mt-3" autoComplete="off">
            <div className="input-group mb-4">
              <input
                type="text"
                id="inputAddress"
                className="form-control rounded-right"
                aria-label="To address"
                autoComplete="disabled"
                aria-describedby="inputAddress"
                required
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                ref={el => (this.toAddress = el)}
              />
              <label htmlFor="inputAddress" className="floatLabel">
                To Address
              </label>
            </div>
            <div className="row">
              <div className="input-group mb-4">
                <div className="col-7 col-md-9">
                  <input
                    type="number"
                    step="any"
                    min="0"
                    className={cn({ 'form-control': true, 'border-danger': error })}
                    id="inputAmount"
                    required
                    aria-label="Amount"
                    aria-describedby="inputAmount"
                    ref={el => (this.amount = el)}
                    onChange={this.handleChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                  />
                  <label htmlFor="inputAmount" className="floatLabel">
                    Amount
                  </label>
                  {includes(get(this.state.error, 'type'), 'amount') && (
                    <small className="form-text text-left text-danger">
                      {`${this.amount.value} of ${this.currency.value} is more than you own.`}
                    </small>
                  )}
                </div>
                <div className="col-5 col-md-3">
                  <select className="form-control" ref={el => (this.currency = el)} onChange={this.handleChange}>
                    <option>NEO</option>
                    <option>GAS</option>
                  </select>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  transferMessage: state.transfer,
  balance: state.balance,
});

const mapDispatchToProps = dispatch => ({
  transfer: (toAddress, amount, currency) => dispatch(transfer(toAddress, amount, currency)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Transfer);
