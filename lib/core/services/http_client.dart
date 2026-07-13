import 'package:dio/dio.dart';
import 'package:pretty_dio_logger/pretty_dio_logger.dart';

import 'auth_interceptor.dart';

class HttpClient {
  late final Dio _dio;

  HttpClient() {
    _dio = Dio(
      BaseOptions(
        baseUrl: 'https://api.example.com', // Replace with actual base URL
        connectTimeout: const Duration(seconds: 15),
        receiveTimeout: const Duration(seconds: 15),
      ),
    );
    _dio.interceptors.add(
      PrettyDioLogger(
        requestHeader: true,
        requestBody: true,
        responseBody: true,
        responseHeader: false,
        error: true,
        compact: true,
        maxWidth: 90,
      ),
    );
    _dio.interceptors.add(AuthInterceptor());
  }

  Dio get dio => _dio;
}
