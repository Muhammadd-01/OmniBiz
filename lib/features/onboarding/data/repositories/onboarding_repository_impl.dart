import 'package:dartz/dartz.dart';
import 'package:dio/dio.dart';
import '../../../../core/errors/failures.dart';
import '../../domain/entities/models.dart';
import '../../domain/repositories/onboarding_repository.dart';

class OnboardingRepositoryImpl implements OnboardingRepository {
  final Dio _dio;

  OnboardingRepositoryImpl(this._dio);

  @override
  Future<Either<Failure, Tenant>> getTenant(String tenantId) async {
    try {
      final response = await _dio.get('/tenants/$tenantId');
      return Right(
        Tenant.fromJson(response.data['data'] as Map<String, dynamic>),
      );
    } on DioException catch (e) {
      return Left(ServerFailure(_extractError(e)));
    } catch (e) {
      return Left(ServerFailure(e.toString()));
    }
  }

  @override
  Future<Either<Failure, Tenant>> toggleModule(
    String tenantId,
    String moduleCode,
    bool isActive,
  ) async {
    try {
      await _dio.patch(
        '/tenants/$tenantId/modules/$moduleCode',
        data: {'isActive': isActive},
      );
      // Fetch updated tenant to get all modules
      return await getTenant(tenantId);
    } on DioException catch (e) {
      return Left(ServerFailure(_extractError(e)));
    } catch (e) {
      return Left(ServerFailure(e.toString()));
    }
  }

  @override
  Future<Either<Failure, Branch>> createBranch(
    String tenantId,
    String name,
    String? address,
  ) async {
    try {
      final response = await _dio.post(
        '/tenants/$tenantId/branches',
        data: {'name': name, 'address': address},
      );
      return Right(
        Branch.fromJson(response.data['data'] as Map<String, dynamic>),
      );
    } on DioException catch (e) {
      return Left(ServerFailure(_extractError(e)));
    } catch (e) {
      return Left(ServerFailure(e.toString()));
    }
  }

  @override
  Future<Either<Failure, List<Branch>>> getBranches(String tenantId) async {
    try {
      final response = await _dio.get('/tenants/$tenantId/branches');
      final list = response.data['data'] as List;
      return Right(
        list
            .map((json) => Branch.fromJson(json as Map<String, dynamic>))
            .toList(),
      );
    } on DioException catch (e) {
      return Left(ServerFailure(_extractError(e)));
    } catch (e) {
      return Left(ServerFailure(e.toString()));
    }
  }

  String _extractError(DioException e) {
    if (e.response?.data is Map) {
      return e.response!.data['message']?.toString() ?? 'Server error';
    }
    return e.message ?? 'Network error';
  }
}
