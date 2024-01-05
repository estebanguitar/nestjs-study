import {
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { PublicApi } from 'src/auth/auth.guard'
import { FileService } from './file.service'

const MAX_BYTES = 1024 * 3 * 1000

@PublicApi() //TODO detele
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  getFiles(): Array<string> {
    return null
  }

  @Get(':id')
  getFile(@Param('id') id: string): string {
    console.log(id)
    return null
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('upload'))
  uploadFile(@UploadedFile() data: Express.Multer.File): string {
    // console.log('🚀 ~ file: file.controller.ts:23 ~ FileController ~ uploadFile ~ file:', file)
    return null
  }

  @Post('upload/multiple')
  @UseInterceptors(FilesInterceptor('upload'))
  uploadMultipleFiles(@UploadedFiles() list: Array<Express.Multer.File>): string {
    // console.log('🚀 ~ file: file.controller.ts:33 ~ FileController ~ uploadMultipleFiles ~ element:', files)
    return null
  }

  @Post('upload/image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_BYTES }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): string {
    console.log('🚀 ~ file: file.controller.ts:43 ~ FileController ~ uploadImage ~ file:', file)
    return null
  }

  @Delete()
  deleteFile(): string {
    return null
  }
}
