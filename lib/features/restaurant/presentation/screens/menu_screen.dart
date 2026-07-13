import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/widgets/app_button.dart';
import '../../../../core/widgets/app_text_field.dart';

class MenuScreen extends ConsumerStatefulWidget {
  const MenuScreen({super.key});

  @override
  ConsumerState<MenuScreen> createState() => _MenuScreenState();
}

class _MenuScreenState extends ConsumerState<MenuScreen> {
  // In a real app, this would be tied to a Riverpod provider that talks to the Inventory API
  final List<Map<String, dynamic>> _categories = [];
  bool _isLoading = false;

  void _addCategory() {
    showDialog(
      context: context,
      builder: (context) {
        final controller = TextEditingController();
        return AlertDialog(
          title: const Text('Add Category'),
          content: AppTextField(
            controller: controller,
            label: 'Category Name (e.g., Starters, Mains)',
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Cancel'),
            ),
            AppButton(
              text: 'Save',
              onPressed: () {
                if (controller.text.isNotEmpty) {
                  setState(() {
                    _categories.add({'name': controller.text, 'items': []});
                  });
                  Navigator.pop(context);
                }
              },
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Menu Management'),
        actions: [
          IconButton(
            icon: const Icon(Icons.add_circle_outline),
            onPressed: _addCategory,
            tooltip: 'Add Category',
          ),
        ],
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _categories.isEmpty
          ? Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(
                    Icons.restaurant_menu,
                    size: 64,
                    color: Colors.grey,
                  ),
                  const SizedBox(height: 16),
                  const Text('Your menu is empty.'),
                  const SizedBox(height: 16),
                  AppButton(text: 'Add Category', onPressed: _addCategory),
                ],
              ),
            )
          : ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: _categories.length,
              itemBuilder: (context, index) {
                final category = _categories[index];
                return Card(
                  margin: const EdgeInsets.only(bottom: 16),
                  child: ExpansionTile(
                    title: Text(
                      category['name'] as String,
                      style: const TextStyle(fontWeight: FontWeight.bold),
                    ),
                    subtitle: Text(
                      '${(category['items'] as List).length} items',
                    ),
                    children: [
                      if ((category['items'] as List).isEmpty)
                        const Padding(
                          padding: EdgeInsets.all(16.0),
                          child: Text('No items in this category yet.'),
                        ),
                      Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: OutlinedButton.icon(
                          icon: const Icon(Icons.add),
                          label: const Text('Add Item'),
                          onPressed: () {
                            // ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Not implemented yet')));
                          },
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
    );
  }
}
