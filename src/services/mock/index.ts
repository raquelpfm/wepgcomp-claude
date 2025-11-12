/**
 * Mock Services Index
 * Central export for all mock services
 */

import mockAuthService from './auth.service.mock';
import mockUserService from './user.service.mock';
import mockEventService from './event.service.mock';
import mockPresentationService from './presentation.service.mock';
import mockCertificateService from './certificate.service.mock';

export {
  mockAuthService,
  mockUserService,
  mockEventService,
  mockPresentationService,
  mockCertificateService,
};

// Export storage and helpers for advanced usage
export { getMockStorage, resetMockStorage } from './storage';
export * from './helpers';

// Export test credentials for easy reference
export { testCredentials } from './data/users.data';
