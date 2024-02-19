describe('Prueba de TableComponent', () => {
  beforeEach(() => {
    // Supongamos que visitamos una página que contiene el componente TableComponent
    cy.visit('http://localhost:5173/clientes');
  });

  it('Muestra los datos correctamente en la tabla', () => {
    // Verificamos que la tabla se muestre en la página
    cy.get('table').should('exist');

    // Verificamos que se muestren las columnas correctas
    cy.contains('th', 'Nombre').should('exist');
    cy.contains('th', 'Apellido').should('exist');
    cy.contains('th', 'Acciones').should('exist');

    // Verificamos que se muestren las filas con los datos correctos
    cy.get('tbody > tr').should('have.length', 5); // Verifica que haya 5 filas (según el valor inicial de rowsPerPage)

    // Verificamos que los datos se muestren correctamente en las filas
    cy.contains('tbody > tr', 'Cupcake').should('exist');
    cy.contains('tbody > tr', '305').should('exist'); // Se muestra en la segunda columna
    cy.contains('tbody > tr', 'Marshmallow').should('exist');
    cy.contains('tbody > tr', '318').should('exist'); // Se muestra en la segunda columna

    // También podrías verificar la presencia de los íconos de editar y eliminar en cada fila
    cy.get('tbody > tr').each(($row) => {
      cy.wrap($row).find('button[aria-label="EditIcon"]').should('exist');
      cy.wrap($row).find('button[aria-label="delete"]').should('exist');
    });
  });

  it('Permite editar y eliminar filas de la tabla', () => {
    // Supongamos que queremos probar la acción de eliminar una fila específica
    // Por ejemplo, vamos a eliminar la fila "Cupcake"
    cy.contains('tbody > tr', 'Cupcake').within(() => {
      cy.get('button[aria-label="delete"]').click(); // Simulamos hacer clic en el botón de eliminar
    });

    // Verificamos que la fila "Cupcake" ya no esté presente en la tabla
    cy.contains('tbody > tr', 'Cupcake').should('not.exist');

    // También podríamos probar la acción de editar una fila específica, si es relevante para tu aplicación
    // Por ejemplo, podríamos simular hacer clic en el botón de editar de la fila "Donut" y verificar que se abra un formulario de edición, etc.
  });
});

