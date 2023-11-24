import React from 'react'
import { connect } from 'react-redux'
import formFields from './formFields'
import * as actions from '../../actions'
import { withRouter } from 'react-router-dom'

const SurveyFormReview = ({onCancel, formValues, submitSurvey, history}) => {
    const reviewFormFields = formFields.map( field => {
        return (
            <div key={field.name} style={{marginBottom: '10px'}}>
                <label>{field.label}</label>
                <div>
                    {formValues[field.name]}
                </div>
            </div>
        )
    })

    return (
        <div className='container ' style={{marginTop: '10vh'}}>
            <h5>
                Please review your entries
            </h5>
            <div style={{marginBottom: '20px'}}>
                {reviewFormFields}
            </div>
            <button className='yellow darken-3 white-text btn-flat' onClick={onCancel}>
                Back
            </button>

            <button 
                onClick={() => submitSurvey(formValues, history)}
                className='black btn-flat right white-text'
            >
                Submit Survey
                <i className='material-icons right'>email</i>
            </button>
        </div>
    )
}

function mapToStateProps(state){
    
    return { formValues : state.form.surveyForm.values}
}

export default connect(mapToStateProps, actions)(withRouter(SurveyFormReview))