import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../../core/widgets/app_button.dart';
import '../providers/onboarding_provider.dart';

class ModuleSelectionScreen extends ConsumerWidget {
  const ModuleSelectionScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(onboardingProvider);
    final tenant = state.tenant;

    if (state.isLoading) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    if (tenant == null) {
      return const Scaffold(
        body: Center(child: Text('Loading tenant info...')),
      );
    }

    final modules = {
      'RESTAURANT': 'Restaurant / Cafe',
      'RETAIL': 'Retail / Store',
      'GYM': 'Gym / Fitness',
      'HEALTHCARE': 'Healthcare / Clinic',
    };

    return Scaffold(
      appBar: AppBar(title: const Text('Select Business Modules')),
      body: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 600),
          child: ListView(
            padding: const EdgeInsets.all(24),
            children: [
              Text(
                'What type of business do you run?',
                style: Theme.of(context).textTheme.headlineSmall,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 8),
              const Text(
                'This will activate the specific features you need.',
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 32),
              ...modules.entries.map((entry) {
                final isActive = tenant.activeModules.contains(entry.key);
                return Card(
                  margin: const EdgeInsets.only(bottom: 16),
                  child: SwitchListTile(
                    title: Text(entry.value),
                    value: isActive,
                    onChanged: (val) {
                      ref
                          .read(onboardingProvider.notifier)
                          .toggleModule(entry.key, val);
                    },
                  ),
                );
              }),
              const SizedBox(height: 32),
              AppButton(
                text: 'Next',
                onPressed: () {
                  context.go('/onboarding/branch');
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
