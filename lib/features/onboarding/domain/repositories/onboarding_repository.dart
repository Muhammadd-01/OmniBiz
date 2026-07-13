import 'package:dartz/dartz.dart';
import '../../../../core/errors/failures.dart';
import '../entities/models.dart';

abstract class OnboardingRepository {
  Future<Either<Failure, Tenant>> getTenant(String tenantId);
  Future<Either<Failure, Tenant>> toggleModule(
    String tenantId,
    String moduleCode,
    bool isActive,
  );
  Future<Either<Failure, Branch>> createBranch(
    String tenantId,
    String name,
    String? address,
  );
  Future<Either<Failure, List<Branch>>> getBranches(String tenantId);
}
