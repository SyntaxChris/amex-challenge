import Form from '../../../components/Form/index'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  buttons,
  formInputs,
  validateDate,
  validateEmail,
  validateName,
  views as formViews
} from '../config/form'
import { Route, Switch, withRouter } from 'react-router-dom'

class PersonForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errorFields: {},
      offset: 0
    }
  }

  componentWillMount () {
    // redirect to new-person if form isn't validated
    if (!this.props.isValidated && location.pathname !== '/person/new') {
      this.setState({ offset: 0 })
      return this.props.history.push('/person/new')
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
    console.log('btn label', btnLabel)
    if (btnLabel === 'Preview') {
      // validate form
      const formIsValid = await this.validateFormFields()
      // set state for redirect when component mounts
      if (!formIsValid) {
        return validateForm(false)
      }
      await validateForm(true)
      await this.setState({ offset: 1 })

      return await history.push('/person/preview')
    }
    if (btnLabel === 'Back') {
      if (location.pathname === '/person/preview') {
        this.setState({ offset: 1 })
        return history.push('/person/new')
      }
      // clear person form to initial state
      clearForm()
      // clear errors and go back to new person form
      return this.setState({ errorFields: {} }, () => {
        this.setState({ offset: 0 })
        return history.push('/person/new')
      })
    }
    if (btnLabel === 'Submit') {
      this.setState({ offset: 2 })
      // submit new record
      this.postNewPersonRecord()
    }
  }

  postNewPersonRecord () {
    const {
      createPerson,
      formFields,
      history,
      showLoader
    } = this.props
    const { name, date, email } = formFields
    const payload = {
      name,
      date_of_birth: `${date.yyyy}-${date.mm}-${date.dd}`,
      email
    }
    showLoader(true)
    // attempt to create person
    createPerson(payload)
      .then((res) => {
        if (res.type === 'HANDLE_PERSON_CREATE_ERROR') {
          // handle error
          return this.handleError(res.payload.response)
        }
        if (res.payload.age) {
          // person record created successfully
          showLoader(false)
          return history.push('/person/success')
        }
      })
  }

  handleError (err) {
    const {
      handleAppError,
      history,
      showLoader
    } = this.props
    if (err.statusCode == 403) {
      //forbidden
      const { errorFields } = this.state
      errorFields.email = err.message
      this.setState({ errorFields })
    }
    if (err.statusCode == 500) {
      // internal server error
      handleAppError(err.message)
      // hide header bar after 3 seconds
      setTimeout(() => handleAppError(''), 3000)
    }
    showLoader(false)

    return history.push('/person/new')
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
      buttons: buttons[this.state.offset],
      disableTabs: location.pathname !== '/person/new',
      errorFields: this.state.errorFields,
      formInputs: formInputs,
      handleButtonClick: (label) => this.handleButtonClick(label),
      handleInputChange: (val, type, label) => this.handleInputChange(val, type, label),
      handleOnBlur: (field, value) => this.handleOnBlur(field, value),
      inputValues: this.props.formFields,
      loading: this.props.loading,
      offset: this.props.offset,
      successRecord: this.props.successRecord,
      title: this.props.title
    }

    return <Form {...formProps} />

    // return <Switch>
    //   {formViews.map(({ path, title }, i) => <Route
    //     key={`person-form-${i}`}
    //     to={path}
    //     render={() => <Form
    //       // combine formProps with viewProps
    //       {...{ ...formProps, title }}
    //     />}
    //   />)}
    // </Switch>
  }
}

const formFieldPropTypes = {
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
}
const successRecordPropTypes = {
  date_of_birth: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
}

PersonForm.propTypes = {
  clearForm: PropTypes.func.isRequired,
  createPerson: PropTypes.func.isRequired,
  formFields: PropTypes.shape(formFieldPropTypes).isRequired,
  formFieldErros: PropTypes.object,
  handleAppError: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  showLoader: PropTypes.func.isRequired,
  successRecord: PropTypes.shape(successRecordPropTypes).isRequired,
  updateFormField: PropTypes.func.isRequired,
  validateForm: PropTypes.func.isRequired
}

export default withRouter(PersonForm)
