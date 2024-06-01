import { Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { BlogService } from "./blogs.service";
import { CreateBlogDto } from "./dto/CreateBlog.dto";
import { FileUploadInterceptor } from "src/common/interceptors/file-upload.interceptor";
import { JwtAuthGuard } from "src/auth/auth.guard";

@Controller('blogs')
export class BlogControllers {
    constructor(private blogService: BlogService) { }

    @UseGuards(JwtAuthGuard)
    @Post('store')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileUploadInterceptor('blogs'))
    async createBlog(
        @Body() createBlogDto: CreateBlogDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.blogService.createBlog(createBlogDto, file);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @UsePipes(new ValidationPipe())
    async findAll() {
      return this.blogService.findAll();
    }



}
