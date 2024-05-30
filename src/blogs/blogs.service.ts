import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateBlogDto } from "./dto/CreateBlog.dto";
import { Blog } from "src/schemas/Blog.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class BlogService {
    constructor(
        @InjectModel(Blog.name) private blogModel: Model<Blog>
    ) { }

    async createBlog(createBlogDto: CreateBlogDto, image: Express.Multer.File) {
        if (!image) {
            throw new BadRequestException('Image file is required');
        }

        const newBlog = new this.blogModel({
            ...createBlogDto,
            image: image.filename, 
        });

        return newBlog.save();
    }
}