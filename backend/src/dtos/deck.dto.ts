export interface CreateDeckDto {
    userId: string;
    title: string;
    description: string;
    subject: string;
    tags: string[];
}