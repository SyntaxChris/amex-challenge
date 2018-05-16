import CheckMark from './CheckMark'
import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'
import '../styles/record.scss'

const Record = ({ record }) => <section className='record'>
  <div className='record-body'>
    <div className='row'>
      <CheckMark />
      <div className='title'>name</div>
      <div className='info'>{record.name}</div>
    </div>
    <div className='row'>
      <CheckMark />
      <div className='title'>age</div>
      <div className='info'>{record.age}</div>
    </div>
    <div className='row'>
      <CheckMark />
      <div className='title'>date of birth</div>
      <div className='info'>{moment(record.date_of_birth).format('MM-DD-YYYY')}</div>
    </div>
    <div className='row'>
      <CheckMark />
      <div className='title'>email</div>
      <div className='info'>{record.email}</div>
    </div>
  </div>
</section>

Record.propTypes = {
  record: PropTypes.shape({
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    date_of_birth: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  })
}

export default Record
