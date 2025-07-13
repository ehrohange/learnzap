export interface OtpDto {
    email: string;
    otp: string;
    isUsed: boolean;
    expiration: Date;
}