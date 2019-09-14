export class UserUtil {
  static get() {
    const data = localStorage.getItem('contatinho.user');

    if (data) return JSON.parse(data);

    return null;
  }

  static save(user: any) {
    const data = JSON.stringify(user);

    localStorage.setItem('contatinho.user', data);
  }

  static delete() {
    localStorage.removeItem('contatinho.user');
  }

}