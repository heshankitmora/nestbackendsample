import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/interfaces/user.interface';
import { sign } from 'jsonwebtoken';
import { v4 } from 'uuid';
import { Request } from 'express';
import { RefreshToken } from './interfaces/refresh-token.interface';
import * as Cryptr from 'cryptr';

@Injectable()
export class AuthService {
    
    cryptr: any;
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('RefreshToken') private readonly refreshTokenModel: Model<RefreshToken>,
        private readonly jwtService: JwtService
    ) {
        this.cryptr = new Cryptr('myTotalySecretKey');
    }

    async createAccessToken(userId: string) {
        const accessToken = sign({userId}, 'myTotalySecretKey', { expiresIn: 36000 });
        return this.encryptText(accessToken);
    }

    encryptText(text: string): string {
        return this.cryptr.encrypt(text);
    }

    async createRefreshToken(req: Request, userId) {
        const refreshToken = new this.refreshTokenModel({
          userId,
          refreshToken: v4()
        });
        await refreshToken.save();
        return refreshToken.refreshToken;
    }

    async findRefreshToken(token: string) {
        const refreshToken = await this.refreshTokenModel.findOne({refreshToken: token});
        if (!refreshToken) {
          throw new UnauthorizedException('User has been logged out.');
        }
        return refreshToken.userId;
    }

    async validateUser(jwtPayload: JwtPayload): Promise<any> {
        const user = await this.userModel.findOne({_id: jwtPayload.userId, verified: true});
        if (!user) {
          throw new UnauthorizedException('User not found.');
        }
        return user;
    }

    private jwtExtractor(request) {
        let token = null;
        if (request.header('x-token')) {
        token = request.get('x-token');
      } else if (request.headers.authorization) {
        token = request.headers.authorization.replace('Bearer ', '').replace(' ', '');
      } else if (request.body.token) {
        token = request.body.token.replace(' ', '');
      }
        if (request.query.token) {
        token = request.body.token.replace(' ', '');
      }
        const cryptr = new Cryptr('myTotalySecretKey');
        if (token) {
          try {
            token = cryptr.decrypt(token);
          } catch (err) {
            throw new BadRequestException('Bad request.');
          }
      }
        return token;
    }

    returnJwtExtractor() {
        return this.jwtExtractor;
    }
}