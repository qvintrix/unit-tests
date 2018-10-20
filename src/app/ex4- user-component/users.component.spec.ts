import { UsersComponent } from './users.component';
import { UserService } from './user.service';
import { from, empty, throwError } from 'rxjs';

describe('UsersComponent', () => {
  let usersComponent: UsersComponent;
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(null);
    usersComponent = new UsersComponent(userService);
  });

  it('should set users property with the users retrieved from the server', () => {
    const users = ['Test', 'User'];
    spyOn(userService, 'getUsers').and.returnValue(from([users]));

    usersComponent.ngOnInit();

    expect(usersComponent.users).toBe(users);
  });

  describe('When deleting a user', () => {
    let user;
    let error;
    beforeEach(() => {
      user = { id: 1, name: 'User' };
      error = 'error message';
      usersComponent.users = [user];
    });

    it('should remove the selected user from the list if the user confirms deletion', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      spyOn(userService, 'deleteUser').and.returnValue(empty());

      usersComponent.deleteUser(user);

      expect(usersComponent.users.indexOf(user)).toBe(-1);
    });

    it('should NOT remove the seleted user from the list if the user cancels', () => {
      spyOn(window, 'confirm').and.returnValue(false);
      spyOn(userService, 'deleteUser').and.returnValue(empty());

      usersComponent.deleteUser(user);

      expect(usersComponent.users.indexOf(user)).not.toBe(-1);
    });

    it('should call the server to delete the selected user if the user confirms deletion', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      const spy = spyOn(userService, 'deleteUser').and.returnValue(empty());

      usersComponent.deleteUser(user);

      expect(spy).toHaveBeenCalledWith(user.id);
    });

    it('should NOT call the server to delete the selected user if the user cancels', () => {
      spyOn(window, 'confirm').and.returnValue(false);
      const spy = spyOn(userService, 'deleteUser').and.returnValue(empty());

      usersComponent.deleteUser(user);

      expect(spy).not.toHaveBeenCalledWith(user.id);
    });

    it('should undo deletion if the call to the server fails', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      spyOn(window, 'alert').and.returnValue(null);
      spyOn(userService, 'deleteUser').and.returnValue(throwError(error));

      usersComponent.deleteUser(user);

      expect(usersComponent.users.indexOf(user)).not.toBe(-1);
      // We need to change the implementation of alert, otherwise
      // it will popup a dialog when running our unit tests.
    });

    it('should display an error if the call to the server fails', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      const spy = spyOn(window, 'alert').and.returnValue(null);
      spyOn(userService, 'deleteUser').and.returnValue(throwError(error));

      usersComponent.deleteUser(user);

      expect(spy).toHaveBeenCalledWith('Could not delete the user.');
    });
  });
});
