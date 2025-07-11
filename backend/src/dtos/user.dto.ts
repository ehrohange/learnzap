export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  settings?: {
    darkMode: Boolean;
  }
}


export interface UpdateDarkModeDto {
  email: string;
}