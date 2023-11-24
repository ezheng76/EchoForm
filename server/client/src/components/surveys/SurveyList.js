import React , { Component }from 'react'
import { connect } from 'react-redux'
import { fetchSurveys } from '../../actions'

class SurveyList extends Component{

    componentDidMount() {
        this.props.fetchSurveys()
    }

    renderSurveys() {
        return this.props.surveys.reverse().map(survey => {
            return (
                <div className='container'>
                    <div className='card darken-1' key={survey._id} 
                        style={{border: '5px gray solid', borderRadius: '10px'}}
                    >
                        <div className='card-content '>
                            <span className='card-title'>
                                Survey Title: {survey.title}
                            </span>
                            <p>
                                Survey Body: {survey.body}
                            </p>
                            <p className='right'>
                                Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                            </p>
                        </div>
                        <div className='card-action'>
                            <a>Yes: {survey.yes}</a>
                            <a>No: {survey.no}</a>
                        </div>
                    </div>
                </div>
                
            )
        })
    }

    render(){
        return (
            <div>
                {this.renderSurveys()}
            </div>
        )
    }
}


function mapStateToProps(state){
    return { surveys: state.surveys}
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList)