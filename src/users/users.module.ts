import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';
import { UserService } from './users.service';
import { UserControllers } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema
            }
        ]),
        JwtModule.register({
            secret: 'anonymous', 
            signOptions: { expiresIn: '60m' }, 
        }),
    ],
    providers: [
        UserService,JwtStrategy
    ],
    controllers: [
        UserControllers
    ],
})
export class UsersModule { }