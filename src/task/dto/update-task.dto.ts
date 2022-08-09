import { IsOptional } from 'class-validator';

// IsOptional = จะเปลี่ยนหรือไม่เปลี่ยนก็ได้
export class UpdateTaskDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  description?: string;
}
