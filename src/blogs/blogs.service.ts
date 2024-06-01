import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateBlogDto } from "./dto/CreateBlog.dto";
import { Blog } from "src/schemas/Blog.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Category } from "src/categories/entities/category.entity";

@Injectable()
export class BlogService {
    constructor(
        @InjectModel(Blog.name) private blogModel: Model<Blog>,
        @InjectModel(Category.name) private categoryModel: Model<Category>,

    ) { }

    async createBlog(createBlogDto: CreateBlogDto, image: Express.Multer.File) {
        if (!image) {
            throw new BadRequestException('Image file is required');
        }

        const category = await this.categoryModel.findById(createBlogDto.category).exec();
        if (!category) {
            throw new NotFoundException(`Category with ID ${createBlogDto.category} not found`);
        }

        const newBlog = new this.blogModel({
            ...createBlogDto,
            image: image.filename,
        });

        return newBlog.save();
    }

    async findAll(): Promise<Blog[]> {
        return this.blogModel.find().populate('category').exec();
    }
    
}