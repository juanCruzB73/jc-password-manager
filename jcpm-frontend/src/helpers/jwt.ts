import { jwtDecode } from 'jwt-decode';
import { AppDispatch } from '../store/store';
import { useDispatch } from 'react-redux';
import { onLogOut, startAcountRenew } from '../store/slices';

export interface JwtPayload {
  sub: string;
  userType: string;
  email: string;
  exp: number;
  iat: number;
  userId: string;
}

export const decodeJWT = (token: string) => {
  return async (dispatch: AppDispatch) => {
    try {

      if (!token) {
        dispatch(onLogOut());
        return null;
      }

      const decoded: JwtPayload = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000);

      if (decoded.exp < now) {

        const newToken = await dispatch(startAcountRenew() as any);

        if (!newToken) {
          dispatch(onLogOut());
          return null;
        }

        const newDecoded: JwtPayload = jwtDecode(newToken);
        return newDecoded;

      }

      return decoded;
    } catch (error) {

      return null;
    }
  }
};