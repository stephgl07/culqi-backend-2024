import { Body, Controller, Get, Post, Query, Req } from "@nestjs/common";
import { TokenizeCardService } from "./use-cases/tokenize-card/tokenize-card.service";
import { TokenizeCardRequest } from "./use-cases/tokenize-card/tokenize-card.dto";
import { GetCardRequest } from "./use-cases/get-card/get-card.dto";
import { GetCardService } from "./use-cases/get-card/get-card.service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Request } from "express";

@Controller('Card')
export class CardController {
    constructor(
        private readonly TokenizeCardService: TokenizeCardService,
        private readonly GetCardService: GetCardService
        ) {}
        
    @ApiBearerAuth('PK')
    @Post()
    async TokenizeCard(@Body() request : TokenizeCardRequest, @Req() req: Request) {
        const authHeader = req.headers['authorization'];
        return await this.TokenizeCardService.execute(request, authHeader);
    }

    @Get()
    async GetCard(@Query() params: GetCardRequest) {
        return await this.GetCardService.execute(params);
    }
}