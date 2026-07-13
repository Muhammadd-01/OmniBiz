import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/services/injection_container.dart';
import '../../domain/repositories/auth_repository.dart';

enum AuthState { initial, unauthenticated, loading, authenticated, error }

class AuthNotifier extends StateNotifier<AuthState> {
  final AuthRepository _repository;
  String? errorMessage;

  AuthNotifier()
    : _repository = sl<AuthRepository>(),
      super(AuthState.initial) {
    checkAuthStatus();
  }

  Future<void> checkAuthStatus() async {
    final isLoggedIn = await _repository.isLoggedIn();
    if (isLoggedIn) {
      state = AuthState.authenticated;
    } else {
      state = AuthState.unauthenticated;
    }
  }

  Future<void> login(String email, String password) async {
    state = AuthState.loading;
    final result = await _repository.login(email: email, password: password);
    result.fold(
      (failure) {
        errorMessage = failure.message;
        state = AuthState.error;
        state = AuthState
            .unauthenticated; // Revert to unauthenticated so form can be submitted again
      },
      (_) {
        errorMessage = null;
        state = AuthState.authenticated;
      },
    );
  }

  Future<void> register({
    required String email,
    required String password,
    required String businessName,
    required String businessDomain,
    String? firstName,
    String? lastName,
  }) async {
    state = AuthState.loading;
    final result = await _repository.register(
      email: email,
      password: password,
      businessName: businessName,
      businessDomain: businessDomain,
      firstName: firstName,
      lastName: lastName,
    );
    result.fold(
      (failure) {
        errorMessage = failure.message;
        state = AuthState.error;
        state = AuthState.unauthenticated;
      },
      (_) {
        errorMessage = null;
        state = AuthState.authenticated;
      },
    );
  }

  Future<void> logout() async {
    await _repository.logout();
    state = AuthState.unauthenticated;
  }
}

final authProvider = StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  return AuthNotifier();
});
