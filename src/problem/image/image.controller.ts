import { Controller, Get, Res, Post, Param, UseInterceptors, UploadedFiles, HttpStatus } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ImageService } from './image.service';
import { ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { ImageProblemDto } from './image.dto';

@Controller('problems')
export class ImageController {

    constructor(private readonly imageService: ImageService) {}

    @Post(':id/images')
    @ApiOkResponse({type: ImageProblemDto })
    @UseInterceptors(FilesInterceptor('image'))
    async uploadFile(@UploadedFiles() file, @Res() res: Response, @Param() param) {
        const result = await this.imageService.store(file, param.id)
        console.log(result);
        if(result === undefined ) {
            res.status(HttpStatus.NOT_ACCEPTABLE).json('Problem not found')
        } else {
            res.status(HttpStatus.OK).send(result);
        }
    }

    @Get(':id/images')
    @ApiParam({ name: 'id', description: 'ID do problema para busca das images associadas'})
    @ApiOkResponse({type: ImageProblemDto })
    async index(@Param() param) {
        const result = await this.imageService.index(param.id);
        return result;
    }

    @Get('images/:imgname')
    @ApiOkResponse({type: ImageProblemDto })
    @ApiParam({ name: 'imgname', description: 'Nome da imagem a ser retornada'})
    async imageByName(@Param('imgname') image, @Res() res: Response): Promise<any> {
        return res.sendFile(image, { root: 'uploads/problem'})
    }

}
