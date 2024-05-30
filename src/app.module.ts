import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { BlogsModule } from './blogs/blogs.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://lpsubedi2002:u5KV5yNleArI0jUd@cluster0.ovg5apc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    UsersModule,
    BlogsModule

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
