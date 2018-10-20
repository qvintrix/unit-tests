import { from, empty, throwError } from 'rxjs';

import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService(null);
    component = new TodosComponent(service);
  });

  describe('on init', () => {
    it('should set todos to data returned from service', () => {
      const todos = [1, 2, 3];
      spyOn(service, 'getTodos').and.returnValue(from([ todos ]));

      component.ngOnInit();

      expect(component.todos).toBe(todos);
    });
  });

  describe('add todo', () => {
    it('should call add method of service when new todo is added', () => {
      const spy = spyOn(service, 'add').and.returnValue(empty());

      component.add();

      expect(spy).toHaveBeenCalled();
    });

    it('should add newly added todo to todos array', () => {
      const todo = { id: 1 };
      spyOn(service, 'add').and.returnValue(from([ todo ]));

      component.add();

      expect(component.todos).toContain(todo);
    });

    it('should set message to error message if error occurred', () => {
      const error = 'error message';
      spyOn(service, 'add').and.returnValue(throwError(error));

      component.add();

      expect(component.message).toBe(error);
    });
  });

  describe('on delete', () => {
    it('should call delete if user confirms removing todo', () => {
      const todoId = 1;
      spyOn(window, 'confirm').and.returnValue(true);
      const spy = spyOn(service, 'delete').and.returnValue(empty());

      component.delete(todoId);

      expect(spy).toHaveBeenCalledWith(todoId);
    });

    it('should NOT call delete if user declines removing todo', () => {
      const todoId = 1;
      spyOn(window, 'confirm').and.returnValue(false);
      const spy = spyOn(service, 'delete').and.returnValue(empty());

      component.delete(todoId);

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
