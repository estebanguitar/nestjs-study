import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request } from '@nestjs/common'
import { PublicApi } from 'src/auth/auth.guard'
import { Board } from '../entities/board.entity'
import { BoardService } from './board.service'
import { CreateBoardDto } from './dto/create-board.dto'
import { UpdateBoardDto } from './dto/update-board.dto'
import { LoggerFactory } from '../util/logger'

@Controller('board')
export class BoardController {
  constructor(private readonly service: BoardService) {}

  log = LoggerFactory.create(BoardController)

  @Get()
  getBoards(): Promise<Board[]> {
    return this.service.getBoards()
  }

  @PublicApi()
  @Get('/with-query')
  getBoardWithQuery(@Query('id') id: number): Promise<Record<string, any>> {
    this.log.debug('getBoardWithQuery info', id)
    this.log.info('getBoardWithQuery info', id)
    return this.service.getBoardWithQuery(id)
  }

  @Get(':id')
  getBoard(@Param('id') id: number): Promise<Board> {
    return this.service.getBoard(id)
  }

  @Post()
  insertBoard(@Body() dto: CreateBoardDto, @Request() request): Promise<Board> {
    return this.service.insert(dto, request.user)
  }

  @Put(':id')
  updateBoard(@Param('id') id: number, @Body() dto: UpdateBoardDto, @Request() request): Promise<Board> {
    return this.service.update(id, dto, request.user)
  }

  @Delete(':id')
  deleteBoard(@Param('id') id: number, @Request() request): Promise<Board> {
    return this.service.delete(id, request.user)
  }
}
