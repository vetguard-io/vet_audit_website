# Security Policy

**VetGuard LLC d/b/a VetGuard.io**
**Effective Date: August 14, 2026**
**Last Updated: August 14, 2026**

---

At VetGuard, security is foundational to everything we build. Veterinary practices trust us with sensitive clinical and financial data, and we take that responsibility seriously. This Security Policy describes the administrative, technical, and physical safeguards we implement to protect your data and maintain the integrity of our platform.

This Security Policy supplements our Terms of Service (vetguard.io/terms) and Privacy Policy (vetguard.io/privacy). In the event of a conflict between this Security Policy and the Terms of Service, the Terms of Service shall control.

---

## 1. Security Principles

Our security program is built on five core principles:

**(a) Defense in Depth.** We implement multiple, overlapping layers of security controls so that the failure of any single control does not compromise the overall security of the system.

**(b) Least Privilege.** Access to systems, data, and resources is restricted to the minimum level necessary for each individual or process to perform its function.

**(c) Zero Trust.** We verify every access request regardless of its origin. No user, device, or network is inherently trusted.

**(d) Transparency.** We communicate openly about our security practices, capabilities, and limitations. We promptly notify affected parties of security incidents.

**(e) Continuous Improvement.** We continuously monitor, test, and improve our security posture through regular assessments, audits, and adoption of industry best practices.

---

## 2. Organizational Security

### 2.1 Security Governance

VetGuard maintains a formal information security program overseen by senior leadership. Responsibilities include establishing and enforcing security policies and procedures, conducting periodic risk assessments, reviewing and approving security controls, monitoring compliance with applicable laws and regulations, and managing vendor and third-party security relationships.

### 2.2 Employee Security

**(a) Background Checks.** All employees and contractors with access to production systems or customer data undergo background verification prior to being granted access.

**(b) Security Training.** All personnel complete security awareness training upon hire and annually thereafter. Training covers data handling procedures, phishing and social engineering awareness, incident reporting procedures, acceptable use policies, and secure coding practices (for engineering staff).

**(c) Confidentiality Obligations.** All employees and contractors are bound by confidentiality agreements that extend beyond the term of their employment or engagement.

**(d) Access Revocation.** Access to all systems and data is revoked immediately upon termination of employment or contract. Offboarding procedures include credential revocation, device collection, and access audit.

### 2.3 Acceptable Use

All VetGuard personnel are required to comply with our internal Acceptable Use Policy, which governs the use of company systems, devices, and access to customer data. Violations are subject to disciplinary action, including termination.

---

## 3. Infrastructure Security

### 3.1 Cloud Infrastructure

The Service is hosted on DigitalOcean's managed cloud platform, which provides physical data center security with controlled access, surveillance, and environmental monitoring, geographic redundancy and disaster recovery capabilities, SOC 2 Type II certified infrastructure, network-level firewalls and DDoS mitigation, and automated system patching and updates.

### 3.2 Network Security

**(a) Firewalls.** Network firewalls restrict inbound and outbound traffic to authorized ports and protocols only. Default-deny rules are applied to all network boundaries.

**(b) Network Segmentation.** Production, staging, and development environments are isolated on separate networks. Customer data is only accessible from the production environment.

**(c) DDoS Protection.** The Service is protected by distributed denial-of-service (DDoS) mitigation at the network and application layers.

**(d) Intrusion Detection.** Network traffic is monitored for anomalous patterns and potential intrusion attempts. Alerts are triaged and investigated by authorized personnel.

**(e) VPN and Remote Access.** Administrative access to production systems requires a secure VPN connection with multi-factor authentication. Direct SSH access to production servers is prohibited except through audited bastion hosts.

### 3.3 Server Security

**(a) Hardening.** Production servers are hardened according to industry benchmarks. Unnecessary services, ports, and default accounts are disabled.

**(b) Patch Management.** Security patches for operating systems, libraries, and dependencies are applied within seventy-two (72) hours of release for critical vulnerabilities and within thirty (30) days for non-critical vulnerabilities.

**(c) Immutable Infrastructure.** Application deployments use containerized, immutable images. Production containers are rebuilt from verified base images with each deployment, eliminating configuration drift.

**(d) Logging.** All server activity, including system events, authentication attempts, and administrative actions, is logged and retained for security analysis.

---

## 4. Application Security

### 4.1 Secure Development Lifecycle

VetGuard follows a secure software development lifecycle (SSDLC) that includes security requirements analysis during design, secure coding standards and guidelines, code review with security focus for all changes, static application security testing (SAST) in the CI/CD pipeline, dependency vulnerability scanning for all third-party libraries, and pre-deployment security review for critical changes.

### 4.2 Authentication

**(a) Password Security.** User passwords are hashed using bcrypt with a minimum work factor of 12. Plaintext passwords are never stored or logged. Passwords must meet minimum complexity requirements of at least twelve (12) characters.

**(b) Session Management.** User sessions are managed using JSON Web Tokens (JWT) with configurable expiration. Tokens are signed using secure algorithms and are invalidated upon logout or password change.

**(c) Multi-Factor Authentication (MFA).** MFA is available for all customer accounts and is strongly recommended. MFA is mandatory for all VetGuard administrative access to production systems.

**(d) Rate Limiting.** Authentication endpoints are protected by rate limiting to prevent brute-force attacks. Accounts are temporarily locked after repeated failed login attempts.

**(e) API Authentication.** API access requires authenticated API keys transmitted via secure headers. API keys are generated per account and can be revoked at any time through the Service settings.

### 4.3 Authorization

**(a) Role-Based Access Control (RBAC).** The Service implements role-based access control with the following roles: Admin (full access to clinic settings, users, and audit data), Manager (access to audit data and reports, limited settings access), and Auditor (access to run audits and view results only).

**(b) Tenant Isolation.** Each customer's data is logically isolated at the application and database layers. Strict tenant boundaries ensure that no customer can access another customer's data under any circumstances. All database queries are scoped to the authenticated tenant.

### 4.4 Input Validation

All user input is validated, sanitized, and parameterized before processing. The Service implements protections against SQL injection, cross-site scripting (XSS), cross-site request forgery (CSRF), command injection, path traversal, and XML external entity (XXE) attacks.

### 4.5 API Security

**(a) Transport Security.** All API communications require HTTPS. HTTP requests are rejected or redirected to HTTPS.

**(b) Rate Limiting.** API endpoints are subject to rate limits to prevent abuse and ensure fair usage. Rate limits are documented in our API documentation.

**(c) Input Size Limits.** Request payloads are limited in size to prevent resource exhaustion attacks.

**(d) CORS Policy.** Cross-Origin Resource Sharing (CORS) is configured to allow requests only from authorized domains (app.vetguard.io and vetguard.io).

**(e) Security Headers.** All responses include security headers, including Content-Security-Policy, X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Strict-Transport-Security (HSTS), and Referrer-Policy.

---

## 5. Data Security

### 5.1 Encryption

**(a) In Transit.** All data transmitted between clients and servers is encrypted using TLS 1.2 or higher with strong cipher suites. Weak or deprecated cipher suites and protocols (SSLv3, TLS 1.0, TLS 1.1) are disabled.

**(b) At Rest.** All customer data, including Clinical Data, Audit Results, and Account Information, is encrypted at rest using AES-256 encryption. Database encryption is managed by DigitalOcean's managed PostgreSQL service with automatic key rotation.

**(c) Backups.** Database backups are encrypted using the same AES-256 standard and stored in geographically separate locations from the primary database.

**(d) Key Management.** Encryption keys are managed using secure key management practices. Keys are rotated periodically and are never stored alongside the data they protect.

### 5.2 Data Classification

VetGuard classifies data into the following categories:

**(a) Confidential.** Clinical Data (SOAP notes, invoice items, patient records), API keys, authentication credentials, encryption keys, and payment information. Confidential data receives the highest level of protection and is accessible only to authorized personnel and systems on a strict need-to-know basis.

**(b) Internal.** Employee information, internal communications, business plans, and system configurations. Internal data is accessible to VetGuard personnel as needed for their roles.

**(c) Public.** Marketing materials, published documentation, and publicly available information on our website. Public data requires no access restrictions.

### 5.3 Data Handling

**(a) Clinical Data Processing.** Raw SOAP notes are processed in memory during AI analysis. Clinical Data transmitted to AI processing partners is sent via encrypted API calls and is not persisted by the AI provider beyond the duration of the API request.

**(b) Sensitive Field Masking.** Log files and error reports are sanitized to prevent inadvertent exposure of Clinical Data, credentials, or other sensitive information. Sensitive fields are masked or redacted before logging.

**(c) Secure Deletion.** When data is deleted (including upon account cancellation), it is permanently removed from active databases within ten (10) business days of the deletion request. Encrypted backups containing deleted data are purged within ninety (90) days.

### 5.4 Database Security

**(a) Managed Database.** The Service uses DigitalOcean Managed PostgreSQL with automated patching, encryption, and access controls.

**(b) Connection Security.** Database connections require SSL/TLS encryption. Unencrypted database connections are rejected.

**(c) Access Restriction.** Database access is restricted to application servers within the production network. Direct external access to the database is prohibited.

**(d) Query Parameterization.** All database queries use parameterized statements to prevent SQL injection. Raw query construction from user input is prohibited.

---

## 6. AI Security

### 6.1 AI Processing Architecture

Clinical Data processed by AI Components follows this security model:

**(a) Stateless Processing.** Each AI API request is stateless. The AI processing partner (Anthropic) does not retain Clinical Data between requests and does not build persistent profiles from customer data.

**(b) No Model Training.** Customer Clinical Data is never used to train, fine-tune, or improve AI models. Our data processing agreement with Anthropic explicitly prohibits the use of customer data for model training.

**(c) Encrypted Transmission.** All data sent to AI processing partners is transmitted over encrypted channels (TLS 1.2+). API keys for AI services are stored securely and rotated periodically.

**(d) Minimal Data Exposure.** Only the Clinical Data necessary for the specific audit request is transmitted to the AI processing partner. We do not send account information, payment details, or other non-essential data.

### 6.2 AI Output Validation

**(a) Response Parsing.** AI-generated responses are parsed and validated by VetGuard's application layer before being stored or displayed to users. Malformed or unexpected responses are rejected and logged for investigation.

**(b) Confidence Scoring.** All Audit Results include confidence scores (high, medium, low) to help users assess the reliability of each flagged item.

**(c) No Automated Actions.** The Service does not automatically modify invoices, billing records, or PIMS data based on AI-generated Audit Results. All actions require explicit human review and approval.

### 6.3 AI Vendor Security

VetGuard evaluates and monitors the security practices of AI processing partners. Our selection criteria include SOC 2 Type II certification or equivalent, explicit contractual prohibition on using customer data for model training, data processing agreements with confidentiality and security requirements, incident notification obligations, and regular security assessments and third-party audits.

---

## 7. Access Control

### 7.1 Customer Access Controls

**(a) Account Security.** Each customer account is protected by unique credentials. Shared accounts are discouraged. Each authorized user should have their own account with appropriate role-based permissions.

**(b) Password Requirements.** Passwords must be at least twelve (12) characters, must not match commonly breached passwords, and must not be the same as the user's email address.

**(c) Session Timeouts.** Inactive sessions are automatically terminated after thirty (30) minutes of inactivity. Active sessions expire after twenty-four (24) hours, requiring re-authentication.

**(d) Device Management.** Users can view active sessions and revoke access from unrecognized devices through their account settings.

### 7.2 Administrative Access Controls

**(a) Privileged Access.** Administrative access to production infrastructure requires multi-factor authentication, VPN connection from an approved device, role-based authorization with time-limited access, and audit logging of all administrative actions.

**(b) Access Reviews.** Access permissions for all personnel are reviewed quarterly. Unnecessary access is promptly revoked.

**(c) Emergency Access.** Break-glass procedures exist for emergency access to production systems. All emergency access is logged, reviewed, and justified within twenty-four (24) hours.

---

## 8. Incident Response

### 8.1 Incident Response Plan

VetGuard maintains a documented incident response plan that covers the following phases:

**(a) Detection.** Security events are detected through automated monitoring and alerting systems, log analysis and anomaly detection, customer and employee reports, and third-party vulnerability disclosures.

**(b) Assessment.** Detected events are assessed for severity, scope, and impact. Incidents are classified as Critical (active breach involving customer data, system compromise, or data exfiltration), High (attempted breach, significant vulnerability discovered, or service disruption), Medium (minor vulnerability, policy violation, or suspicious activity), or Low (informational events, minor policy deviations).

**(c) Containment.** Immediate actions are taken to contain the incident and prevent further damage, including isolating affected systems, revoking compromised credentials, blocking malicious IP addresses, and preserving forensic evidence.

**(d) Eradication.** The root cause of the incident is identified and eliminated. Affected systems are remediated, patched, or rebuilt as necessary.

**(e) Recovery.** Normal operations are restored. Affected data is recovered from backups if necessary. Additional monitoring is implemented to detect recurrence.

**(f) Post-Incident Review.** A post-incident review is conducted within seven (7) days of incident resolution. Findings are documented, and remediation actions are tracked to completion.

### 8.2 Breach Notification

**(a) Customer Notification.** In the event of a confirmed security breach affecting your personal information or Clinical Data, we will notify affected customers within seventy-two (72) hours of confirming the breach. Notification will include a description of the incident, the types of data involved, actions we have taken to contain and remediate the breach, recommended steps you should take, and contact information for our security team.

**(b) Regulatory Notification.** We will notify applicable regulatory authorities as required by law, including the Illinois Attorney General under the Illinois Personal Information Protection Act (815 ILCS 530) and other state authorities as applicable.

**(c) Law Enforcement.** We will cooperate with law enforcement as appropriate and as required by law.

### 8.3 Communication Channels

Security incidents can be reported to:

**Email:** security@vetguard.io

We acknowledge all security reports within twenty-four (24) hours.

---

## 9. Vulnerability Management

### 9.1 Vulnerability Scanning

**(a) Automated Scanning.** Production systems are scanned for vulnerabilities on a weekly basis using automated scanning tools.

**(b) Dependency Scanning.** Third-party libraries and dependencies are continuously monitored for known vulnerabilities using automated dependency scanning in our CI/CD pipeline.

**(c) Container Scanning.** Container images are scanned for vulnerabilities before deployment. Images with critical or high-severity vulnerabilities are not deployed until remediated.

### 9.2 Patch Management

Vulnerabilities are remediated according to the following timelines:

**(a) Critical (CVSS 9.0-10.0).** Patched within twenty-four (24) hours of notification. Emergency patches may be deployed outside normal change management procedures.

**(b) High (CVSS 7.0-8.9).** Patched within seventy-two (72) hours of notification.

**(c) Medium (CVSS 4.0-6.9).** Patched within thirty (30) days of notification.

**(d) Low (CVSS 0.1-3.9).** Patched within ninety (90) days of notification or in the next scheduled maintenance window.

### 9.3 Responsible Disclosure

We welcome and encourage responsible disclosure of security vulnerabilities. If you discover a security vulnerability in the Service, please report it to security@vetguard.io. When reporting, please include a description of the vulnerability, steps to reproduce the issue, the potential impact of the vulnerability, and your contact information.

We commit to acknowledging your report within twenty-four (24) hours, providing an initial assessment within seventy-two (72) hours, keeping you informed of our progress toward remediation, not pursuing legal action against researchers who follow responsible disclosure practices, and crediting you (with your permission) when the vulnerability is resolved.

We ask that you do not access or modify customer data, do not disrupt the Service or its infrastructure, allow reasonable time for remediation before public disclosure, and do not exploit the vulnerability beyond what is necessary to demonstrate the issue.

---

## 10. Business Continuity and Disaster Recovery

### 10.1 Backup Strategy

**(a) Database Backups.** Automated daily backups of all databases are performed. Backups are encrypted using AES-256 and stored in a geographically separate region from the primary database.

**(b) Backup Retention.** Daily backups are retained for thirty (30) days. Weekly backups are retained for ninety (90) days.

**(c) Backup Testing.** Backup restoration is tested quarterly to verify data integrity and recovery procedures.

### 10.2 Disaster Recovery

**(a) Recovery Time Objective (RTO).** We target a recovery time objective of four (4) hours for critical system failures.

**(b) Recovery Point Objective (RPO).** We target a recovery point objective of twenty-four (24) hours, meaning no more than twenty-four hours of data may be lost in a disaster scenario.

**(c) Failover.** Critical infrastructure components are configured for automatic failover where possible. Manual failover procedures are documented and tested periodically.

### 10.3 Service Availability

**(a) Uptime Target.** VetGuard targets 99.5% monthly uptime for the Service, excluding scheduled maintenance.

**(b) Maintenance Windows.** Scheduled maintenance is performed during low-usage periods and communicated at least twenty-four (24) hours in advance when practicable.

**(c) Status Page.** Service status and incident updates are communicated through our status page and email notifications.

---

## 11. Third-Party Security

### 11.1 Vendor Assessment

All third-party vendors that process, store, or have access to customer data are evaluated for security prior to engagement. Our vendor assessment process includes reviewing the vendor's security certifications and audit reports (SOC 2, ISO 27001, or equivalent), evaluating the vendor's data handling and privacy practices, assessing the vendor's incident response capabilities, reviewing the vendor's business continuity and disaster recovery plans, and confirming contractual security and confidentiality obligations.

### 11.2 Current Third-Party Providers

The following third-party providers process or have access to customer data:

**(a) Anthropic (AI Processing).** Processes Clinical Data to generate Audit Results. Bound by data processing agreement prohibiting model training on customer data. SOC 2 Type II certified.

**(b) DigitalOcean (Cloud Infrastructure).** Hosts our application, database, and cache infrastructure. SOC 2 Type II certified. Provides managed PostgreSQL and Valkey services with encryption.

**(c) Payment Processor.** Processes subscription payments. PCI DSS Level 1 certified. VetGuard does not store credit card numbers on its own servers.

### 11.3 Ongoing Monitoring

Third-party vendor security is reviewed annually or whenever a material change in the vendor's services or security posture is identified. Vendors that fail to meet our security requirements are remediated or replaced.

---

## 12. Compliance

### 12.1 Regulatory Framework

VetGuard's security program is designed to comply with the following applicable laws and frameworks:

**(a) State Data Breach Notification Laws.** Including the Illinois Personal Information Protection Act (815 ILCS 530) and equivalent laws in all states where our customers operate.

**(b) California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA).** For California residents.

**(c) Payment Card Industry Data Security Standard (PCI DSS).** Payment processing is handled by PCI DSS Level 1 certified processors.

**(d) HIPAA-Aligned Practices.** While veterinary practices are generally not subject to the Health Insurance Portability and Accountability Act (HIPAA), VetGuard implements security controls consistent with HIPAA administrative, technical, and physical safeguard requirements as an industry best practice.

**(e) SOC 2 Alignment.** VetGuard's security controls are aligned with the AICPA SOC 2 Trust Services Criteria (Security, Availability, Confidentiality, Processing Integrity, and Privacy). We are pursuing formal SOC 2 Type II certification.

### 12.2 Audit Rights

Enterprise customers may request a summary of our most recent security assessment or audit report, subject to the execution of a mutual non-disclosure agreement. Requests should be directed to security@vetguard.io.

---

## 13. Physical Security

### 13.1 Data Center Security

Our infrastructure is hosted in DigitalOcean data centers that maintain 24/7 security staffing and surveillance, biometric and multi-factor physical access controls, environmental controls (fire suppression, climate control, flood protection), redundant power supplies and backup generators, and compliance with SOC 2 Type II physical security requirements.

### 13.2 Office Security

VetGuard office facilities (if applicable) implement access controls to restrict entry to authorized personnel, secure storage for any physical media containing sensitive information, clean desk policies for workspaces with access to customer data, and secure disposal procedures for physical media and printed materials.

---

## 14. Security Monitoring and Logging

### 14.1 Monitoring

VetGuard maintains continuous monitoring of production systems, including real-time alerting for anomalous activity and potential security events, performance monitoring for availability and latency, error rate monitoring and automated alerting, and resource utilization monitoring to detect unusual patterns.

### 14.2 Logging

**(a) Audit Logs.** All security-relevant events are logged, including authentication attempts (successful and failed), administrative actions, data access and modifications, API calls, configuration changes, and system errors and exceptions.

**(b) Log Protection.** Logs are stored in a centralized, tamper-resistant logging system. Log data is encrypted at rest and retained for twelve (12) months.

**(c) Log Review.** Security logs are reviewed regularly for indicators of compromise or policy violations. Automated alerting is configured for high-severity events.

**(d) Sensitive Data Redaction.** Logs are sanitized to prevent exposure of Clinical Data, credentials, API keys, or other sensitive information. Sensitive fields are masked or redacted before logging.

---

## 15. Customer Security Recommendations

We recommend that all VetGuard customers implement the following security best practices:

**(a) Account Security.** Use strong, unique passwords for each user account. Enable multi-factor authentication (MFA) for all users. Do not share login credentials between users. Regularly review and remove inactive user accounts.

**(b) API Key Management.** Treat API keys as sensitive credentials. Do not embed API keys in client-side code or public repositories. Rotate API keys periodically and immediately if a key is suspected to be compromised.

**(c) Data Handling.** Limit the Clinical Data submitted to the Service to what is necessary for billing audit purposes. Review Audit Results before taking billing actions. Maintain your own backups of critical practice data.

**(d) Access Management.** Assign the minimum role necessary for each user (principle of least privilege). Promptly revoke access for departing employees. Review user access permissions quarterly.

**(e) Browser Security.** Keep your browser and operating system up to date. Use a secure, modern browser (Chrome, Firefox, Safari, or Edge). Be cautious of phishing emails that may impersonate VetGuard.

**(f) PIMS Integration Security.** Review the permissions granted to VetGuard when connecting your PIMS. Revoke integration access if you cancel your VetGuard subscription. Monitor your PIMS logs for unusual access patterns.

---

## 16. Policy Updates

This Security Policy may be updated periodically to reflect changes in our security practices, technology, legal requirements, or threat landscape. Material changes will be communicated through email notification to account administrators at least thirty (30) days before the changes take effect and posting a notice on the Service.

The current version of this Security Policy is always available at vetguard.io/security.

---

## 17. Contact Us

For security-related questions, concerns, or incident reports, please contact us:

**Security Team**
Email: security@vetguard.io

**Privacy Team**
Email: privacy@vetguard.io

**General Support**
Email: support@vetguard.io

**Mailing Address:**
VetGuard LLC
211 W. Wacker Drive
Ste 120 PMB 2192
Chicago, IL 60606
United States

We acknowledge all security inquiries within twenty-four (24) hours.

---

**VetGuard is committed to maintaining the highest standards of security for our customers and their data. We continuously invest in our security program to protect the trust you place in us.**

---

*© 2026 VetGuard LLC. All rights reserved.*
