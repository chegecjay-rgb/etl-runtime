import {
  deepFreeze,
} from '../../graph/immutable.js'

describe('TASK-008 deep freeze', () => {
  test('freezes nested structures', () => {
    const frozenObject =
      deepFreeze({
        level1: {
          level2: {
            value: 'sealed',
          },
        },
        array: [
          {
            id: 'a',
          },
        ],
        map: new Map([
          [
            'key',
            {
              nested: true,
            },
          ],
        ]),
        set: new Set([
          {
            marker: 'x',
          },
        ]),
      })

    expect(
      Object.isFrozen(frozenObject)
    ).toBe(true)

    expect(
      Object.isFrozen(frozenObject.level1)
    ).toBe(true)

    expect(
      Object.isFrozen(frozenObject.level1.level2)
    ).toBe(true)

    expect(
      Object.isFrozen(frozenObject.array)
    ).toBe(true)

    expect(
      Object.isFrozen(frozenObject.map)
    ).toBe(true)

    expect(
      Object.isFrozen(frozenObject.set)
    ).toBe(true)
  })

  test('rejects mutation attempts', () => {
    const frozenObject =
      deepFreeze({
        array: [],
      })

    expect(() => {
      const mutableArray =
        frozenObject.array as unknown as unknown[]

      mutableArray.push({
        injected: true,
      })
    }).toThrow()
  })
})
