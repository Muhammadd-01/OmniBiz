import 'package:dio/dio.dart';
import '../../features/auth/domain/repositories/auth_repository.dart';
import 'injection_container.dart';

class AuthInterceptor extends Interceptor {
  @override
  Future<void> onRequest(
    RequestOptions options,
    RequestInterceptorHandler handler,
  ) async {
    final authRepo = sl<AuthRepository>();
    final token = await authRepo.getCachedToken();
    if (token != null) {
      options.headers['Authorization'] = 'Bearer ${token.accessToken}';
    }
    return super.onRequest(options, handler);
  }

  @override
  Future<void> onError(
    DioException err,
    ErrorInterceptorHandler handler,
  ) async {
    if (err.response?.statusCode == 401) {
      final authRepo = sl<AuthRepository>();
      final token = await authRepo.getCachedToken();

      if (token != null) {
        // Attempt to refresh
        final result = await authRepo.refreshToken(token.refreshToken);

        return result.fold(
          (failure) async {
            // Refresh failed, logout
            await authRepo.logout();
            return super.onError(err, handler);
          },
          (newToken) async {
            // Refresh succeeded, retry original request
            final opts = err.requestOptions;
            opts.headers['Authorization'] = 'Bearer ${newToken.accessToken}';

            try {
              final cloneReq = await Dio().request(
                opts.path,
                options: Options(method: opts.method, headers: opts.headers),
                data: opts.data,
                queryParameters: opts.queryParameters,
              );
              return handler.resolve(cloneReq);
            } catch (e) {
              return super.onError(err, handler);
            }
          },
        );
      }
    }
    return super.onError(err, handler);
  }
}
