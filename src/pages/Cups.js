import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import axios from 'axios'
import capitalize from 'lodash.capitalize'

import { config } from '../config'

const Main = styled.main`
  margin: 0 auto;
  padding-top: 15vh;
  text-align: center;
  width: 100%;
`

const H1 = styled.h1`
  font-family: 'Inter UI', sans-serif;
  display: block;
  min-height: 42px;
  padding: 0;
`

const H3 = styled.h3`
  font-family: 'Inter UI', sans-serif;
  margin-bottom: 24px;
  text-align: center;
`

const Drinks = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: 380px;
`

const Drink = styled.p`
  background: #eeeeee;
  border: 2px solid #a0a0a0;
  border-radius: 50px;
  box-sizing: border-box;
  cursor: pointer;
  font-family: 'Inter UI', sans-serif;
  padding: 8px 24px;
  margin: 0 16px 24px;
  text-align: center;
  min-width: 150px;

  &:hover {
    background: #e0e0e0;
  }
`

class Cups extends React.Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    drinks: PropTypes.arrayOf(PropTypes.string).isRequired
  }

  static defaultProps = {
    count: 0,
    drinks: [],
  }

  state = {
    filter: '',
    filterCount: 0,
  }

  static async getInitialProps() {
    const cups = await axios.get(`${config.API_URL}/cups`)
    const drinks = await axios.get(`${config.API_URL}/drinks`)
    return { count: cups.data.count, drinks: drinks.data.drinks }
  }

  handleFilterClick = async (drink) => {
    const count = await axios.get(`${config.API_URL}/cups.filter?drink=${drink}`)
    this.setState({ filter: drink, filterCount: count.data.count })
  }

  render () {
    const { count, drinks } = this.props
    const { filter, filterCount } = this.state

    return (
      <React.Fragment>
        <Main>
          <H1>
            Bill has drunk {count} cup{count !== 1 ? 's' : ''} of coffee ☕️ this year.
          </H1>
          <H1>{filter && `${filterCount} ${filterCount === 1 ? 'was' : 'were'} ${filter}.`}</H1>
        </Main>
        {drinks.length && <H3>Filter by drink</H3>}
        <Drinks>
          {drinks.map((drink, index) =>
            <Drink
              key={index}
              onClick={() => this.handleFilterClick(drink)}
            >
              {capitalize(drink)}
            </Drink>
          )}
        </Drinks>
      </React.Fragment>
    )
  }
}

export default Cups
