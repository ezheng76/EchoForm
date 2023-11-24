import React, {Component} from 'react'
// import { Link } from 'react-router-dom'

class Footer extends Component{
    constructor(props) {
        super(props);
        this.year = new Date().getFullYear()
    }
    render() {
        return (
            
                <footer className="page-footer black text-white" style={{position: 'relative',
                    bottom: 0,
                    left: 0,
                    width: '100%'}}>
                    <div className="footer-copyright">
                        <div className="container center">
                            © {this.year}
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            <a href='https://github.com/ezheng76' style={{color: 'inherit', textDecoration: 'inherit'}}>
                                <i className="fab fa-github"></i>
                                ezheng76
                            </a>
                                        
                        </div>
                    </div>
                </footer>
        
        )
    }
}


export default Footer