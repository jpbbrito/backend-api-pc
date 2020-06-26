import { ApiProperty } from '@nestjs/swagger';

export class ProblemDto {
    @ApiProperty()
    id_problem: number;

    @ApiProperty()
    description: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    latitude: number;

    @ApiProperty()
    longitude: number;
}