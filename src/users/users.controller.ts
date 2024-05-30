import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDto } from "./dto/CreateUser.dto";
import { LoginUserDto } from "./dto/LoginUser.dto";

@Controller('users')
export class UserControllers{

    constructor(private userService:UserService){}

    @Post('register')
    @UsePipes(new ValidationPipe())
    createUser(@Body() createUserDto:CreateUserDto){
        return this.userService.createUser(createUserDto);
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    loginUser(@Body() loginUserDto:LoginUserDto){
        return this.userService.loginUser(loginUserDto);
    }
}