import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import { difference } from 'lodash'
import { inject, observer } from 'mobx-react'

const OPTIONS = [
  {
    name: 'Normal',
    key: 1
  },
  {
    name: 'Fighting',
    key: 2
  },
  {
    name: 'Flying',
    key: 3
  },
  {
    name: 'Poison',
    key: 4
  },
  {
    name: 'Ground',
    key: 5
  },
  {
    name: 'Rock',
    key: 6
  },
  {
    name: 'Bug',
    key: 7
  },
  {
    name: 'Ghost',
    key: 8
  }
]

@inject('pokemonsStore')
@observer
class SelectPokemonTypes extends Component {
  static propTypes = {
    pokemonsStore: PropTypes.any
  }

  state = {
    selectedItems: []
  };

  typeTok = [];

  diff = (a, b) => {
    if (a.length > b.length) {
      return difference(a, b)
    } else {
      return difference(b, a)
    }
  }

  handleChange = selectedItems => {
    this.setState({ selectedItems })

    if (selectedItems.length > 0) {
      if (this.typeTok.length === 0) {
        this.typeTok = selectedItems
        this.props.pokemonsStore.getPokemonsFromType(selectedItems.slice(-1)[0])
      } else if (selectedItems.length > this.typeTok.length) {
        this.typeTok.push(selectedItems.slice(-1)[0])
        this.props.pokemonsStore.getPokemonsFromType(selectedItems.slice(-1)[0])
      } else {
        const forDeletion = this.diff(this.typeTok, selectedItems)
        this.typeTok = this.typeTok.filter(item => !forDeletion.includes(item))
        this.props.pokemonsStore.removePokemonsFromType(forDeletion)
      }
    } else {
      const forDeletion = this.diff(this.typeTok, selectedItems)
      this.typeTok = this.typeTok.filter(item => !forDeletion.includes(item))
      this.props.pokemonsStore.totalPokemonsByType = []
      this.props.pokemonsStore.getPokemonsList({
        limit: 964
      })
    }
  }

  render () {
    const { selectedItems } = this.state
    const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o))

    return (
      <Select
        mode='multiple'
        placeholder='Inserted are removed'
        value={selectedItems}
        onChange={this.handleChange}
      >
        {filteredOptions.map(item => (
          <Select.Option key={item.key} value={item.key}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    )
  }
}

export default SelectPokemonTypes
