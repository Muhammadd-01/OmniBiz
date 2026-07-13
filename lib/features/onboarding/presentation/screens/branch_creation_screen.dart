import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../../core/widgets/app_button.dart';
import '../../../../core/widgets/app_text_field.dart';
import '../providers/onboarding_provider.dart';

class BranchCreationScreen extends ConsumerStatefulWidget {
  const BranchCreationScreen({super.key});

  @override
  ConsumerState<BranchCreationScreen> createState() =>
      _BranchCreationScreenState();
}

class _BranchCreationScreenState extends ConsumerState<BranchCreationScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _addressController = TextEditingController();

  @override
  void dispose() {
    _nameController.dispose();
    _addressController.dispose();
    super.dispose();
  }

  void _submit() {
    if (_formKey.currentState!.validate()) {
      ref
          .read(onboardingProvider.notifier)
          .createBranch(
            _nameController.text.trim(),
            _addressController.text.trim(),
          );
    }
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(onboardingProvider);

    ref.listen<OnboardingState>(onboardingProvider, (prev, next) {
      if (next.error != null) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(next.error!), backgroundColor: Colors.red),
        );
      }
      if (next.branches.isNotEmpty && next.tenant != null) {
        // Onboarding complete! Go to dashboard.
        context.go('/');
      }
    });

    return Scaffold(
      appBar: AppBar(title: const Text('Setup Primary Branch')),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 400),
            child: Form(
              key: _formKey,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Text(
                    'Where is your business located?',
                    style: Theme.of(context).textTheme.headlineSmall,
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 32),
                  AppTextField(
                    controller: _nameController,
                    label: 'Branch Name (e.g., Main Headquarters)',
                    validator: (val) =>
                        val == null || val.isEmpty ? 'Required' : null,
                  ),
                  const SizedBox(height: 16),
                  AppTextField(
                    controller: _addressController,
                    label: 'Address',
                  ),
                  const SizedBox(height: 32),
                  AppButton(
                    text: 'Finish Setup',
                    isLoading: state.isLoading,
                    onPressed: _submit,
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
