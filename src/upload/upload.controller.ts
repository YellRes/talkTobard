import { Controller, Res, Post, Get, Body, Query, Inject, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express'

@Controller('upload/')
export class UploadController {
    @Post()
    @UseInterceptors(FilesInterceptor('files', 20, {
        dest: 'uploadImg'
    }))
    uploadFiles(@UploadedFiles() files: Array<any>, @Body() body) { 
        console.log(files)
        console.log(body)
    }

}