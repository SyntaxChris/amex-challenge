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
      errorFields: {}
    }
  }

  componentWillMount () {
    // redirect to new-person if form isn't validated
    if (!this.props.isValidated && location.pathname !== '/new-person') {
      return this.props.history.push('/new-person')
    }
  }

  async handleButtonClick (btnLabel) {
    const {
      clearForm,
      createPerson,
      formFields,
      history,
      validateForm
    } = this.props

    if (btnLabel === 'Preview') {
      // validate form
      const formIsValid = await this.validateFormFields()
      // set state for redirect when component mounts
      if (!formIsValid) {
        return validateForm(false)
      }
      validateForm(true)

      return history.push('/preview-person')
    }
    if (btnLabel === 'Back') {
      if (location.pathname === '/preview-person') {
        return history.push('/new-person')
      }
      // clear person form to initial state
      clearForm()
      // clear errors and go back to new person form
      return this.setState({ errorFields: {} }, () => {
        return history.push('/new-person')
      })
    }
    if (btnLabel === 'Submit') {
      // submit new record
      this.postNewPersonRecord()
    }
  }

  postNewPersonRecord () {
    const { createPerson, formFields, history } = this.props
    const { name, date, email } = formFields
    const payload = {
      name,
      date_of_birth: `${date.yyyy}-${date.mm}-${date.dd}`,
      email
    }
    // attempt to create person
    createPerson(payload)
      .then((res) => {
        if (res.payload.age) {
          return history.push('/success')
        }
        const { errorFields } = this.state
        errorFields.email = res.payload.response.message
        this.setState({ errorFields })

        return history.push('/new-person')
      })
  }

  handleInputChange (val, type, label) {
    type === 'date'
      ? this.handleDateInputChange(val, label)
      : this.handleTextInputChange(val, label)
  }

  handleDateInputChange (val, placeholder) {
    if (
      (placeholder === 'mm' && val.length > 2) ||
      (placeholder === 'dd' && val.length > 2) ||
      (placeholder === 'yyyy' && val.length > 4) ||
      isNaN(val)
    ) {
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

  async validateFormFields () {
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
    const formProps = {
      buttons: buttons[this.props.offset],
      disableTabs: location.pathname !== '/new-person',
      handleButtonClick: (label) => this.handleButtonClick(label),
      handleInputChange: (val, type, label) => this.handleInputChange(val, type, label),
      handleOnBlur: (field, value) => this.handleOnBlur(field, value),
      inputValues: this.props.formFields,
      errorFields: this.state.errorFields,
      formInputs: formInputs,
      offset: this.props.offset,
      successRecord: this.props.successRecord,
      title: this.props.title
    }

    return <Form {...formProps} />
  }
}

export default withRouter(PersonForm)