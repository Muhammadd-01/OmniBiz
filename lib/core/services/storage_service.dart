import 'package:hive_flutter/hive_flutter.dart';

class StorageService {
  static const String _defaultBoxName = 'omnibiz_box';

  Future<void> init() async {
    await Hive.initFlutter();
    await Hive.openBox<dynamic>(_defaultBoxName);
  }

  Box<dynamic> getBox([String boxName = _defaultBoxName]) {
    return Hive.box(boxName);
  }

  Future<void> putData(
    String key,
    dynamic value, [
    String boxName = _defaultBoxName,
  ]) async {
    final box = getBox(boxName);
    await box.put(key, value);
  }

  dynamic getData(String key, [String boxName = _defaultBoxName]) {
    final box = getBox(boxName);
    return box.get(key);
  }
}
