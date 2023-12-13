import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from '../entities/board.entity';
// import { ApiPermissionPublic } from 'src/auth/auth.guard';


@Controller('board')
export class BoardController {
  constructor(private readonly service: BoardService) { }

  @Get()
  // @ApiPermissionPublic()
  getBoards(): Promise<Board[]> {
    return this.service.getBoards();
  }

  @Get(':id')
  getBoard(@Param('id') id: number): Promise<Board> {
    return this.service.getBoard(id)
  }

  @Post()
  insertBoard(@Body() dto: CreateBoardDto): Promise<Board> {
    return this.service.insert(dto);
  }

  @Put()
  updateBoard(@Body() dto: UpdateBoardDto): Promise<Board> {
    return this.service.update(dto);
  }

  @Delete()
  deleteBoard(@Body('id') id: number, @Body('author') author: string): Promise<void> {
    return this.service.delete(id, author)
  }

}
