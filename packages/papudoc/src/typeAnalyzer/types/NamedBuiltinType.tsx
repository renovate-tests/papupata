import TsType, { Complexity } from '../TsType'
import React from 'react'
import ts from 'typescript'
import { JSONApiType } from '../../jsonAPI'

export default class NamedBuiltinType extends TsType {
  constructor(type: ts.Type, name: string) {
    super([], type)
    this.nameOverride = name
  }

  get complexity(): Complexity {
    return Complexity.Trivial
  }

  toReact() {
    return <span>{this.name}</span>
  }

  toTypeString(): string {
    return this.name
  }

  toJSON(): JSONApiType {
    // handle number literals, odd to have them here but that's how it is now
    if (this.name.match(/^\d+$/)) {
      return {
        type: 'numberLiteral',
        value: +this.name,
        name: this.name,
      }
    }
    switch (this.name) {
      case 'string':
        return { type: 'string', name: this.name }
      case 'number':
        return { type: 'number', name: this.name }
      case 'boolean':
        return { type: 'boolean', name: this.name }
      case 'undefined':
        return { type: 'undefined', name: this.name }
      case 'null':
        return { type: 'null', name: this.name }
      case 'unknown':
        return { type: 'unknown', name: this.name }
      case 'any':
        return { type: 'any', name: this.name }
      case 'never':
        return { type: 'never', name: this.name }
      case 'enumliteral':
        return { type: 'enumliteral', name: this.name } // evidently not supported properly
      default:
        throw new Error('NamedBuiltinType does not support ' + this.name + ' for JSON output')
    }
  }
}
