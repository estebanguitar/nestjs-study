import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from '../entities/board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
  constructor(@InjectRepository(Board) private readonly repository: Repository<Board>){}
  
  async getBoards(): Promise<Board[]> {
    const list: Board[] = await this.repository.find({
      where : {
        deletedAt: IsNull()
      },
      order: {
        id: 'desc'
      }
    })
    return list
  }
  
  async insert(dto: CreateBoardDto): Promise<Board> {
    const {title, content, author} = dto;
    
    return await this.repository.save(
      this.repository.create({
        title,
        content,
        author,
        createdAt: new Date()
      })
      )
    }
    
    async getBoard(id: number): Promise<Board> {
      return await this.repository.findOne({
        where: { id }
      })
    }
    async update(dto: UpdateBoardDto): Promise<Board> {
      const {id, title, content} = dto
      const board = await this.getBoard(id);
      board.updatedAt = new Date();
      this.repository.merge(board, dto)
      
      return await this.repository.save(board)
    }    

    async delete(id: number, author: string): Promise<void> {
      const board = await this.repository.findOne({
        where: { id, author }
      });
      board.deletedAt = new Date();
      this.repository.save(board)
    }
}
