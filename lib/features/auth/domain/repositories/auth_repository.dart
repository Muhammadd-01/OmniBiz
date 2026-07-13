import 'package:dartz/dartz.dart';

import '../../../../core/errors/failures.dart';
import '../entities/auth_token.dart';

abstract class AuthRepository {
  Future<Either<Failure, AuthToken>> login({
    required String email,
    required String password,
  });

  Future<Either<Failure, AuthToken>> register({
    required String email,
    required String password,
    required String businessName,
    required String businessDomain,
    String? firstName,
    String? lastName,
  });

  Future<Either<Failure, AuthToken>> refreshToken(String refreshToken);

  Future<Either<Failure, void>> logout();

  Future<bool> isLoggedIn();

  Future<AuthToken?> getCachedToken();
}
