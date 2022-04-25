/// <reference types="cypress"/>

describe ('Buy Product Test Suite', ()=>{

    describe('Given access the test link',()=>{
        before(() =>{
			cy.visit('/')
		})
       
        it('should display Sign in Link', () => {
			cy.get('.login')
           
		})

        describe('When a search product in the search box',()=>{
            it('should display relevant product & click on Add to cart  ', () => {
                cy.get('.cat-title')
                cy.get('[id="searchbox"]').type('Printed Chiffon Dress ').wait(5000)
                cy.get('.ac_results ul>li',{ timeout: 10000 }).eq(0).click()
                
            
            })

        })

        describe(' When click on product category ',()=>{

            it('should display product detail ', () => {
                cy.get('.cat-title')
                cy.get('ul.sf-menu').children()
                cy.get('ul.sf-menu').children().eq(1).click()
                
                cy.get('.product_list').children()
                          
            })

        })

    })
})