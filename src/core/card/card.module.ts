import { Module } from "@nestjs/common";
import { CardController } from "./card.controller";
import { TokenizeCardService } from "./use-cases/tokenize-card/tokenize-card.service";
import { GetCardService } from "./use-cases/get-card/get-card.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
              secret: configService.get('jwt').secret,
              signOptions: { expiresIn: configService.get('jwt').expirationTime },
            }),
          }),
    ],
    controllers: [CardController],
    providers: [
        TokenizeCardService,
        GetCardService
    ]
})
export class CardModule {}