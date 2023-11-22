
import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import SurveyField from './SurveyField'
import {Link} from 'react-router-dom'
import validateEmails from '../../utils/validateEmails'
import formFields from './formFields'

class SurveyForm extends Component {
    

    renderFields() {
        let keyNum = 0
        return formFields.map( ({label, name}) => {
            return <Field key={keyNum++} component={SurveyField} type='text' label={label} name={name}/>
        })
    }

    render() {
        return (
            <div>
                <form 
                    onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
                >
                    {this.renderFields()}
                    <Link to='/surveys' className='red btn-flat left white-text'>
                        cancel
                    </Link>
                    <button type='submit' className='teal btn-flat right white-text'>
                        Next
                        <i className='material-icons right'>arrow_forward</i>
                    </button>
                </form>
            </div>
        )
    }
}


function validate(values) {
    const errors = {}

    errors.recipients = validateEmails(values.recipients || '')

    formFields.forEach(({name, noValueError}) => {
        if (!values[name]){
            errors[name] = noValueError
        }
    })

    return errors
}

export default reduxForm({
    validate, //will run to validate inputs whenever user submit a form
    form:'surveyForm',
    destroyOnUnmount: false 
})(SurveyForm)