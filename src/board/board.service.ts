<<<<<<< Updated upstream
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { isNotEmpty } from 'class-validator'
import { User } from 'src/entities/user.entity'
import { IsNull, Repository } from 'typeorm'
=======
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/entities/user.entity'
import { IsNull, Not, Repository } from 'typeorm'
>>>>>>> Stashed changes
import { Board } from '../entities/board.entity'
import { CreateBoardDto } from './dto/create-board.dto'
import { UpdateBoardDto } from './dto/update-board.dto'

@Injectable()
export class BoardService {
<<<<<<< Updated upstream
  constructor(
    @InjectRepository(Board) private readonly repository: Repository<Board>,
  ) {}
=======
  constructor(@InjectRepository(Board) private readonly repository: Repository<Board>) {}
>>>>>>> Stashed changes

  async getBoards(): Promise<Board[]> {
    const list: Board[] = await this.repository.find({
      where: {
        deletedAt: IsNull(),
      },
      order: {
        id: 'desc',
      },
    })
    return list
  }

  async getBoard(id: number): Promise<Board> {
    return await this.repository.findOne({
      where: { id },
<<<<<<< Updated upstream
      relations: ['user', 'replies'],
=======
      relations: {
        user: true,
        replies: true,
      },
>>>>>>> Stashed changes
    })
  }

  async insert(dto: CreateBoardDto, user: User): Promise<Board> {
    const { title, content } = dto
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
    return await this.repository.save(
      this.repository.create({
        title,
        content,
        user,
<<<<<<< Updated upstream
        createdAt: new Date(),
=======
>>>>>>> Stashed changes
      }),
    )
  }

  async update(id: number, dto: UpdateBoardDto, user: User): Promise<Board> {
    const { title, content } = dto

    const board = await this.repository.findOne({
      where: {
        id,
<<<<<<< Updated upstream
        userId: user.id,
=======
        // userId: user.id,
>>>>>>> Stashed changes
        deletedAt: IsNull(),
      },
    })

<<<<<<< Updated upstream
    if (board === null) throw new UnauthorizedException()
=======
    if (board === null) throw new NotFoundException()
    if (board.userId !== user.id) throw new UnauthorizedException()
>>>>>>> Stashed changes

    board.title = title
    board.content = content
    board.updatedAt = new Date()

    return await this.repository.save(board)
  }

  async delete(id: number, user: User): Promise<Board> {
    const board = await this.repository.findOne({
      where: {
        id,
        userId: user.id,
        deletedAt: IsNull(),
      },
    })

    if (board === null) throw new NotFoundException()

    board.deletedAt = new Date()
    return this.repository.save(board)
  }

  async getBoardWithQuery(id: number, user: User): Promise<Board[]> {
<<<<<<< Updated upstream
    const builder = await this.repository
      .createQueryBuilder('board')
      .select('board.id', 'boardId')
      .addSelect('board.title', 'boardTitle')
      .addSelect('board.content', 'boardContent')
      .addSelect('board.created_at', 'createdAt')
      .addSelect('user.id', 'userId')
      .addSelect('user.username', 'username')
      .addSelect('replies.content', 'repliyContent')
      .innerJoin(User, 'user', 'user.id = board.userId')
      // .leftJoin('board.replies','replies', 'replies.userId = user.id')
      .where('1 = 1')

    if (isNotEmpty(id)) builder.andWhere('board.id = :id', { id })

    return builder.getRawMany()
=======
    return await this.repository.find({
      select: {
        id: true,
        title: true,
        content: true,
        user: {
          id: true,
          username: true,
        },
        replies: {
          id: true,
          content: true,
        },
      },
      relations: {
        replies: true,
        user: true,
      },
      where: {
        id,
        user: {
          id: Not(IsNull()),
        },
        deletedAt: IsNull(),
      },
    })
    // const builder = await this.repository
    //   .createQueryBuilder('board')
    //   .select('board.id', 'boardId')
    //   .addSelect('board.title', 'boardTitle')
    //   .addSelect('board.content', 'boardContent')
    //   .addSelect('board.createdAt', 'createdAt')
    //   .addSelect('user.id', 'userId')
    //   .addSelect('user.username', 'username')
    //   .addSelect('replies.content', 'repliyContent')
    //   .innerJoin(User, 'user', 'user.id = board.userId')
    //   .leftJoin('board.replies', 'replies', 'replies.userId = user.id')
    // // .where('1 = 1')
    //
    // if (isNotEmpty(id)) builder.andWhere('board.id = :id', { id })
    //
    // return builder.getRawMany()
>>>>>>> Stashed changes
  }
}
