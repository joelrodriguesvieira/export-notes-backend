import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { PrismaModule } from '../../infra/data/prisma/clients/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [NoteService],
  controllers: [NoteController],
})
export class NoteModule {}
