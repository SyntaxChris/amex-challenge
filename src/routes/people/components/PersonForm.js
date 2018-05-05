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
import { withRouter } from 'react-router-dom'

class PersonForm extends Component {
  static propTypes () {
    return {
      history: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired
      })
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      errorFields: {},
      formTitle: 'New Person'
    }
  }
  // button action
  async handleButtonClick () {
    const formIsValid = await this.validateForm()

    if (!formIsValid) {
      return console.log('ERRORS')
    }

    return this.props.history.push('/preview-person')
  }
  // input actions
  handleInputChange (val, type, label) {
    type === 'date'
      ? this.handleDateInputChange(val, label)
      : this.handleTextInputChange(val, label)
  }
  // date input action
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
    if (isNaN(val)) {
      return
    }
    
    return this.props.updateFormField('date', {
      ...this.props.formFields.date,
      [placeholder]: val
    })
  }

  handleOnBlur (field, value) {
    if (value) {
      if (field === 'name') {
        return this.validateName()
      }

      if (field === 'date') {
        const { mm, dd, yyyy } = this.props.formFields.date
        // only validate if all date fields have values
        if (mm && dd && yyyy) {
          return this.validateDate()
        }
      }

      if (field === 'email') {
        return this.validateEmail()
      }
    }
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
    
    return this.props.updateFormField(placeholder, val)
  }

  validateDate () {
    const errMsg = validateDate(this.props.formFields.date)
    const { errorFields } = this.state
    if (errMsg) {
      errorFields.date = errMsg
      return this.setState({ errorFields })
    }
    const { date, ...rest } = errorFields

    return this.setState({ errorFields: rest })
  }

  validateEmail () {
    const { errorFields } = this.state
    if(!validateEmail(this.props.formFields.email)) {
      errorFields.email = 'Please enter a valid email address.'
      return this.setState({ errorFields })
    }
    const { email, ...rest } = errorFields

    return this.setState({ errorFields: rest })
  }

  validateName () {
    const { errorFields } = this.state
    if (!validateName(this.props.formFields.name)) {
      errorFields.name = 'Please enter a valid name.'
      return this.setState({ errorFields })
    }
    const { name, ...rest } = errorFields

    return this.setState({ errorFields: rest })
  }

  async validateForm () {
    const { handleFormErrors } = this.props

    await this.setState({ errorFields: {} })
    await this.validateName()
    await this.validateDate()
    await this.validateEmail()

    if (await Object.keys(this.state.errorFields).length) {
      return false
    }

    return true
  }

  render () {
    return <Form
      buttons={this.props.preview ? buttons.previewPerson : buttons.newPerson}
      handleButtonClick={() => this.handleButtonClick()}
      handleInputChange={(val, type, label) => this.handleInputChange(val, type, label)}
      handleOnBlur={(field, value) => this.handleOnBlur(field, value)}
      inputValues={this.props.formFields}
      errorFields={this.state.errorFields}
      formInputs={formInputs}
      preview={this.props.preview}
      title={this.props.title}
    />
  }
}

export default withRouter(PersonForm)