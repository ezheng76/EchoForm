import React from 'react'
import { Link } from 'react-router-dom'
import SurveyList from './surveys/SurveyList'

const Dashboard = () => {
    return (
        <div>
            <SurveyList/>
            <div className='fixed-action-btn'>
                <div className='btn-floating btn-large red' style={{marginBottom: '50px'}}>
                    <Link to='/surveys/new'>
                        <i className='material-icons'>add</i>
                    </Link>
                </div>
                
            </div>
        </div>
    )
}

export default Dashboard