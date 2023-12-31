import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Payments from './Payments'

class Header extends Component{
    renderContent() {
        switch(this.props.auth){
            case null:
                return;
            case false:
                return(
                    <li>
                        <a href='/auth/google'>Login with Google</a>
                    </li>
                )
            default:
                return[
                    <li key='1'><Payments/></li>,
                    <li key='3' style={{margin: '0 5px'}}>Credits: {this.props.auth.credits}</li>,
                    <li key='2'><a href='/api/logout'>Logout</a></li>
                ]
        }
    }

    render() {
        return (
            <nav className='black text-white'>
                <div className="nav-wrapper black text-white container">

                    {/* depend on if the user is logged in or not, clicking the logo will redirect to different links */}
                    <Link to={this.props.auth ? '/surveys' : '/'} className="left brand-logo" style={{marginLeft: '10px'}}>
                        EchoForm
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps({auth}){
    return {auth}
}

export default connect(mapStateToProps)(Header)