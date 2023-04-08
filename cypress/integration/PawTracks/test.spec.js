describe('test_name', function () {

    it('what_it_does', function () {

        cy.viewport(1920, 929)
        cy.visit('http://localhost:3000/');
        
        cy.get('#amplify-id-0').type('user');
        cy.get('#amplify-id-2').type('Testuser1!');
        cy.get('.amplify-button--primary').click();
        cy.get('form').submit();
        cy.get('.signOut').click();

    })

})

