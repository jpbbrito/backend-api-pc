import { Module } from '@nestjs/common';
import { ProblemModule } from './problem/problem.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ProblemModule,
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot()    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
