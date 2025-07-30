import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AuthResolver } from "src/resolvers/account.resolvers";
import { AuthService } from "src/services/auth.services";
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
    providers: [AuthService, JwtStrategy, AuthResolver],
    exports: [AuthService, JwtStrategy, AuthResolver],
})
export class AuthModule {}