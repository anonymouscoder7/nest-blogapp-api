import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from 'src/schemas/Blog.schema';
import { BlogService } from './blogs.service';
import { BlogControllers } from './blogs.controller';
import { Category, CategorySchema } from 'src/categories/entities/category.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Blog.name,
                schema: BlogSchema
            }
        ]),
        MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),

    ],
    providers: [
        BlogService
    ],
    controllers: [
        BlogControllers
    ],
})
export class BlogsModule { }