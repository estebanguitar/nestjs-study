import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common'
import { Reply } from 'src/entities/reply.entity'
import { ReplyService } from './reply.service'

@Controller('reply')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @Get()
  reply(): Promise<Reply[]> {
    return this.replyService.getAll()
  }

  @Get(':id')
  getReply(@Param('id') id: number): Promise<Reply> {
    return this.replyService.get(id)
  }

  @Post()
  post(@Body() data: Reply, @Request() request): Promise<Reply> {
    return this.replyService.insert(data, request.user)
  }

  @Put(':id')
  put(
    @Param('id') id: number,
    @Body() data: Reply,
    @Request() request,
  ): Promise<Reply> {
    return this.replyService.update(id, data, request.user)
  }

  @Delete(':id')
  delete(@Param('id') id: number, @Request() request): Promise<Reply> {
    return this.replyService.delete(id, request.user)
  }
}
