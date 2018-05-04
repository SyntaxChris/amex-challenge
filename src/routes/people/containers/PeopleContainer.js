import { connect } from 'react-redux'
import People from '../components/people'
import React from 'react'

const mapDispatchToProps = {}

const mapStateToProps = state => ({
  fetching: state.people.fetching
})

export default connect(mapStateToProps, mapDispatchToProps)(People)
