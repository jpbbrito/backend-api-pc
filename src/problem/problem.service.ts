import { Injectable } from '@nestjs/common';
import { InjectConnection} from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ProblemDto } from './problem.dto';

@Injectable()
export class ProblemService {
    constructor( @InjectConnection() private connection: Connection ) {}

    async index(param: any): Promise<ProblemDto[]> {
        const queryResult = await this.connection
            .query(`SELECT ID_PROBLEM AS "id", DESCRIPTION AS "description", ADDRESS AS "address", LATITUDE AS "latitude", LONGITUDE AS "longitude", CREATED_AT AS "created_at", UPDATED_AT as "updated_at" FROM problems WHERE id_problem = :id`,[param.id]);
        return queryResult
    }
    
    async show (): Promise<ProblemDto[]> {
        return await this.connection.query(`SELECT ID_PROBLEM AS "id", DESCRIPTION AS "description", ADDRESS AS "address", LATITUDE AS "latitude", LONGITUDE AS "longitude", CREATED_AT AS "created_at", UPDATED_AT as "updated_at" FROM PROBLEMS ORDER BY id_problem DESC`);
    }
    async store(problem: ProblemDto ): Promise<ProblemDto> {
        const { description, address, latitude, longitude} = problem;
        await this.connection.query(`INSERT INTO problems(description, address, latitude, longitude)
            VALUES ('${description}', '${address}', ${latitude}, ${longitude})`);
        return await this.connection.query(`SELECT ID_PROBLEM AS "id", DESCRIPTION AS "description", ADDRESS AS "address", LATITUDE AS "latitude", LONGITUDE AS "longitude", CREATED_AT AS "created_at", UPDATED_AT as "updated_at" FROM problems WHERE id_problem = (SELECT MAX(id_problem) FROM problems)`);
    }
}
