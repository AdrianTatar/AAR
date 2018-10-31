import { NavbarModule } from './navbar.module';


describe('ExportModule', () => {
  let navModule: NavbarModule;

  beforeEach(() => {
    navModule = new NavbarModule();
  });

  it('should create an instance', () => {
    expect(navModule).toBeTruthy();
  });
});
