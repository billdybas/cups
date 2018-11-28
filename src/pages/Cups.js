import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Container = styled.div`
  align-items: center;
  display: flex;
  height: 75vh;
  justify-content: center;
  width: 100%;
`

const H1 = styled.h1`
  font-family: 'Inter UI', sans-serif;
`

class Cups extends React.Component {
  static propTypes = {
    count: PropTypes.number
  }

  static async getInitialProps({ axios, API_URL }) {
    const response = await axios.get(`${API_URL}/cups`)
    return { count: response.data.count }
  }

  render () {
    const { count } = this.props

    if (!count) return null

    return (
      <Container>
        <H1>
          Bill has drunk {count} cups of coffee ☕️ this year.
        </H1>
      </Container>
    )
  }
}

export default Cups
