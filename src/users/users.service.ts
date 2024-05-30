import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schemas/User.schema";
import { CreateUserDto } from "./dto/CreateUser.dto";
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from "./dto/LoginUser.dto";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
    ) { }

    async createUser(CreateUserDto: CreateUserDto) {
        const { email, password } = CreateUserDto;

        const existingUser = await this.userModel.findOne({ email }).exec();
        if (existingUser) {
            throw new BadRequestException('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new this.userModel({
            ...CreateUserDto,
            password: hashedPassword,
        });
        return newUser.save();
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userModel.findOne({ email }).exec();
        if (user && await bcrypt.compare(pass, user.password as string)) {
            const { password, ...result } = user.toObject();
            return result;
        }
        return null;
    }

    async loginUser(loginUserDto: LoginUserDto) {
        const user = await this.validateUser(loginUserDto.email, loginUserDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { email: user.email, sub: user._id };
        return {
            user:user,
            access_token: this.jwtService.sign(payload),
        };
    }
}
