import { Module } from '@nestjs/common';
import { ProblemController } from './problem.controller';
import { ProblemService } from './problem.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageController } from './image/image.controller';
import { ImageService } from './image/image.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [TypeOrmModule.forFeature(),
        MulterModule.register({ 
            dest:'./uploads/problem'
        })
    ],
    controllers: [ProblemController, ImageController],
    providers: [ProblemService, ImageService],
})
export class ProblemModule {}
