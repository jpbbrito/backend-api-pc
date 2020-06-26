import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ImageProblemDto } from './image.dto';


@Injectable()
export class ImageService {
    constructor(@InjectConnection() private connection: Connection ) {}

    async index(id: number): Promise<ImageProblemDto> {
        return await this.connection.query(`SELECT path_image FROM images_problem WHERE problem_id = :id`,[id])
    }

    async store(file: any, id: number): Promise<ImageProblemDto[]> {
        const filename = file[0].filename;
        try{
            await this.connection.query(`INSERT INTO images_problem(problem_id, path_image) VALUES (:id,:filename )`, [id, filename]);
        }catch(err) {
            return undefined;
        }
        return await this.connection.query(`SELECT * FROM images_problem 
            WHERE id_image = (SELECT MAX(id_image) FROM images_problem)`);
    }

}
