import { ApiProperty } from '@nestjs/swagger';

export class ImageProblemDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    problem_id: number;

    @ApiProperty()
    path_image: string;
}