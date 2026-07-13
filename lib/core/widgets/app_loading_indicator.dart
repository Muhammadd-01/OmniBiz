import 'package:flutter/material.dart';
import '../theme/app_colors.dart';

class AppLoadingIndicator extends StatelessWidget {
  final Color color;
  final double size;

  const AppLoadingIndicator({
    super.key,
    this.color = AppColors.primary,
    this.size = 40.0,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: SizedBox(
        height: size,
        width: size,
        child: CircularProgressIndicator(color: color),
      ),
    );
  }
}
