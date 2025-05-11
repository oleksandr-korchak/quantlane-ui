import { findById } from '@cy/utils'


describe('My First Test', () => {
    it('Does not do much!', () => {
        const elm = findById('test')
        elm.should('not.exist')
        // expect(true).to.equal(true)
    })
})
