import { Controller, Get, Post, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { ProblemDto } from './problem.dto';
import { ApiProperty, ApiOkResponse, ApiNoContentResponse, ApiParam } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('problems')
export class ProblemController {
    constructor(private readonly problemService: ProblemService){}
    
    @Get(':id')
    @ApiParam({ name: 'id', description: 'ID do problema a ser buscado'})
    @ApiOkResponse({ type: ProblemDto, description: 'Problema encontrado'})
    @ApiNoContentResponse({ description: 'Problema não encontrado'})
    async index( @Param() param, @Res() res: Response ): Promise<any> {
        let result = await this.problemService.index(param);
        if( result.length == 0 ){
            return res.status(HttpStatus.NO_CONTENT).send();
        } else {
            return res.status(HttpStatus.OK).send(result);
        }
    }

    @Get()
    @ApiOkResponse({ type: ProblemDto, isArray: true, description: 'Problema encontrado'})
    show(): Promise<ProblemDto[]> {
        return this.problemService.show();
    }

    @Post()
    @ApiOkResponse({ type: ProblemDto, isArray: true})
    store(@Body() problem: ProblemDto ): Promise<ProblemDto> {
        return this.problemService.store(problem)
    }
}
