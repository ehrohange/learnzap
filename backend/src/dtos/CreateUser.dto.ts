export interface CreateUserDto {
  name: String;
  email: String;
  password: String;
  settings?: {
    darkMode: Boolean;
  }
}
