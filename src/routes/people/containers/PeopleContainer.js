import { connect } from 'react-redux'
import { handleFormError } from '../../../modules/actions/app'
import People from '../components/people'
import React from 'react'

const mapDispatchToProps = {
  handleFormError
}

const mapStateToProps = state => ({
  fetching: state.people.fetching
})

export default connect(mapStateToProps, mapDispatchToProps)(People)
