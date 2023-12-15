import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
import { User } from 'src/entities/user.entity';
import { IsNull, Repository } from 'typeorm';
import { Board } from '../entities/board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { isNotEmpty } from 'class-validator';

@Injectable()
export class BoardService {
  constructor(@InjectRepository(Board) private readonly repository: Repository<Board>) { }

  async getBoards(): Promise<Board[]> {
    const list: Board[] = await this.repository.find({
      where: {
        deletedAt: IsNull()
      },
      order: {
        id: 'desc'
      }
    })
    return list
  }

  async getBoard(id: number): Promise<Board> {
    return await this.repository.findOne({
      where: { id },
      relations: ['user', 'replies']
    })
  }

  async insert(dto: CreateBoardDto, user: User): Promise<Board> {
    const { title, content } = dto;

    return await this.repository.save(
      this.repository.create({
        title,
        content,
        user,
        createdAt: new Date()
      })
    )
  }

  async update(id: number, dto: UpdateBoardDto, user: User): Promise<Board> {
    const { title, content } = dto

    const board = await this.repository.findOne({
      where: {
        id,
        userId: user.id,
        deletedAt: IsNull()
      },
    });

    if (board === null)
      throw new UnauthorizedException()

    board.title = title;
    board.content = content;
    board.updatedAt = new Date();

    return await this.repository.save(board);
  }

  async delete(id: number, user: User): Promise<Board> {
    const board = await this.repository.findOne({
      where: {
        id,
        userId: user.id
      }
    });

    if (board === null)
      throw new NotFoundException()

    board.deletedAt = new Date();
    return this.repository.save(board)
  }
  async getBoardWithQuery(id: number, user: User): Promise<Board[]> {

    const builder = await this.repository.createQueryBuilder('board')
      .select('board.id', 'boardId')
      .addSelect('board.title', 'boardTitle')
      .addSelect('board.content', 'boardContent')
      .addSelect('board.created_at', 'createdAt')
      .addSelect('user.id', 'userId')
      .addSelect('user.username', 'username')
      .innerJoin(User, 'user', 'user.id = board.userId')
      .where('1 = 1');

    if (isNotEmpty(id))
      builder.andWhere('board.id = :id', { id })

    return builder.getRawMany()
  }
}
