export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  settings?: {
    darkMode: Boolean;
  }
}

export interface UpdatePasswordDto {
  password: string;
  newPassword: string;
}