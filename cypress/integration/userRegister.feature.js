import { getRandomGeneratedEmail } from './sharedConst'

const mockUser = {
  email: getRandomGeneratedEmail(),
  firstName: 'Jasmine',
  lastName: 'royal',
  password: 'welcome',
  dob: {
    day: 21,
    month: 'January',
    year: '1992',
  },
  address: 'Boxer Street 1',
  city: 'Berlin',
  state: 'New York',
  postalCode: '10456',
  country: 'United States',
  phone: '+4965544567',
  assignAddress: 'Boxer Street 1 Berlin Germany',
}

describe('User Register Test Suite', () => {
  describe('Given access the test link', () => {
    before(() => {
      cy.visit('/')
    })
    it('should display Web Banner', () => {
      cy.get('a')
      cy.get('.img-responsive').should(
        'have.attr',
        'src',
        'http://automationpractice.com/modules/blockbanner/img/sale70.png'
      )
    })
    it('should display Header logo', () => {
      cy.get('#header_logo')
      cy.get('[class="logo img-responsive"]').should(
        'have.attr',
        'src',
        'http://automationpractice.com/img/logo.jpg'
      )
    })
    it('should display Search box', () => {
      cy.get('[class="search_query form-control ac_input"]')
    })
    it('should display Shopping Cart', () => {
      cy.get('.shopping_cart')
    })

    it('should display Sign in Link', () => {
      cy.get('.login')
    })

    it('should display Product Categories panel', () => {
      cy.get('#block_top_menu')
      cy.get('ul.sf-menu').children()
    })

    it('should display product lists', () => {
      cy.get('#homefeatured')
    })

    describe('When you click on Sign in link', () => {
      it('should display Authentication page', () => {
        cy.get('.login').click()
        cy.get('.page-heading').contains('Authentication')
      })
      it('should display Create account panel in Authentication page', () => {
        cy.get('#create-account_form')
        cy.get('.page-subheading').contains('Create an account')
        cy.get('#email_create')
        cy.get('#SubmitCreate')
      })
      it('should display already registered panel in Authentication page', () => {
        cy.get('#login_form')
        cy.get('.page-subheading').contains('Already registered?')
        cy.get('#email')
        cy.get('#passwd')
        cy.get('#SubmitLogin')
      })

      describe(' When enter invalid email in Create account panel', () => {
        it('should display Invalid email address error message. ', () => {
          cy.get('#email_create').type('erexe23')
          cy.get('#SubmitCreate').click()
          cy.get('#create_account_error', { timeout: 10000 }).contains(
            'Invalid email address.'
          )
        })
      })

      describe(' When enter valid email address in Create account panel', () => {
        it('should display Personal infromation form ', () => {
          cy.reload()
          cy.get('#email_create').type(mockUser.email)
          cy.get('#SubmitCreate').click()
          cy.get('#center_column', { timeout: 10000 })
          cy.get('#account-creation_form', { timeout: 10000 })
        })

        describe('When leave some mandatory fields empty & click submit', () => {
          it('should display Error infromation form ', () => {
            cy.get('#customer_firstname', { timeout: 10000 }).type('Hello ')
            cy.get('#submitAccount').click()

            cy.get('[class="alert alert-danger"]', { timeout: 10000 })
          })
        })

        describe('When Fill all mandatory fields & click submit', () => {
          it('should display new account profile ', () => {
            cy.get('#id_gender2', { timeout: 1000 }).click()
            cy.get('#customer_firstname').clear()
            cy.get('#customer_firstname').type(mockUser.firstName)
            cy.get('#customer_lastname').type(mockUser.lastName)
            cy.get('#email')
              .invoke('attr', 'value')
              .should('contain', mockUser.email)
            cy.get('#passwd').type(mockUser.password)
            cy.get('#days').select(mockUser.dob.day)
            cy.get('#months').select(mockUser.dob.month)
            cy.get('#years', { timeout: 3000 }).select(mockUser.dob.year)
            cy.get('#address1').type(mockUser.address)
            cy.get('#city').type(mockUser.city)
            cy.get('#id_state').select(mockUser.state)
            cy.get('#postcode').type(mockUser.postalCode)
            cy.get('#id_country').type(mockUser.country)
            cy.get('#phone_mobile').type(mockUser.phone)
            cy.get('#alias').type(mockUser.address)
            cy.get('#submitAccount').click()

            cy.get('.header_user_info')
            cy.contains(mockUser.firstName + ' ' + mockUser.lastName)
            // cy.get('.account').find('span').invoke('attr','value').should.apply('contain', mockUser.firstName + ' '+mockUser.lastName)

            cy.get('.page-heading')
            cy.get('.myaccount-link-list').children()
            cy.get('.logout').click()
          })
        })
      })

      describe(' When Sign with recently created new email address ', () => {
        it('should login with this account successfully ', () => {
          cy.reload()
          cy.get('#email').type(mockUser.email)
          cy.get('#passwd').type(mockUser.password)
          cy.get('#SubmitLogin').click()

          cy.get('.header_user_info')
          cy.contains(mockUser.firstName + ' ' + mockUser.lastName)
          cy.get('.page-heading')
        })
      })
    })
  })
})
