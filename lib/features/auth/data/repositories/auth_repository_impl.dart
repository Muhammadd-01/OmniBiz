import 'package:dartz/dartz.dart';
import 'package:dio/dio.dart';

import '../../../../core/errors/failures.dart';
import '../../domain/entities/auth_token.dart';
import '../../domain/repositories/auth_repository.dart';
import '../datasources/auth_local_datasource.dart';
import '../datasources/auth_remote_datasource.dart';

class AuthRepositoryImpl implements AuthRepository {
  final AuthRemoteDataSource _remoteDataSource;
  final AuthLocalDataSource _localDataSource;

  AuthRepositoryImpl(this._remoteDataSource, this._localDataSource);

  @override
  Future<Either<Failure, AuthToken>> login({
    required String email,
    required String password,
  }) async {
    try {
      final token = await _remoteDataSource.login(
        email: email,
        password: password,
      );
      await _localDataSource.saveToken(token);
      return Right(token);
    } on DioException catch (e) {
      return Left(ServerFailure(_extractErrorMessage(e)));
    } catch (e) {
      return Left(ServerFailure(e.toString()));
    }
  }

  @override
  Future<Either<Failure, AuthToken>> register({
    required String email,
    required String password,
    required String businessName,
    required String businessDomain,
    String? firstName,
    String? lastName,
  }) async {
    try {
      final token = await _remoteDataSource.register(
        email: email,
        password: password,
        businessName: businessName,
        businessDomain: businessDomain,
        firstName: firstName,
        lastName: lastName,
      );
      await _localDataSource.saveToken(token);
      return Right(token);
    } on DioException catch (e) {
      return Left(ServerFailure(_extractErrorMessage(e)));
    } catch (e) {
      return Left(ServerFailure(e.toString()));
    }
  }

  @override
  Future<Either<Failure, AuthToken>> refreshToken(String refreshToken) async {
    try {
      final token = await _remoteDataSource.refreshToken(refreshToken);
      await _localDataSource.saveToken(token);
      return Right(token);
    } on DioException catch (e) {
      return Left(ServerFailure(_extractErrorMessage(e)));
    } catch (e) {
      return Left(ServerFailure(e.toString()));
    }
  }

  @override
  Future<Either<Failure, void>> logout() async {
    try {
      await _localDataSource.clearToken();
      return const Right(null);
    } catch (e) {
      return Left(CacheFailure(e.toString()));
    }
  }

  @override
  Future<bool> isLoggedIn() async {
    return _localDataSource.hasToken();
  }

  @override
  Future<AuthToken?> getCachedToken() async {
    return _localDataSource.getToken();
  }

  String _extractErrorMessage(DioException e) {
    if (e.response?.data is Map) {
      final data = e.response!.data as Map;
      return data['message']?.toString() ?? 'Server error occurred';
    }
    return e.message ?? 'Network error occurred';
  }
}
