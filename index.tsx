import { IAugmentedJQuery, IComponentOptions } from 'angular'
import fromPairs = require('lodash.frompairs')
import NgComponent from 'ngcomponent'
import * as React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { createRoot, Root } from 'react-dom/client'

/**
 * Wraps a React component in Angular. Returns a new Angular component.
 *
 * Usage:
 *
 *   ```ts
 *   type Props = { foo: number }
 *   class ReactComponent extends React.Component<Props, S> {}
 *   const AngularComponent = react2angular(ReactComponent, ['foo'])
 *   ```
 */
export function react2angular<Props>(
  Class: React.ComponentType<Props>,
  bindingNames: (keyof Props)[] | null = null,
  injectNames: string[] = []
): IComponentOptions {
  let root: Root
  const names =
    bindingNames ||
    (Class.propTypes && (Object.keys(Class.propTypes) as (keyof Props)[])) ||
    []

  return {
    bindings: fromPairs(names.map(_ => [_, '<'])),
    controller: [
      '$element',
      ...injectNames,
      class extends NgComponent<Props> {
        static get $$ngIsClass() {
          return true
        }
        isDestroyed = false
        injectedProps: { [name: string]: any }
        constructor(
          private $element: IAugmentedJQuery,
          ...injectedProps: any[]
        ) {
          super()
          this.injectedProps = {}
          injectNames.forEach((name, i) => {
            this.injectedProps[name] = injectedProps[i]
          })
        }

        render() {
          if (!this.isDestroyed) {
            root = createRoot(this.$element[0])
            root.render(
              <Class {...this.props} {...(this.injectedProps as any)} />
            )
          }
        }
        componentWillUnmount() {
          this.isDestroyed = true
          if (root) {
            root.unmount()
          }
          // unmountComponentAtNode(this.$element[0])
        }
      }
    ]
  }
}
