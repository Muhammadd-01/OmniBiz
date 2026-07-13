import 'package:dio/dio.dart';

import '../../domain/entities/auth_token.dart';

class AuthRemoteDataSource {
  final Dio _dio;

  AuthRemoteDataSource(this._dio);

  Future<AuthToken> login({
    required String email,
    required String password,
  }) async {
    final response = await _dio.post(
      '/auth/login',
      data: {'email': email, 'password': password},
    );
    final data = response.data['data'] as Map<String, dynamic>;
    return AuthToken.fromJson(data);
  }

  Future<AuthToken> register({
    required String email,
    required String password,
    required String businessName,
    required String businessDomain,
    String? firstName,
    String? lastName,
  }) async {
    final response = await _dio.post(
      '/auth/register',
      data: {
        'email': email,
        'password': password,
        'businessName': businessName,
        'businessDomain': businessDomain,
        if (firstName != null) 'firstName': firstName,
        if (lastName != null) 'lastName': lastName,
      },
    );
    final data = response.data['data'] as Map<String, dynamic>;
    return AuthToken.fromJson(data);
  }

  Future<AuthToken> refreshToken(String refreshToken) async {
    final response = await _dio.post(
      '/auth/refresh',
      data: {'refreshToken': refreshToken},
    );
    final data = response.data['data'] as Map<String, dynamic>;
    return AuthToken.fromJson(data);
  }
}
