import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { TokensService } from 'src/tokens/tokens.service';

@Injectable()
export class ApiTokenGuard implements CanActivate {
  constructor(
    private readonly tokensService: TokensService, 
  ) {}

  // Este metodo se ejecuta antes de entrar a la ruta
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // obtener http
    const request = context.switchToHttp().getRequest();
    // header api-token
    const apiToken = request.headers['api-token'] as string | undefined;
    // por si no viene el header
    if (!apiToken) {
      throw new ForbiddenException('Header api-token es requerido');
    }

    //activo && reqLeft > 0
    const canUse = await this.tokensService.canUse(apiToken);
    if (!canUse) {
      throw new ForbiddenException(
        'Token inválido, inactivo o sin solicitudes restantes',
      );
    }

    // si es valido se descuenta una peticion
    await this.tokensService.reduceRequests(apiToken);
    return true;
  }
}
