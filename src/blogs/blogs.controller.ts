import { Body, Controller, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { BlogService } from "./blogs.service";
import { CreateBlogDto } from "./dto/CreateBlog.dto";
import { FileUploadInterceptor } from "src/common/interceptors/file-upload.interceptor";

@Controller('blogs')
export class BlogControllers {
    constructor(private blogService: BlogService) { }

    @Post('store')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileUploadInterceptor('blogs'))
    async createBlog(
        @Body() createBlogDto: CreateBlogDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.blogService.createBlog(createBlogDto, file);
    }
    

}