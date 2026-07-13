import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../features/auth/presentation/login_screen.dart';
import '../../features/auth/presentation/providers/auth_provider.dart';
import '../../features/auth/presentation/register_screen.dart';
import '../../features/dashboard/presentation/screens/dashboard_screens.dart';
import '../../features/onboarding/presentation/providers/onboarding_provider.dart';
import '../../features/onboarding/presentation/screens/branch_creation_screen.dart';
import '../../features/onboarding/presentation/screens/module_selection_screen.dart';
import '../../features/restaurant/presentation/screens/menu_screen.dart';
import '../widgets/app_scaffold.dart';

final _rootNavigatorKey = GlobalKey<NavigatorState>();
final _shellNavigatorDashboard = GlobalKey<NavigatorState>(
  debugLabel: 'shellDashboard',
);
final _shellNavigatorStaff = GlobalKey<NavigatorState>(
  debugLabel: 'shellStaff',
);
final _shellNavigatorSettings = GlobalKey<NavigatorState>(
  debugLabel: 'shellSettings',
);

final routerProvider = Provider<GoRouter>((ref) {
  final authState = ref.watch(authProvider);
  final onboardingState = ref.watch(onboardingProvider);

  return GoRouter(
    navigatorKey: _rootNavigatorKey,
    initialLocation: '/',
    redirect: (context, state) {
      final isAuth = authState == AuthState.authenticated;
      final isSplash = authState == AuthState.initial;
      final isGoingToLogin = state.matchedLocation == '/login';
      final isGoingToRegister = state.matchedLocation == '/register';
      final isGoingToOnboarding = state.matchedLocation.startsWith(
        '/onboarding',
      );

      if (isSplash) return null;

      if (!isAuth && !isGoingToLogin && !isGoingToRegister) {
        return '/login';
      }

      if (isAuth && (isGoingToLogin || isGoingToRegister)) {
        if (onboardingState.tenant != null &&
            onboardingState.branches.isEmpty) {
          return '/onboarding';
        }
        return '/';
      }

      if (isAuth &&
          !isGoingToOnboarding &&
          onboardingState.tenant != null &&
          onboardingState.branches.isEmpty) {
        return '/onboarding';
      }

      return null;
    },
    routes: [
      GoRoute(
        path: '/login',
        pageBuilder: (context, state) => CustomTransitionPage(
          key: state.pageKey,
          child: const LoginScreen(),
          transitionsBuilder: (context, animation, secondaryAnimation, child) {
            return FadeTransition(opacity: animation, child: child);
          },
        ),
      ),
      GoRoute(
        path: '/register',
        pageBuilder: (context, state) => CustomTransitionPage(
          key: state.pageKey,
          child: const RegisterScreen(),
          transitionsBuilder: (context, animation, secondaryAnimation, child) {
            return FadeTransition(opacity: animation, child: child);
          },
        ),
      ),
      GoRoute(
        path: '/onboarding',
        pageBuilder: (context, state) => CustomTransitionPage(
          key: state.pageKey,
          child: const ModuleSelectionScreen(),
          transitionsBuilder: (context, animation, secondaryAnimation, child) {
            return FadeTransition(opacity: animation, child: child);
          },
        ),
        routes: [
          GoRoute(
            path: 'branch',
            pageBuilder: (context, state) => CustomTransitionPage(
              key: state.pageKey,
              child: const BranchCreationScreen(),
              transitionsBuilder: (context, animation, secondaryAnimation, child) {
                return FadeTransition(opacity: animation, child: child);
              },
            ),
          ),
        ],
      ),
      StatefulShellRoute.indexedStack(
        builder: (context, state, navigationShell) {
          return AppScaffold(navigationShell: navigationShell);
        },
        branches: [
          StatefulShellBranch(
            navigatorKey: _shellNavigatorDashboard,
            routes: [
              GoRoute(
                path: '/',
                builder: (context, state) => const DashboardScreen(),
              ),
            ],
          ),
          StatefulShellBranch(
            navigatorKey: GlobalKey<NavigatorState>(debugLabel: 'shellMenu'),
            routes: [
              GoRoute(
                path: '/menu',
                builder: (context, state) => const MenuScreen(),
              ),
            ],
          ),
          StatefulShellBranch(
            navigatorKey: _shellNavigatorStaff,
            routes: [
              GoRoute(
                path: '/staff',
                builder: (context, state) => const StaffScreen(),
              ),
            ],
          ),
          StatefulShellBranch(
            navigatorKey: _shellNavigatorSettings,
            routes: [
              GoRoute(
                path: '/settings',
                builder: (context, state) => const SettingsScreen(),
              ),
            ],
          ),
        ],
      ),
    ],
  );
});
