import React from 'react'
import { render } from '@testing-library/react'
import { expect } from 'chai'
import { Navbar } from './components/Navbar'

describe('<Navbar>', () => {
  it('renders learn react link', () => {
    const { getByText } = render(<Navbar />)
    const linkElement = getByText(/Seppuku/i)
    expect(document.body.contains(linkElement))
  })
})
