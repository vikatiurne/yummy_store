import axios from 'axios';
import querystring from 'query-string';
import { v4 as uuidv4 } from 'uuid';

import { User } from '../models/models.js';
import { UserDto } from '../dtos/user-dto.js';
import { mailService } from './mail-service.js';
import { tokenService } from './token-service.js';

class GoogleOAuthService {
  getGoogleTokens({ code, clientId, clientSecret, redirectUri }) {
    const url = 'https://oauth2.googleapis.com/token';
    const values = {
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    };

    const googleData = axios
      .post(url, querystring.stringify(values), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        console.error(`Помилка авторизаціїї Google`);
        next(error);
      });
    return googleData;
  }

  async registration(email, name, refreshToken) {
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      const userDto = new UserDto(candidate);
      const tokens = tokenService.generateTokens({ ...userDto });
      const accessToken = tokens.accessToken;
      await tokenService.saveToken(userDto.id, refreshToken, accessToken);
      return { refreshToken, accessToken, user: userDto };
    }

    const activationLink = uuidv4();
    const user = await User.create({
      name,
      email,
      password: uuidv4(),
      activationLink,
    });

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/user/activate/${activationLink}`
    );

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    const accessToken = tokens.accessToken;
    await tokenService.saveToken(userDto.id, refreshToken, accessToken);

    return { refreshToken, accessToken, user: userDto };
  }
}

export const googleOAuthService = new GoogleOAuthService();
