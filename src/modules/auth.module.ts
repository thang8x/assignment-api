import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "src/services/jwt.serivces";
import { JwtStrategy } from "src/services/jwt.strategy";

@Module({
    imports: [
        ConfigModule.forRoot(),
            JwtModule.registerAsync({
              imports: [ConfigModule],
              inject: [ConfigModule],
              useFactory: (configService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') }, // Set token expiration time
              })
            }),
    ],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {}