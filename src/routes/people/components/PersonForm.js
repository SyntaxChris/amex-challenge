import Form from '../../../components/Form/index'
import FormLogo from './FormLogo'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  buttons,
  formInputs,
  validateDate,
  validateEmail,
  validateName
} from '../config/personForm'

class PersonForm extends Component {
  constructor (props) {
    super(props)
    // add button onClick actions and bind to PersonForm
    this.buttons = buttons.map((btn) => {
      return { 
        ...btn,
        action: label => this.handleButtonClick(label)
      }
    })
    // add form onChange actions and bind to PersonForm
    this.formInputs = formInputs.map((formInput) => {
      return {
        ...formInput,
        action: (val, type, placeholder) => {
          return this.handleInputChange(val, type, placeholder)
        }
      }
    })

    this.state = {
      formTitle: 'New Person',
      name: '',
      date: {
        mm: '',
        dd: '',
        yyyy: ''
      },
      email: ''
    }
  }
  // button action
  handleButtonClick () {
    this.validateForm() 
  }
  // input action
  handleInputChange (val, type, placeholder) {
    type === 'date'
      ? this.handleDateInputChange(val, placeholder)
      : this.handleTextInputChange(val, placeholder)
  }

  handleFieldErrors (label, errMsg) {
    this.setState({ errorFields: [
      ...this.state.errorFields,
      { [label]: errMsg }
    ]})
  }

  handleDateInputChange (val, placeholder) {
    // set length limits
    if (placeholder === 'mm' && val.length > 2) {
      return
    }
    if (placeholder === 'dd' && val.length > 2) {
      return
    }
    if (placeholder === 'yyyy' && val.length > 4) {
      return
    }

    return this.setState({ date: { ...this.state.date, [placeholder]: val } })
  }

  handleTextInputChange (val, placeholder) {
    // set length limits for email
    if (placeholder === 'email' && val.length > 250) {
      return
    }
    // set length limits for name
    if (placeholder === 'name' && val.length > 50) {
      return
    }

    return this.setState({ [placeholder]: val })
  }

  validateForm () {
    const { handleFormErrors } = this.props
    const errorFields = {}
    // date validations
    if (validateDate(this.state.date)) {
      errorFields['date'] = validateDate(this.state.date)
    }
    // email validations
    if(!validateEmail(this.state.email)) {
      errorFields['email'] = 'Please enter a valid email address.'
    }
    // name validations
    if (!validateName(this.state.name)) {
      errorFields['name'] ='Please enter a valid name.'
    }
    // check if any errors
    if (Object.keys(errorFields).length) {
      handleFormErrors(errorFields)
      return console.log('ERRORS!!')
    }
    // clear errors
    handleFormErrors(errorFields)
    // go to preview page
    return console.log('NO ERRORS!!')
  }

  render () {
    const { formTitle, ...rest } = this.state

    return <Form
      buttons={this.buttons}
      inputValues={rest}
      errorFields={this.props.formFieldErrors}
      formInputs={this.formInputs}
      // logo={<FormLogo />}
      title={formTitle}
    />
  }
}

export default PersonForm