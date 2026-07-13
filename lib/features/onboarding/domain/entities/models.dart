class Tenant {
  final String id;
  final String name;
  final String domain;
  final List<String> activeModules;

  const Tenant({
    required this.id,
    required this.name,
    required this.domain,
    required this.activeModules,
  });

  factory Tenant.fromJson(Map<String, dynamic> json) {
    return Tenant(
      id: json['id'] as String,
      name: json['name'] as String,
      domain: json['domain'] as String,
      activeModules:
          (json['modules'] as List<dynamic>?)
              ?.map((m) => m['module']['code'] as String)
              .toList() ??
          [],
    );
  }
}

class Branch {
  final String id;
  final String tenantId;
  final String name;
  final String? address;

  const Branch({
    required this.id,
    required this.tenantId,
    required this.name,
    this.address,
  });

  factory Branch.fromJson(Map<String, dynamic> json) {
    return Branch(
      id: json['id'] as String,
      tenantId: json['tenantId'] as String,
      name: json['name'] as String,
      address: json['address'] as String?,
    );
  }
}
