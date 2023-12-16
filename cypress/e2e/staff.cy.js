
describe('Quản lý nhân viên', () => {
  beforeEach(() => {
    cy.readFile(Cypress.env("login_json_file")).then((data) => {
      cy.login_business(data.email, data.password);
    });
  })
  it('Add new staff_sucessfull ', () => {
    cy.RandomString(3).then((result) => {
      cy.log(result);
      cy.VisitTeamMemberPage();
      cy.get('[data-qa="fab-add-staff"]').click();
      cy.wait(3000)
      cy.get('.ed700fce0 > [data-qa="modal-header-in-content"] > [data-qa="modal-title"]').should('includes.text','Add team member');
      cy.get('[data-qa="input-input-structure-profile-section-first-name"]').type(`nguyen${result}`);
      cy.get('[data-qa="profile-section-email"] > ._06c627cca > .c96c73cca').type(`nguyen${result}@gmail.com`);
      cy.get('[data-qa="color-sample-pink"] > .af2bf461c').click();
      cy.wait(1000)
      // chọn địa chỉ 
      cy.get('[data-qa="locations"]').click();
      let classBeforeCheck;
      cy.get(' [data-qa="locations-label"] > label').eq(1).invoke('attr', 'class').then((classValue) => {
           classBeforeCheck = classValue;
            // tiến hàng check vào check box 
           cy.get(' [data-qa="locations-label"] > label').eq(1).click({force: true});
          cy.wait(3000)
          cy.get(' [data-qa="locations-label"] > label').eq(1).should(($el) => {
            expect($el.attr('class')).not.to.eq(classBeforeCheck);
          });
      });
      
      
      cy.get('[data-qa="save-button"]').click();
      
      cy.contains('Team member added').should('be.visible');
      //check
      cy.get('[data-qa="staff-list-item"] >').find('p').should('includes.text',`nguyen${result}`);
      cy.reload();
    });
  });
  it('chinh su thong tin nhan vien', () =>{
    cy.RandomString(3).then((result) =>{
      cy.VisitTeamMemberPage();
      cy.get('[data-qa="staff-list-item"]').eq(0).click();
      cy.get('[data-qa="input-input-structure-profile-section-first-name"]').should('be.visible').clear().type(`nguyen${result}`,{force:true});
      cy.get('._1778e3ce0').invoke('scrollTop',200)
      cy.wait(1000)
      cy.get('[data-qa="save-button"]').click({force: true});
      //check toast 
      cy.contains('Team member updated').should('be.visible');
      cy.wait(2000)
      cy.get('[data-qa="staff-list-item"] >').find('p').should('includes.text',`nguyen${result}`);
    });
   
  });
 
  it('them nhan vien vao luu tru', () =>{
    cy.VisitTeamMemberPage();
    let dataBeforArchived;
    cy.get('[data-qa="staff-list-item"]').eq(0).find('p').eq(0).invoke('text').then((text) => {
      dataBeforArchived = text.trim();
        cy.log(dataBeforArchived);
         // dua nhan vien dau danh sach vao luu tru
      cy.get('._6lhqYy > .kTCQ7y > .t4IBky > div > [data-qa="actions"]').eq(0).click();
      cy.get('[data-qa="actions-dropdown-archive"]').click();
      cy.wait(500)
      cy.get('.ed700fce0 > [data-qa="modal-header-in-content"] > [data-qa="modal-title"]').should('includes.text','Archive team ');
      cy.get('[data-qa="archive-button"]').click();
      //check toast 
      cy.contains('Team member archived').should('be.visible');
       // Kiểm tra xem có thẻ p nào chứa tên nhân viên này không
      cy.get('p').filter(`:contains("${dataBeforArchived}")`).should('not.exist');
      cy.reload();
    });
     
  })
  it('xoa nha vien', () => {
    cy.VisitTeamMemberPage();
    // lọc archived 
    cy.get('._407fda16a').click();
    cy.get('[data-qa="select-structure-native-select-status"]').select('Archived').should('have.value','archived');
    cy.get('[data-qa="apply-filters"] > ._407fda16a').click();
    cy.wait(1000);
    let dataBeforeDeletion;
    // lưu lại thông tin trước khi xóa 
    cy.get('[data-qa="staff-list-item"]').eq(0).find('p').eq(0).invoke('text').then((text) => {
      dataBeforeDeletion = text.trim();
        cy.log(dataBeforeDeletion);
        // chọn action để xóa 
    cy.get(' ._6lhqYy > .kTCQ7y > .t4IBky > div > [data-qa="actions"]').eq(0).click();
    cy.get('[data-qa="actions-dropdown-permanentDelete"]').click();
    // xác nhận xóa 
    cy.get('.ed700fce0 > [data-qa="modal-header-in-content"] > [data-qa="modal-title"]').should('includes.text','Permanently delete?');
    cy.get('[data-qa="delete-button"]').click();
    cy.contains('Team member permanently deleted').should('be.visible');
    // Kiểm tra xem có thẻ p nào chứa tên nhân viên này không
    cy.get('p').filter(`:contains("${dataBeforeDeletion}")`).should('not.exist');
    cy.reload();
    });
    

  })

  it('check trung email su dung', () => {
    // lam sao lay duoc danh sach email moi 
    // warning "Email address already used"
    cy.VisitTeamMemberPage();
    // cy.getEmployeeEmailList().then((emloyeeList) => {
    //   emloyeeList.forEach((employee) => {
    //     const existingEmail = employee.email;
    //     cy.get('[data-qa="fab-add-staff"]').click();
    //     cy.wait(3000)
    //     cy.get('.ed700fce0 > [data-qa="modal-header-in-content"] > [data-qa="modal-title"]').should('includes.text','Add team member');
    //     cy.get('[data-qa="profile-section-email"] > ._06c627cca > .c96c73cca').type(existingEmail);
    //     cy.get('[data-qa="color-sample-pink"] > .af2bf461c').click();

    //   })
    //   if(emloyeeList.lenght > 0 ) {

    //   }
    // })

  })
  it.only('dieu chinh dich vu cho nhan vien', () => {
    cy.VisitTeamMemberPage();
    
  })
  it('dieu chinh location cho nhan vien', () => {
    
  })
})