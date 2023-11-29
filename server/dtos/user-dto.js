class UserDto {
  name;
  email;
  id;
  isActivated;
  role;

  constructor(model) {
    this.id = model.id;
    this.name = model.name;
    this.email = model.email;
    this.role = model.role;
    this.isActivated = model.isActivated;
  }
}

export { UserDto };
