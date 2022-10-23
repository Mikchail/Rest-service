module.exports = class UserDto {
  constructor(model){
    this.email = model.email;
    this.name = model.name;
    this.id = model._id;
    this.posts = model.posts;
  }
} 