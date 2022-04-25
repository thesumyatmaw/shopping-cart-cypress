Cypress.config('experimentalSessionSupport', true)

describe ('Buy Product Test Suite', ()=>{
    describe('Given access the test link',()=>{
      before(() =>{
				cy.visit('/')
			})

      it('should display Sign in Link', () => {
				cy.get('.login')     
			})

			describe('Buy a product',()=>{
				it('Proceed to check out ', () => {
					cy.session('nameee', () => {
						cy.visit('/')
						cy.get('.cat-title')
						cy.get('[id="searchbox"]').type('Printed Chiffon Dress ').wait(5000)
						cy.get('.ac_results ul>li',{ timeout: 10000 }).eq(0).click()
						cy.contains('Add to cart').click()
						cy.get('#layer_cart')
						cy.get('h2').contains('Product successfully added to your shopping cart')
						cy.get('.layer_cart_product_info')
						cy.wait(2000)
						cy.get('#layer_cart_product_title',{timeout :10000}).contains('Printed Chiffon Dress')
						cy.get('.button-container').find('a').contains('Proceed to checkout').click()
						cy.wait(3000)
						cy.get('#order-detail-content')
						cy.get('#cart_summary').find('tr').its('length').should('be.lte',9)
						cy.get('#HOOK_SHOPPING_CART')
						cy.get('.standard-checkout',{timeout:10000}).click()
						cy.get('#email').type('hellouser1@mailinator.com')
						cy.get('#passwd').type ('welcome')
						cy.get('#SubmitLogin').click()
						cy.get('.address_title')
						cy.get('.page-subheading').contains('Your delivery address')
						cy.get('.page-subheading').contains('Your billing address')
						cy.get('[name="processAddress"]').click()
						cy.get('#carrier_area')
						cy.get('.page-heading').contains('Shipping')
						cy.get('#form')
						cy.get('#uniform-cgv')
						cy.get('#cgv').check().should('be.checked')
						cy.get('[name="processCarrier"]').click()
						cy.get('.page-heading').contains('Please choose your payment method')
						cy.get('#HOOK_PAYMENT')
						cy.get('.payment_module')
						cy.get('.bankwire').click()
						cy.get('.page-heading').contains('Order summary')
						cy.get('.page-subheading').contains('Bank-wire payment.')
						cy.get('button').contains('I confirm my order').click()

						cy.get('.page-heading',{timeout:10000}).contains('Order confirmation')
					})
				})	
			})
    })
})
