import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDTO } from './dto/create-note.dto';
import { ParamId } from '../decorators/param-id.decorator';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  async list() {
    return this.noteService.list();
  }

  @Get('filter')
  async filter(@Query('search') search: string) {
    return this.noteService.filter(search);
  }

  @Post()
  async create(@Body() data: CreateNoteDTO) {
    return this.noteService.create(data);
  }

  @Delete(':id')
  async delete(@ParamId() id: string) {
    return this.noteService.delete(id);
  }
}
