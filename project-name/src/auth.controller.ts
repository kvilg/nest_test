import { Body, Controller, Post, HttpCode, HttpStatus, Req, Get, Session, Headers } from '@nestjs/common';
import { response } from 'express';
import { AuthService } from './auth.service';
import {ExperimentService} from './experiments.service'
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,private experimentService:ExperimentService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>,@Session() session) {
        let respone = this.authService.signIn(signInDto.username, signInDto.password);
        respone.then(res=>{
            if(res.access_token != null){
                this.experimentService.ifOldUser(session);
            }
        })
        return respone;
    }

    @HttpCode(HttpStatus.OK)
    @Post('registration')
    registration(@Body() signInDto: Record<string, any>,@Session() session) {
        this.experimentService.setAktiveUser(true,session);
        return this.authService.registration(signInDto.username, signInDto.password);
    }


    @HttpCode(HttpStatus.OK)
    @Get('experiments')
    getExperiment(@Session() session) {
        return this.experimentService.getExperiment(session);
    }

}


