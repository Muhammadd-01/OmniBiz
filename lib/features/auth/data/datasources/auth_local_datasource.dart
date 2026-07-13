import 'dart:convert';

import 'package:hive_flutter/hive_flutter.dart';

import '../../domain/entities/auth_token.dart';

class AuthLocalDataSource {
  static const String _tokenKey = 'auth_token';
  static const String _boxName = 'auth_box';

  Future<void> init() async {
    await Hive.openBox<String>(_boxName);
  }

  Box<String> get _box => Hive.box<String>(_boxName);

  Future<void> saveToken(AuthToken token) async {
    final jsonString = jsonEncode(token.toJson());
    await _box.put(_tokenKey, jsonString);
  }

  AuthToken? getToken() {
    final jsonString = _box.get(_tokenKey);
    if (jsonString == null) return null;
    final json = jsonDecode(jsonString) as Map<String, dynamic>;
    return AuthToken.fromJson(json);
  }

  Future<void> clearToken() async {
    await _box.delete(_tokenKey);
  }

  bool hasToken() {
    return _box.containsKey(_tokenKey);
  }
}
