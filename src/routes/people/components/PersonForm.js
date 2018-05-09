import Form from '../../../components/Form/index'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  buttons,
  formInputs,
  isValidDate,
  isValidEmail,
  isValidName,
  formViews
} from '../config/form'
import {
  Redirect,
  Route,
  Switch,
  withRouter
} from 'react-router-dom'

class PersonForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errorFields: {},
      formValidated: false
    }
  }

  componentWillMount () {
    const { history } = this.props
    // url update listener
    history.listen((location, action) => {
      // prevent redirect to preview or submitted page if form isn't validated
      if (action === 'POP' && !this.state.formValidated) {
        return history.push('/person/new')
      }
    })
    // redirect to /person/new if form isn't validated
    if (!this.state.formValidated && location.pathname !== '/person/new') {
      return history.push('/person/new')
    }
  }

  async handleButtonClick (btnLabel) {
    const {
      clearForm,
      createPerson,
      formFields,
      history
    } = this.props

    if (btnLabel === 'Preview') {
      // validate form
      const formIsValid = await this.validateFormFields()

      await formIsValid
        ? this.setState({ formValidated: true }, () => history.push('/person/preview'))
        : this.setState({ formValidated: false }, () => history.push('/person/new'))
    }
    if (btnLabel === 'Back') {
      if (location.pathname === '/person/preview') {
        return history.push('/person/new')
      }
      // clear person form to initial state
      clearForm()
      // clear errors and go back to new person form
      return this.setState({
        errorFields: {},
        formValidated: false
      }, () => history.push('/person/new'))
    }
    if (btnLabel === 'Submit') {
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
          this.setState({ formValidated: false}, () => history.push('/person/submitted'))
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
    const errMsg = isValidDate(this.props.formFields.date)
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
    if(!isValidEmail(this.props.formFields.email)) {
      errorFields.email = 'Please enter a valid email address.'
      return this.setState({ errorFields })
    }
    const { email, ...rest } = errorFields

    return this.setState({ errorFields: rest })
  }

  validateName () {
    const { errorFields } = this.state
    if (!isValidName(this.props.formFields.name)) {
      errorFields.name = 'Please enter a valid name.'
      return this.setState({ errorFields })
    }
    const { name, ...rest } = errorFields

    return this.setState({ errorFields: rest })
  }

  async validateFormFields () {
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
      disableTabs: location.pathname !== '/person/new',
      errorFields: this.state.errorFields,
      formInputs: formInputs,
      handleButtonClick: (label) => this.handleButtonClick(label),
      handleInputChange: (val, type, label) => this.handleInputChange(val, type, label),
      handleOnBlur: (field, value) => this.handleOnBlur(field, value),
      inputValues: this.props.formFields,
      loading: this.props.loading,
      successRecord: this.props.successRecord,
      title: this.props.title
    }

    return <Switch>
      {Object.keys(formViews).map((view, i) => <Route
        key={`person-form-route-${i}`}
        path={`/person/${view}`}
        render={({ match }) => <Form
          {...formProps}
          {...formViews[view]}
        />}
      />)}
      <Redirect to='/person/new' />
    </Switch>
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
  updateFormField: PropTypes.func.isRequired
}

export default withRouter(PersonForm)
