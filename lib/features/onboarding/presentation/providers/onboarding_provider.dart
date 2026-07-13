import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/services/injection_container.dart';
import '../../domain/entities/models.dart';
import '../../domain/repositories/onboarding_repository.dart';

class OnboardingState {
  final bool isLoading;
  final String? error;
  final Tenant? tenant;
  final List<Branch> branches;

  const OnboardingState({
    this.isLoading = false,
    this.error,
    this.tenant,
    this.branches = const [],
  });

  OnboardingState copyWith({
    bool? isLoading,
    String? error,
    Tenant? tenant,
    List<Branch>? branches,
  }) {
    return OnboardingState(
      isLoading: isLoading ?? this.isLoading,
      error: error,
      tenant: tenant ?? this.tenant,
      branches: branches ?? this.branches,
    );
  }
}

class OnboardingNotifier extends StateNotifier<OnboardingState> {
  final OnboardingRepository _repository;
  String? _tenantId;

  OnboardingNotifier()
    : _repository = sl<OnboardingRepository>(),
      super(const OnboardingState());

  void setTenantId(String tenantId) {
    _tenantId = tenantId;
    _fetchInitialData();
  }

  Future<void> _fetchInitialData() async {
    if (_tenantId == null) return;
    state = state.copyWith(isLoading: true);

    final tenantResult = await _repository.getTenant(_tenantId!);
    final branchesResult = await _repository.getBranches(_tenantId!);

    Tenant? tenant;
    List<Branch> branches = [];
    String? error;

    tenantResult.fold((l) => error = l.message, (r) => tenant = r);
    branchesResult.fold((l) => error = l.message, (r) => branches = r);

    state = state.copyWith(
      isLoading: false,
      tenant: tenant,
      branches: branches,
      error: error,
    );
  }

  Future<void> createBranch(String name, String? address) async {
    if (_tenantId == null) return;
    state = state.copyWith(isLoading: true);

    final result = await _repository.createBranch(_tenantId!, name, address);
    result.fold(
      (failure) =>
          state = state.copyWith(isLoading: false, error: failure.message),
      (branch) => state = state.copyWith(
        isLoading: false,
        branches: [...state.branches, branch],
      ),
    );
  }

  Future<void> toggleModule(String moduleCode, bool isActive) async {
    if (_tenantId == null) return;
    state = state.copyWith(isLoading: true);

    final result = await _repository.toggleModule(
      _tenantId!,
      moduleCode,
      isActive,
    );
    result.fold(
      (failure) =>
          state = state.copyWith(isLoading: false, error: failure.message),
      (tenant) => state = state.copyWith(isLoading: false, tenant: tenant),
    );
  }
}

final onboardingProvider =
    StateNotifierProvider<OnboardingNotifier, OnboardingState>((ref) {
      return OnboardingNotifier();
    });
