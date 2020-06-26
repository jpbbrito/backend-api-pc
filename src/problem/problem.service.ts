import { Injectable } from '@nestjs/common';
import { InjectConnection} from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ProblemDto } from './problem.dto';

@Injectable()
export class ProblemService {
    constructor( @InjectConnection() private connection: Connection ) {}

    async index(param: any): Promise<ProblemDto[]> {
        const queryResult = await this.connection.query(`SELECT * FROM problems WHERE id_problem = :id`,[param.id]);
        return queryResult
    }
    
    async show (): Promise<ProblemDto[]> {
        return await this.connection.query(`SELECT * FROM PROBLEMS`);
    }
    
    async store(problem: ProblemDto ): Promise<ProblemDto> {
        const { description, address, latitude, longitude} = problem;
        await this.connection.query(`INSET INTO problems(description, address, latitude, longitude) 
            VALUES (:description, :address, :latitude, :longitude)`, [ description, address, latitude, longitude ] )
        return await this.connection.query(`SELECT * FROM problems 
            WHERE id_problem = (SELECT MAX(id_problem) FROM problems)`);
    }
}
