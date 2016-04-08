import React from 'react'
import { Link, browserHistory } from 'react-router'
import Header from './Header'

export default function App({ children }) {
  return (
    <div>
			<Header />
      <div style={{ marginTop: '1.5em' }}>{children}</div>
    </div>
  )
}
