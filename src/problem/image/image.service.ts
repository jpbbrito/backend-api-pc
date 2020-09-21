import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ImageProblemDto } from './image.dto';


@Injectable()
export class ImageService {
    constructor(@InjectConnection() private connection: Connection ) {}

    async index(id: number): Promise<ImageProblemDto> {
        return await this.connection.query(`SELECT PATH_IMAGE AS "path_image" FROM images_problem WHERE problem_id = :id`,[id])
    }

    async store(file: any, id: number): Promise<ImageProblemDto[]> {
        const filename = file[0].filename;
        try{
            await this.connection.query(`INSERT INTO images_problem(problem_id, path_image) VALUES (:id,:filename )`, [id, filename]);
        }catch(err) {
            return undefined;
        }
        return await this.connection.query(`SELECT ID_IMAGE AS "id", PROBLEM_ID AS "problem_id", PATH_IMAGE AS "path_image", CREATED_AT AS "created_at", UPDATED_AT AS "updated_at" FROM images_problem WHERE id_image = (SELECT MAX(id_image) FROM images_problem)`);
    }

}
