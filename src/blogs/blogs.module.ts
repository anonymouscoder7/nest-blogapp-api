import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from 'src/schemas/Blog.schema';
import { BlogService } from './blogs.service';
import { BlogControllers } from './blogs.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Blog.name,
                schema: BlogSchema
            }
        ]),
    ],
    providers: [
        BlogService
    ],
    controllers: [
        BlogControllers
    ],
})
export class BlogsModule { }