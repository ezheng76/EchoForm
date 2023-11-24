import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Payments extends Component {
    render() {
        return (
            <StripeCheckout
                name='EchoForm'
                description='$5 for 5 credits'
                amount={500}
                token={token => this.props.handelToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <a className='btn white black-text'>
                    <div className='left'>
                        Add Credit
                    </div>
                    <i className='tiny material-icons right'>
                        add
                    </i>
                </a>
                &nbsp;

            </StripeCheckout>
        )
    }
}

export default connect(null, actions)(Payments)