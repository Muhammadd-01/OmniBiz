import 'package:get_it/get_it.dart';
import '../../features/auth/data/datasources/auth_local_datasource.dart';
import '../../features/auth/data/datasources/auth_remote_datasource.dart';
import '../../features/auth/data/repositories/auth_repository_impl.dart';
import '../../features/auth/domain/repositories/auth_repository.dart';
import '../../features/onboarding/data/repositories/onboarding_repository_impl.dart';
import '../../features/onboarding/domain/repositories/onboarding_repository.dart';
import 'http_client.dart';
import 'storage_service.dart';

final sl = GetIt.instance;

Future<void> initDependencies() async {
  // Core Services
  sl.registerLazySingleton<HttpClient>(() => HttpClient());
  sl.registerLazySingleton<StorageService>(() => StorageService());

  // Features - Auth
  sl.registerLazySingleton<AuthLocalDataSource>(() => AuthLocalDataSource());
  sl.registerLazySingleton<AuthRemoteDataSource>(
    () => AuthRemoteDataSource(sl<HttpClient>().dio),
  );
  sl.registerLazySingleton<AuthRepository>(
    () => AuthRepositoryImpl(sl(), sl()),
  );

  // Features - Onboarding
  sl.registerLazySingleton<OnboardingRepository>(
    () => OnboardingRepositoryImpl(sl<HttpClient>().dio),
  );

  // Initialization
  await sl<StorageService>().init();
  await sl<AuthLocalDataSource>().init();
}
