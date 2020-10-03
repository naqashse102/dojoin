import { Response } from 'src/app/shared/models/response';
import { JwtHttp } from '../http/jwt.http';
import { JwtService } from './jwt.service';

export function appInitializer(jwtHttp: JwtHttp, jwt: JwtService) {
    return () => new Promise(resolve => {
        // attempt to refresh token on app start up to auto authenticate
        if (jwt.getToken()) {
            jwtHttp.refreshToken(jwt.getToken(), jwt.getRefreshToken())
                .subscribe((res: Response) => {
                    jwt.setToken(res.result.accessToken, res.result.refreshToken, res.result.accessTokenExpireTime, res.result.refreshTokenExpireTime);
                    jwt.startRefreshTokenTimer(res.result.accessToken, res.result.accessTokenExpireTime)
                })
                .add(resolve);
            return;
        }
        resolve();
    });
}