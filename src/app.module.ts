import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoteModule } from './application/note/note.module';
import { PrismaModule } from './infra/data/prisma/clients/prisma.module';

@Module({
  imports: [PrismaModule, NoteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
