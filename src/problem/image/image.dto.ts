import { ApiProperty } from '@nestjs/swagger';

export class ImageProblemDto {
    @ApiProperty()
    id_image: number;

    @ApiProperty()
    problem_id: number;

    @ApiProperty()
    path_image: string;
}