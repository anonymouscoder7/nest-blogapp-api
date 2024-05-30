import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';
import { UserService } from './users.service';
import { UserControllers } from './users.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema
            }
        ]),
        JwtModule.register({
            secret: 'yourSecretKey', 
            signOptions: { expiresIn: '1h' }, 
        }),
    ],
    providers: [
        UserService
    ],
    controllers: [
        UserControllers
    ],
})
export class UsersModule { }