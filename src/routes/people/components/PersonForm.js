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
      return { ...btn, action: (label) => this.handleButtonClick(label) }
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
      email: '',
      errorFields: [],
      errorMessages: []
    }
  }

  handleButtonClick () {
    this.validateForm() 
  }

  handleFormErrorMessages (errMsg) {
    this.setState({ errorMessages: [ ...this.state.errorMessages, errMsg ]})
  }

  handleInputChange (val, type, placeholder) {
    type === 'date'
      ? this.handleDateInputChange(val, placeholder)
      : this.handleTextInputChange(val, placeholder)
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
    const { handleFormError } = this.props
    // reset error fields
    this.setState({ errorFields: [] }, () => {
      const errorFields = []
      // date validations
      const dateErrorMessage = validateDate(this.state.date)
      if (dateErrorMessage) {
        errorFields.push('date of birth')
        handleFormError(dateErrorMessage)
      }
      // email validations
      if(!validateEmail(this.state.email)) {
        errorFields.push('email')
        handleFormError('Please enter a valid email address.')
      }
      // name validations
      if (!validateName(this.state.name)) {
        errorFields.push('name')
      }
      // check if any errors
      if (errorFields.length) {
        this.setState({ errorFields })
        handleFormError('Please enter a valid name.')
      } else {
        // go to preview page
      }
    })
  }

  render () {
    const { formTitle, errorFields, ...rest } = this.state
    const inputValues = rest

    return <Form
      buttons={this.buttons}
      inputValues={inputValues}
      errorFields={this.state.errorFields}
      formInputs={this.formInputs}
      // logo={<FormLogo />}
      title={this.state.formTitle}
    />
  }
}

export default PersonForm