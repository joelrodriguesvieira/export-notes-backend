import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../infra/data/prisma/clients/prisma.service';
import { CreateNoteDTO } from './dto/create-note.dto';

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) {}

  async list() {
    const notes = this.prisma.note.findMany();
    return (await notes).map((note) => ({
      ...note,
      timeAgo: this.calculateTimeAgo(note.createdAt),
    }));
  }

  async create(data: CreateNoteDTO) {
    return this.prisma.note.create({
      data: {
        id: data.id,
        content: data.content,
        createdAt: new Date(),
      },
    });
  }

  async filter(search: string) {
    return this.prisma.note.findMany({
      where: {
        content: {
          contains: search,
          mode: 'insensitive',
        },
      },
    });
  }
  async delete(id: string) {
    await this.exists(id);
    return this.prisma.note.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: string) {
    const count = await this.prisma.note.count({
      where: {
        id,
      },
    });

    if (count === 0) {
      throw new NotFoundException(`This note with id ${id} does not exist`);
    }
  }

  private calculateTimeAgo(createdAt: Date): string {
    const now = new Date();
    const diff = now.getTime() - createdAt.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `há cerca de ${days} dia(s)`;
    } else if (hours > 0) {
      return `há cerca de ${hours} hora(s)`;
    } else if (minutes > 0) {
      return `há cerca de ${minutes} minuto(s)`;
    } else {
      return `há cerca de ${seconds} segundo(s)`;
    }
  }
}
